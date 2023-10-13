import React, { useState } from 'react';

interface FileUploadButtonProps {
  onFileChange: (file: File) => void;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ onFileChange }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
      onFileChange(file);
    }
  };

  return (
    <div>
      <label>
      <input type="file" accept=".pdf, .doc, .docx, .csv, .xlsx" onChange={handleFileChange} />
        {selectedFile ? (
          <div>
            <p>{selectedFile.name}</p>
          </div>
        ) : (
          <button></button>
        )}
      </label>
    </div>
  );
};

export default FileUploadButton;
