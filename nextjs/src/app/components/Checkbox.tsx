import React, { ChangeEvent } from "react";
interface SelectBoxOption {
  id: number | string;
  name: string;
}
interface SelectBoxProps {
  name?: string;
  id?: string;
  options: SelectBoxOption[];
  className?: string;
  register?: any;
  handleChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  message?: string;
  defaultValue?: number | string;
}
const SelectBox: React.FC<SelectBoxProps> = ({
  name,
  id,
  options,
  className,
  register,
  message,
  handleChange,
  defaultValue,
}) => {
  return (
    <div className="flex flex-col items-center">
      <select
        id={id}
        className={`border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ${className} ${
          message ? "border-red-500" : ""
        }`}
        name={name}
        onChange={handleChange}
        value={defaultValue}
        {...register}
      >
        {options.map((option, index) => (
          <option key={index} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      <div
        style={{
          color: "red",
          fontSize: "11px",
        }}
      >
        {message}
      </div>
    </div>
  );
};
export default SelectBox;
