import React, { useState } from 'react';

type ProjectNameProps = {
  name: string;
  project_id: number;
  onNameChange: (projectId: number, newName: string) => void;
};

const ProjectName: React.FC<ProjectNameProps> = ({ name, project_id, onNameChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);

  const handleNameClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = () => {
    setIsEditing(false);
    onNameChange(project_id, newName);
  };

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={newName}
          onChange={handleNameInputChange}
          onBlur={handleNameChange} // Automatically save when focus is lost
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              // Automatically save on Enter key press
              handleNameChange();
            }
          }}
        />
      ) : (
        <h3 style={{ whiteSpace: 'pre-wrap' }} onClick={handleNameClick}>
          {name}
        </h3>
      )}
    </div>
  );
};

export default ProjectName;
