import React, { ChangeEvent } from "react";

export interface SelectBoxOption {
  id: number | string;
  name: string;
}
interface SingleSelectProps {
  name?: string;
  id?: string;
  options: SelectBoxOption[];
  className?: string;
  register?: any;
  handleChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  defaultValue?: any;
  message?: string;
}
const SingleSelect: React.FC<SingleSelectProps> = ({
  name,
  id,
  options,
  className,
  register,
  handleChange,
  defaultValue,
  message,
}) => {
  return (
    <>
      <div className="flex justify-center">
        <select
          id={id}
          className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ${className} max-h-32 overflow-y-scroll`}
          name={name}
          onChange={handleChange}
          {...register}
          value={defaultValue}
        >
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div
        style={{
          color: "red",
          fontSize: "11px",
        }}
      >
        {message}
      </div>
    </>
  );
};

export default SingleSelect;
