import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import Button from '~/app/(site)/components/forms/Button';
import ChatBotSidebar from '~/app/(site)/components/layouts/RightSidebar/ChatBotSidebar';
import ImageEditor from '~/app/(site)/components/ImageEditor';
import { EditorContext } from '~/app/(site)/core/providers/EditorProvider';

const EditorSidebar = () => {
  const [mode, setMode] = useState<number>(1);
  const { handleDownLoad } = useContext(EditorContext);

  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-2">
        <div
          className={clsx(
            'py-2.5 text-2xl font-bold text-grey-800 bg-grey-100 text-center cursor-pointer',
            mode === 1 && '!bg-primary text-white',
          )}
          onClick={() => setMode(1)}
        >
          Text Editor
        </div>
        <div
          className={clsx(
            'py-2.5 text-2xl font-bold text-grey-800 bg-grey-100 text-center cursor-pointer',
            mode === 2 && '!bg-primary text-white',
          )}
          onClick={() => setMode(2)}
        >
          Image Editor
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {mode === 1 && (
            <ChatBotSidebar  hideHeader={true} />
        )}
        {mode === 2 && <ImageEditor />}
      </div>
      <div className="px-12 py-9 gap-2.5 flex border-t border-t-grey-300 shadow-card">
        <Button className="flex-1" color="grey">
          Save
        </Button>
        <Button
          className="flex-1"
          color="grey"
          variant="outline"
          onClick={handleDownLoad}
        >
          Download
        </Button>
        <Button className="flex-1" color="grey" variant="outline">
          Share
        </Button>
      </div>
    </div>
  );
};

export default EditorSidebar;
