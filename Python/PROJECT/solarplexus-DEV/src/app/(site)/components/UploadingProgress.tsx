import React, { useContext, useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import uploadFile from '../core/utils/uploadFile';
import { ChatBotContext } from '../core/providers/ChatbotProvider';




interface UploadingProgressProps {
  file: File;
  folderID: number | null;
  fileType: string;
}

const UploadingProgress: React.FC<UploadingProgressProps> = ({ file, folderID,
  fileType
}) => {
  const [uploadProgress, setUploadProgress] = useState('Uploading file...');
  const { addMessage } = useContext(ChatBotContext);

  useEffect(() => {
    const handleUpload = async () => {
      console.log('Handling Upload');
      const response = await uploadFile('solarplexus', file.name, file, setUploadProgress,
       folderID, addMessage
      );
      console.log('response: ', response);
    };

    handleUpload();
  }, [file]);

  return (
    <div className="flex gap-5 py-7 w-full border-b-2 border-grey-300/50 last:border-b-0">
      <div className="mt-1">
        {/* Conditionally render different icons based on the fileType prop */}
        {fileType === 'pdf' ? (
          <img src="/assets/images/icons/pdf_icon.svg" alt="pdf_icon" />
        ) : (
          // Add other conditionals for different file types
          // Replace these with appropriate icons for different file types
          <img src="/assets/images/icons/text_type_icon.svg" alt="file_icon" />
        )}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <p className="text-grey-800 font-semibold flex gap-4">
            {file.name}{' '}
            <span className="text-grey-350">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </span>
          </p>
          <XMarkIcon className="w-5 h-5 cursor-pointer" />
        </div>
        <div className="h-1 bg-grey-200 rounded relative overflow-hidden mb-2">
          <div
            className="absolute h-full bg-info rounded"
            style={
              uploadProgress === 'Uploading file...'
                ? { width: '50%' }
                : { width: '100%' }
            }
          ></div>
        </div>
        <span className="text-grey-350">{uploadProgress}</span>
      </div>
    </div>
  );
};

export default UploadingProgress;
