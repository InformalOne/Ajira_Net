import React, { useState } from 'react';
import Image from 'next/image';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

type Project = {
  name: string;
  // Add other properties as needed
};

type ProjectCardProps = {
  value: any;
  onUpload : any
};

const ProjectCard: React.FC<ProjectCardProps> = ({ value,
  onUpload
}) => {
  const [file, setFile] = useState<File | null>(null);
  const supabase_client = createClientComponentClient(
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    }
  );

  let iconSrc = "/assets/images/icons/text_type_icon.svg"; // Default to PDF icon
  if (value  && value[0].name !== undefined
    ) {
    
    

    // Check the file extension and update iconSrc accordingly
    if (value[0].name.endsWith('.csv') || value[0].name.endsWith('.xlsx')) {
      iconSrc = "/assets/images/icons/excel_icon.png";
    } else if (value[0].name.endsWith('.pdf')) {
      iconSrc = "/assets/images/icons/pdf_icon.svg";
    }

    return (
      <div className="project-card">
        <div className="flex items-center gap-4">
          <Image
            src={iconSrc}
            alt="file_icon"
            width={16}
            height={16}
          />
          <h3 style={{ whiteSpace: 'pre-wrap' }}>{value[0].name}</h3>
        </div>
      </div>
    );
  } else {

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0];
      if (selectedFile) {
        setFile(selectedFile);
      }

      onUpload(value[0], selectedFile);

      // creae user using sup client
      // const currentUser =(await supabase_client.auth.getUser()).data.user;
      // upload file to storage

    };

    return (
      <div className="project-card">
        <div className="flex items-center gap-4">
          <h3 >
            <label htmlFor="fileInput"
              className="bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400 rounded-[30px] shadow my-2 mx-2"
            >
              Upload Files
            </label>
            <input
              type="file"
              accept=".pdf, .csv, .xlsx"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="fileInput"
            />
          </h3>
        </div>
      </div>
    );
  }
};

export default ProjectCard;
