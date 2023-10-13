import React, { useEffect, useState } from 'react';
import Modal, { ModalProps } from '~/app/(site)/components/modals/Modal';
import Button from '~/app/(site)/components/forms/Button';
import Image from 'next/image';
import UploadingProgress from '~/app/(site)/components/UploadingProgress';
import { useDropzone } from 'react-dropzone';

type Props = ModalProps & {
  folderData: any;
};

const FileUploadModal: React.FC<Props> = ({ onClose, folderData }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    useFsAccessApi: false
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);


  const handleFileUpload = (newFiles: File[]) => {
    // Add the newly uploaded files to the existing list
    console.log('New Files: ', newFiles);
    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  console.log('folderData 2: ', folderData);

  return (
    <Modal onClose={onClose} className="!max-w-[960px] !rounded-md">
      <div className="relative px-6">
        <div className="text-[30px] text-grey-800 font-semibold pb-6 border-b-2 border-grey-300/50 text-center mb-10">
          File Upload - {folderData.name}
        </div>

        <div className="grid grid-cols-2">
          <div className="px-8">
            <div
              className="rounded-[10px] border-2 border-dashed border-grey-350 py-20 flex flex-col items-center bg-grey-10/30 mb-4"
              {...getRootProps()}
            >
              <input
                {...getInputProps()}
                onChange={(e) => {
                    console.log('e.target.files: ', e.target.files);
                    handleFileUpload(Array.from(e?.target?.files || []));
                }}
              />
              <>
                <Image
                  src="/assets/images/icons/cloud_upload_icon.svg"
                  alt="cloud_upload"
                  width={50}
                  height={50}
                />
                <p className="text-grey-800 font-semibold text-xl mt-1.5 mb-2.5">
                  Drag files to upload
                </p>
                <div className="flex items-center gap-3 mb-2.5">
                  <span className="w-10 border-t border-grey-300"></span>
                  <span className="text-xl text-grey-350">OR</span>
                  <span className="w-10 border-t border-grey-300"></span>
                </div>
                <Button color="grey" variant="outline">
                  Choose File
                </Button>
              </>
            </div>
            <p className="text-xs text-grey-800 text-center">
              Please upload jpeg, png, pdf, excel & word file format only. Max.
              10 MB file size allowed.
            </p>
          </div>
          <div>
            <div className="flex justify-between text-grey-800">
              <span className="text-xl font-semibold">Uploaded Files</span>
              <span className="text-xs">
                Total files {uploadedFiles.length}
              </span>
            </div>

            <div
              style={{ maxHeight: '320px', overflowY: 'auto' }}
              className="pr-5"
            >
              {uploadedFiles.map((file, index) => (
                <UploadingProgress
                  key={index}
                  file={file}
                  folderID={folderData.id}
                  fileType={file.type.split('/')[1]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FileUploadModal;
