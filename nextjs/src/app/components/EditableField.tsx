import React, {MutableRefObject, useRef, useState} from "react";

interface EditableFieldProps {
  initialContent: string,
  onBlur: (content: string) => void,
  className: string
}

const EditableField = ({ initialContent, onBlur }: EditableFieldProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [contentEditable, setContentEditable] = useState(false);
  const [content, setContent] = useState(initialContent);

  const handleDoubleClick = () => {
    setContentEditable(true);
  };

  const handleBlur = () => {
    setContentEditable(false);
    if (divRef.current && divRef.current.textContent !== null) {
      const updatedContent = divRef.current.textContent;
      setContent(updatedContent);
      onBlur(updatedContent);
    }
  };

  return (
    <div
      ref={divRef}
      className={`h-full w-full border-none focus:outline-none p-0 m-0 bg-transparent`}
      onClick={handleDoubleClick}
      onBlur={handleBlur}
      contentEditable={contentEditable}
      suppressContentEditableWarning={true}
    >
      {content}
    </div>
  );
};

export default EditableField;
