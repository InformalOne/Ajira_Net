import React, { useState } from 'react';
import FileUploadModal from '~/app/(site)/components/modals/FileUploadModal';
import { FILE_UPLOAD_OPTIONS } from '~/app/(site)/core/constants';

// Define a props interface
interface UploadFormProps {
  pageContext: any;
  setPageContext: any;
  folders: any;
}


const UploadForm: React.FC<UploadFormProps> = ({  pageContext, setPageContext, folders }) => {

  const [showUploadModal, setShowUploadModal] = useState(false);


  const handleFileTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    // leave the previous key values as it is and set selectedFolderId to the new value
    setPageContext((prev:any) => ({ ...prev, selectedFolderId: event.target.value }));
  };

  console.log("This is the selected folder id: ", pageContext.selectedFolderId)

  console.log("This is the folders: ", folders)



  const foldersDictionary = folders.reduce((acc:any, folder:any) => {
    acc[folder.id] = folder;
    return acc;
  }, {});

  const selectedFolder = foldersDictionary[pageContext.selectedFolderId];

  console.log('foldersDictionary', foldersDictionary);

  console.log('selectedFolder', selectedFolder);

  return (
    <>
      <div className="rounded-2xl border border-grey-800 p-0.5 max-w-[330px] w-full flex justify-between h-[30px] overflow-hidden pl-2
      bg-white
      ">
        <select
          className="w-[200px] text-xs focus:outline-0 truncate !overflow-hidden
            rounded-2xl bg-transparent px-3 mr-5
            "
          value={
            pageContext.selectedFolderId? pageContext.selectedFolderId : ""
          }
          onChange={handleFileTypeChange}
        >
          <option disabled value="placeholder">
            Select file type
          </option>
          {
          (folders !== null) &&
           folders.map((item:any, index:any) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))
          }
        </select>

        <button
          className="ml-5 h-full rounded-2xl bg-grey-800 text-white text-xs font-bold text-white min-w-[110px]"
          onClick={() => setShowUploadModal(true)}
        >
          Upload
        </button>
      </div>
      {showUploadModal && (
        <FileUploadModal 
         folderData={selectedFolder}
         onClose={() => setShowUploadModal(false)} />
      )}
    </>
  );
};

export default UploadForm;
