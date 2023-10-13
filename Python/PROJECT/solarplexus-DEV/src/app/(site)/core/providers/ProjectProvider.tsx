"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Define TypeScript types for your project data and context
type Project = {
  id: number;
  name: string;
  asset: [];
  user_id: string;
  target: [];
  template: [];
  campaign: [];
  is_saved?: boolean;
};

type ProjectState = {
  projects: Project[];
};

type ProjectProviderProps = {
  children: ReactNode;
};

// Create the context
const ProjectContext = createContext<{
  state: ProjectState;
  createProject: () => void;
  uploadFile: (value: any, file: File) => void;
  changeName: (project_id: number, name: string) => void;
  deleteProject: (project_id: number) => void;
  saveProject: (project_id: number) => void;
} | undefined>(undefined);

function ProjectProvider({ children }: ProjectProviderProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const supabase_client = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });

  useEffect(() => {
    const getProjects = async () => {
      try {
        const user = (await supabase_client.auth.getUser()).data.user;
        const { data: projects } = await supabase_client.from('project').select('*').eq('user_id', user?.id);

        for (const project of projects!) {
          const { data: project_files } = await supabase_client.from('project_files').select('*').eq('project_id', project.id);

          for (const project_file of project_files!) {
            if (!project[project_file.group]) {
              project[project_file.group] = [];
            }
            project[project_file.group].push(project_file);
          }

          const project_typed = {
            id: project.id,
            name: project.name,
            asset: project.asset,
            user_id: project.user_id,
            target: project.target,
            template: project.template,
            campaign: project.campaign,
            is_saved: project.is_saved,
          };

          setProjects((prevProjects) => [...prevProjects, project_typed]);
        }
      } catch (error) {
        console.log("This is the error", error);
      }
    }
    getProjects();
  }, []);

  const createProject = async () => {
    const user = (await supabase_client.auth.getUser()).data.user;
    const newProject = { name: 'New Project', user_id: user?.id ,
    is_saved: false
  };

    const { data, error } = await supabase_client.from('project').upsert([newProject]).select('*');

    console.log("This is the new data", data);

    if (error) {
      console.error('Error inserting project:', error);
      return;
    }

    const project = data![0];

    setProjects((prevProjects) => [...prevProjects, project]);
  };

  const uploadFile = async (value: any, file: File) => {
    var unique_file_name = file.name + Date.now();
    var file_upload_path = `projects/${value.user_id}/${value.project_id}/${value.group}/${unique_file_name}`;

    const { data, error } = await supabase_client.storage
      .from('solarplexus')
      .upload(file_upload_path, file!, {
        cacheControl: '3600',
        upsert: false,
        contentType: 'application/pdf',
      });

    if (error) {
      console.log(error);
      return;
    }

    const { data: insert_data, error: insert_error } = await supabase_client
      .from('project_files')
      .insert([
        {
          project_id: value.project_id,
          user_id: value.user_id,
          group: value.group,
          name: file!.name,
          path: file_upload_path,
        },
      ]).select('*').single();

    if (insert_error) {
      console.log(insert_error);
      return;
    }
    console.log("Your file has been uploaded successfully");
    console.log(insert_data);

    setProjects((prevProjects) => {
      return prevProjects.map((project) => {
        if (project.id === value.project_id) {
          const updatedProject = { ...project };
          // @ts-ignore
          if (!updatedProject[value.group]) {
            // @ts-ignore
            updatedProject[value.group] = [];
          }
          // @ts-ignore
          updatedProject[value.group].push({
            project_id: value.project_id,
            user_id: value.user_id,
            group: value.group,
            name: file!.name,
            path: file_upload_path,
          });
          return updatedProject;
        }
        return project;
      });
    });
  };


  const deleteProject = async (project_id: number) => {
    const { data, error } = await supabase_client.from('project').delete().eq('id', project_id);

    if (error) {
      console.log(error);
      return;
    }

    setProjects((prevProjects) => {
      return prevProjects.filter((project) => project.id !== project_id);
    });
  };

  const saveProject = async (project_id: number) => {
    var curr_project = projects.filter((project) => project.id === project_id)[0];

    console.log("This is the current project", curr_project);
    // change is_saved to true
    // check state variable if the array's length is greater than 0
    
    // if any of the arrays are empty, return an error
    if ( !curr_project.asset || !curr_project.target || !curr_project.template || !curr_project.campaign ) {
      console.log("You need to upload a file to each of the sections");
      return;
    }


    const { data, error } = await supabase_client.from('project').update({ is_saved: true }).eq('id', project_id);

    console.log("This is the saved project", data);

    if (error) {
      console.log(error);
      return;
    }

    // set is_saved to true in  state
    setProjects((prevProjects) => {
      return prevProjects.map((project) => {
        if (project.id === project_id) {
          return { ...project, is_saved: true };
        }
        return project;
      });
    }); 
  };

  const changeName = (project_id: number, name: string) => {
    setProjects((prevProjects) => {
      return prevProjects.map((project) => {
        if (project.id === project_id) {
          return { ...project, name };
        }
        return project;
      });
    });
  };

  const contextValue = {
    state: { projects },
    createProject,
    uploadFile,
    changeName,
    deleteProject,
    saveProject,
  };

  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  );
}

function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}

export default ProjectProvider;
export { useProject };
