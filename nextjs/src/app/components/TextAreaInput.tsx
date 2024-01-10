import { ChangeEvent } from "react";

interface TextAreaInputProps {
  name?: string;
  id?: string;
  value?: string;
  className?: string;
  required?: boolean;
  handleChange(e: ChangeEvent<HTMLTextAreaElement>): void;
}

export default function TextAreaInput({
  name,
  id,
  value,
  className,
  handleChange,
}: TextAreaInputProps) {
  return (
    <div className="flex flex-col items-start">
      <textarea
        name={name}
        id={id}
        value={value}
        className={`border border-gray-300 py-2 px-2
            focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600
            rounded-md shadow-md 
            ${className}`}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}
