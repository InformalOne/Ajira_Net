'use client';

import React, { createContext, PropsWithChildren, useState } from 'react';
import * as htmlToImage from 'html-to-image';
import { ASSET_EDITOR_INITIAL_STYLE, ASSET_TEXT_INITIAL_STYLE } from '~/app/(site)/core/constants';

type EditorProviderProps = PropsWithChildren<any>;

const initialStates: EditorContextType = {
  ...ASSET_EDITOR_INITIAL_STYLE,
  handleChangeFieldValue: () => {},
  handleChangeTextElement: () => {},
  handleChangeActiveText: () => {},
  handleCreateTextElement: () => {},
  handleDownLoad: () => {},
  handleRevert: () => {},
}

export type TextCanvasComponent = {
  id: string;
  position?: { top: number; left: number };
  dimension?: { width: string; height: string };
  content?: string;
  isReadOnly?: boolean;
  fontFamily?: string;
  fontStyle?: string;
  fontSize?: string;
  textAlign?: 'left' | 'right' | 'center';
}

type EditorContextType = {
  texts: TextCanvasComponent[],
  activeText: string | null,
  setting: {
    appearance: number;
    fill: {
      enable: boolean;
      color: string;
    },
    outline: {
      enable: boolean;
      color: string;
    },
    outlineThickness: number;
    effects: {
      enable: boolean;
      color: string;
      opacity: number;
    },
    applyAll: boolean;
  },

  handleChangeFieldValue: (field: keyof EditorContextType['setting'], value: any) => void;
  handleChangeTextElement: (payload: TextCanvasComponent) => void;
  handleChangeActiveText: (value: string | null) => void;
  handleCreateTextElement: () => void;
  handleDownLoad: () => void;
  handleRevert: () => void;
}

export const EditorContext =
  createContext<EditorContextType>(initialStates);

const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
  const [texts, setTexts] = useState<TextCanvasComponent[]>([]);
  const [activeText, setActiveText] = useState<string | null>(null);
  const [setting, setSetting] = useState<EditorContextType['setting']>(initialStates.setting);

  const handleChangeFieldValue = (field: keyof EditorContextType['setting'], value: any) => {
    setSetting((prev) => ({
      ...prev,
      [field]: value
    }));
  }

  const handleChangeTextElement = (payload: TextCanvasComponent) => {
    const currentDataIndex = texts.findIndex((text) => text.id === payload.id);
    const updatedData = { ...texts[currentDataIndex], ...payload };
    texts.splice(currentDataIndex, 1, updatedData);
    setTexts([...texts]);
  }

  const handleCreateTextElement = () => {
    const defaultData: TextCanvasComponent = {
      ...ASSET_TEXT_INITIAL_STYLE,
      id: `${Date.now()}`
    };

    setTexts([...texts, { ...defaultData }]);
    setActiveText(defaultData.id);
  }

  const handleChangeActiveText = (value: string | null) => {
    setActiveText(value);
  }

  const handleDownLoad = () => {
    const element = document.getElementById('asset-editor');

    if (element) {
      htmlToImage.toPng(element)
        .then(function (dataUrl) {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `${new Date().toString()}.png`;
          link.click();
        })
        .catch(function (error) {

        });
    }
  }

  const handleRevert = () => {
    setTexts([]);
    setActiveText(null);
    setSetting(ASSET_EDITOR_INITIAL_STYLE.setting);
  }

  return (
    <EditorContext.Provider
      value={{
        texts,
        activeText,
        setting,
        handleChangeFieldValue,
        handleChangeTextElement,
        handleChangeActiveText,
        handleCreateTextElement,
        handleDownLoad,
        handleRevert
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}

export default EditorProvider;
