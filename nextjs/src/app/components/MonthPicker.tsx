import React, { ChangeEvent } from "react";

interface MonthPickerProps {
  className?: string;
  required?: boolean;
  name?: string;
  register?: any;
  message?: string;
  defaultValue?: string;
  value?: string;
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
export const MonthPicker = (props: MonthPickerProps) => {
  return (
    <div className={`flex flex-col items-start relative ${props.className}`}>
      <div>
        <input
          type="month"
          name={props.name}
          {...props.register}
          className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm block w-full text-gray-700 border border-gray-200 rounded py-3 px-3 leading-tight"
          required={props.required}
          onChange={props.handleChange}
          defaultValue={props.defaultValue}
          value={props.value}
        />
      </div>
      <div
        style={{
          color: "red",
          fontSize: "11px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {props.message}
      </div>
    </div>
  );
};
