'use client';
import Button from '~/app/(site)/components/forms/Button';
import Input from '~/app/(site)/components/forms/Input';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import { TableHeaderType } from '~/app/(site)/components/Table/TableHeader';
import Table from '~/app/(site)/components/Table';
import { TableActionEnum } from '~/app/(site)/components/Table/TableRow';
import Link from 'next/link';
import React, { useState } from 'react';
import { useProject } from '../core/providers/ProjectProvider';
import ProjectCard from './components/ProjectCard';
import ProjectName from './components/ProjectName';

const TABLE_HEADERS: TableHeaderType[] = [
  {
    label: 'Project Name',
    field: 'name',
    sortable: true,
    className: 'whitespace-nowrap',
  },
  {
    label: 'Asset to Individualize',
    field: 'asset',
    sortable: true,
    bodyClassName: 'text-black',
    className: 'text-left w-1/6',
  },
  {
    label: 'Target list',
    field: 'target',
    sortable: true,
    bodyClassName: 'text-black',
    className: 'whitespace-nowrap w-1/6',
  },
  {
    label: 'Templates',
    field: 'template',
    sortable: true,
    bodyClassName: 'text-black',
    className: 'w-1/6',
  },
  {
    label: 'Campaign Specific Branching',
    field: 'campaign',
    sortable: true,
    bodyClassName: 'text-black',
    className: 'text-left w-1/6',
  },
  {
    label: 'Action',
    field: 'action',
    className: 'text-right',
    headerClassName: 'pr-0',
  },
];


function ProjectPage() {
  const [isEditing, setIsEditing] = useState(true);
  //const [tableData, setTableData] = useState(TABLE_DATA);
  const [editedProjectName, setEditedProjectName] = useState('New Project');

  const {
    state, createProject, uploadFile, deleteProject, saveProject, changeName
  } = useProject();


  console.log("State is ", state);

  // print the projects in state to the console
  console.log("Projects are ", state.projects);

  // map actions to each of the projects
  const projects = state.projects.map((project) => {

    console.log("Project is ", project);

    var asset = project?.asset? project?.asset : [ {
      user_id: project?.user_id,
      project_id: project?.id,
      group : "asset",
      isSaved : false,
    }]

    var target = project?.target? project?.target : [{
      user_id: project?.user_id,
      project_id: project?.id,
      group : "target",
      isSaved : false,
    }]

    var template = project?.template? project?.template : [{
      user_id: project?.user_id,
      project_id: project?.id,
      group : "template",
      isSaved : false,
    }]

    var campaign = project?.campaign? project?.campaign : [{
      user_id: project?.user_id,
      project_id: project?.id,
      group : "campaign",
      isSaved : false,
    }]

    var action = {
      options: [TableActionEnum.Save, TableActionEnum.Edit, TableActionEnum.Delete]
    }

    if (!project?.is_saved) {
      action.options.push(TableActionEnum.Save);
    }


    console.log("is Saved ", project?.is_saved);

    return {
      ...project,
      name :  <ProjectName
      name={project.name}
      project_id={project.id}
      onNameChange={changeName}
    />,  // search
      action: action,
      asset: <ProjectCard value=
        // @ts-ignore 
         {asset} onUpload={uploadFile}
      />,

      target: <ProjectCard value=
        // @ts-ignore 
        {target} onUpload={uploadFile}

      />,

      template: <ProjectCard value=
        // @ts-ignore
        {template} onUpload={uploadFile}

      />,
      campaign: <ProjectCard value=
        // @ts-ignore
        {campaign} onUpload={uploadFile}

      />


    };
  });


  const handleFileUpload = (file: File) => {
    // Handle the uploaded file here (e.g., store it in state or send it to a server)
    console.log('Uploaded file:', file.name);
  };


  return (

    <div className="h-full flex flex-col w-full">
      <div className="mb-10">
        <h2 className="text-[26px] font-bold text-grey-800">Project</h2>
        <p className="text-sm font-medium text-grey-800 font-semibold max-w-[700px]">
          Please upload your input in order for us to create your marketing and
          communication assets. You can upload an already made asset you want us
          to individualize (under Asset to individualize) If not, we create new
          marketing and communication assets.
        </p>
      </div>
      <div className="flex items-center justify-between">
        <Button
          className="bg-white flex items-center gap-1 !min-w-[110px] !px-2"
          variant="outline"
          color="grey"
          size="sm"
        onClick={
          () => {
            createProject();
          }
        }
        >
          <PlusIcon className="w-3 h-3" />
          {'New Project'}
        </Button>
        <div className="relative">
          <Input className="pr-5" size="md" placeholder="" />
          <MagnifyingGlassIcon className="absolute top-1/2 right-2 -translate-y-1/2 w-3 h-3" />
        </div>
      </div>
      
      
      <div className="flex-1 pt-6">
        <Table headers={TABLE_HEADERS} data={projects} 
          onDelete={deleteProject}
          onSave={saveProject} 
        />
      </div>

      <div className="flex items-center gap-2">

        <Link href="/brand">
          <Button variant="outline" color="grey" size="md">
            Go Back
          </Button>
        </Link>
        <div className="flex items-center justify-end gap-2 flex-1">
          <Link href="/marketing">
            <Button variant="outline" color="grey" size="md">
              Skip for now
            </Button>
          </Link>
          <Link href="/segmentation">
            <Button color="secondary" size="md">
              Create Segmentation ››
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;