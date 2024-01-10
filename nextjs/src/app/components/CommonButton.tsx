import { MouseEventHandler } from "react";

interface CommonButtonProps extends React.HTMLProps<HTMLButtonElement> {
  type: "submit" | "button" | "reset";
  className?: string;
  processing?: boolean;
  children: React.ReactNode;
}

export default function CommonButton({
  type,
  className,
  processing,
  children,
  onClick,
}: CommonButtonProps) {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!processing && onClick) {
      onClick(event);
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`inline-flex items-center bg-gray-600 border border-transparent rounded-md font-semibold text-white uppercase tracking-widest px-4 py-2 text-base hover:bg-gray-500 focus:ring-offset-2 transition ease-in-out duration-150 ${className}`}
      disabled={processing ?? false}
    >
      {children}
    </button>
  );
}
