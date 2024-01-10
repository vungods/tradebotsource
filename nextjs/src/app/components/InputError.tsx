import React from "react";

interface InputErrorProps {
  message: string;
  className?: string;
}

const InputError: React.FC<InputErrorProps> = ({ message, className = "" }) => {
  return message ? (
    <p className={`text-sm text-red-600 ${className}`}>{message}</p>
  ) : null;
};

export default InputError;
