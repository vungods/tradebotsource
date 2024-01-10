import React from "react";

interface InputFormTableProps {
  type: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  placeHolder?: string;
  register?: any;
  message?: string;
}

export const InputFormTable = (props: InputFormTableProps) => {
  return (
    <>
      <div style={{ padding: "2px" }}>
        <div>
          <input
            type={props.type}
            step="any"
            className={
              `border border-gray-300 p-2
          focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600
          rounded-md ` + (props.className || "")
            }
            required={props.required}
            disabled={props.disabled}
            placeholder={props.placeHolder}
            {...props.register}
          />
        </div>
        <div
          style={{
            color: "red",
            fontSize: "11px",
          }}
        >
          {props.message}
        </div>
      </div>
    </>
  );
};
