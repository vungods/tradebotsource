import React, { MouseEventHandler } from "react";

interface DangerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: "submit" | "button" | "reset";
  className?: string;
  processing: boolean;
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const DangerButton: React.FC<DangerButtonProps> = ({ type, className, processing, children, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center bg-red-600 border border-transparent rounded-md font-semibold px-4 py-2 text-base text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 ${className}`}
      disabled={processing}
    >
      {children}
    </button>
  );
};

export default DangerButton;
