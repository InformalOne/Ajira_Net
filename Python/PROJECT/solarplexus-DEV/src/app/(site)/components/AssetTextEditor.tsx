import React, { ChangeEvent, useCallback, useContext, useRef } from 'react';
import { Rnd } from "react-rnd";
import { EditorContext, TextCanvasComponent } from '~/app/(site)/core/providers/EditorProvider';

const AssetTextEditor = ({
  dimension,
  position,
  content,
  id
}: TextCanvasComponent) => {
  const { handleChangeTextElement, activeText, handleChangeActiveText, texts } = useContext(EditorContext);
  const [showGrids, setShowGrids] = React.useState(false);
  const [isReadOnly, setIsReadOnly] = React.useState(true);
  const elementRef = React.useRef<HTMLDivElement>(null);
  const isDragged = useRef<boolean>(false);
  const editorRef = React.useRef(null);

  const property = useCallback((value: string) => {
    const text = texts.find((item) => item.id === value);
    if (text) return {
      fontFamily: text.fontFamily,
      fontSize: text.fontSize + 'px',
      fontWeight: text.fontStyle,
      textAlign: text.textAlign,
      color: '#EB691B',
    }
    return {};
  }, [texts]);

  const onBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const toolbarElement = document.querySelector("#toolbar");
    if (
      event.currentTarget.contains(event?.relatedTarget as Element) ||
      toolbarElement?.contains(event?.relatedTarget as Element)
    ) {
      return;
    }
    setIsReadOnly(true);
    if (id && activeText) {
      handleChangeActiveText(null);
    }
  };

  const style: React.CSSProperties = {
    outline: "none",
    overflow: "hidden",
    border: `2px solid ${
      (id && id === activeText) || showGrids || isDragged.current
        ? "#21DEE5"
        : "transparent"
    }`
  };

  const onMouseEnter = () => {
    setShowGrids(true);
  };

  const onMouseLeave = () => {
    setShowGrids(false);
  };

  const updateEditorValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
    handleChangeTextElement({ id, content: event.target.value });
  }

  const onFocus = (event: React.MouseEvent) => {
    handleChangeActiveText(id);
  };

  const handleClass =
    id && activeText === id
      ? "showHandles"
      : "";

  const onDoubleClick = () => {
    if (!isReadOnly) return;
    setIsReadOnly(false);
  };

  return (
    <div ref={elementRef}>
      <Rnd
        style={style}
        size={{ width: dimension?.width || 0, height: dimension?.height || 0 }}
        position={{ x: position?.left || 0, y: position?.top || 0 }}
        onDragStart={() => {
          isDragged.current = true;
        }}
        onDragStop={(e, d) => {
          isDragged.current = false;
          handleChangeTextElement({ id, position: { left: d.x, top: d.y } });
        }}
        resizeHandleWrapperClass={handleClass}
        // resizeHandleClasses={resizeHandleClasses}
        onResize={(e, direction, ref, delta, position) => {
          handleChangeTextElement({
            id,
            dimension: { width: ref.style.width, height: ref.style.height },
            position: { top: position.y, left: position.x }
          });
        }}
        enableResizing={{
          bottom: false,
          bottomLeft: true,
          bottomRight: true,
          top: false,
          topLeft: true,
          topRight: true,
          left: false,
          right: false
        }}
        minWidth={100}
        minHeight={50}
        disableDragging={!isReadOnly}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onDoubleClick={onDoubleClick}
        onFocus={onFocus}
        onBlur={onBlur}
        tabIndex={0}
      >
        <div className="item-container">
          <div>
            {isReadOnly ? (
              <div
                style={property(id)}
                dangerouslySetInnerHTML={{ __html: content ?? '' }}
              />
            ) : (
              <textarea
                ref={editorRef}
                style={property(id)}
                className="bg-transparent w-full h-full focus:outline-none"
                readOnly={isReadOnly}
                value={content}
                onChange={updateEditorValue}
              />
            )}
          </div>
        </div>
      </Rnd>
    </div>
  );
};

export default AssetTextEditor;
