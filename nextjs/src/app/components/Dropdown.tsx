"use client";
import {
  useState,
  createContext,
  useContext,
  Fragment,
  ReactNode,
} from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";

interface DropDownContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleOpen: () => void;
}

const DropDownContext = createContext<DropDownContextProps | undefined>(
  undefined
);

interface DropdownProps {
  children: ReactNode;
}

interface TriggerProps {
  children: ReactNode;
}

interface ContentProps {
  align?: "left" | "right";
  width?: number;
  contentClasses?: string;
  children: ReactNode;
}

interface DropdownLinkProps {
  href: string;
  children: ReactNode;
}

const Dropdown: React.FC<DropdownProps> & {
  Trigger: React.FC<TriggerProps>;
  Content: React.FC<ContentProps>;
  Link: React.FC<DropdownLinkProps>;
} = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((previousState) => !previousState);
  };

  return (
    <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
      <div className="relative">{children}</div>
    </DropDownContext.Provider>
  );
};

const Trigger: React.FC<TriggerProps> = ({ children }) => {
  const { open, setOpen, toggleOpen } = useContext(DropDownContext)!;

  return (
    <>
      <div onClick={toggleOpen}>{children}</div>

      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
};

const Content: React.FC<ContentProps> = ({
  align = "right",
  contentClasses = "py-1 bg-white",
  children,
}) => {
  const { open, setOpen } = useContext(DropDownContext)!;

  let alignmentClasses = "origin-top";

  if (align === "left") {
    alignmentClasses = "origin-top-left left-0";
  } else if (align === "right") {
    alignmentClasses = "origin-top-right right-0";
  }

  return (
    <>
      <Transition
        as={Fragment}
        show={open}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div
          className={`absolute z-50 mt-2 rounded-md shadow-lg ${alignmentClasses} w-44`}
          onClick={() => setOpen(false)}
        >
          <div
            className={
              `rounded-md ring-1 ring-black ring-opacity-5 ` + contentClasses
            }
          >
            {children}
          </div>
        </div>
      </Transition>
    </>
  );
};

const DropdownLink: React.FC<DropdownLinkProps> = ({ href, children }) => {
  const { open, setOpen } = useContext(DropDownContext)!;
  return (
    <Link
      href={href}
      className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
      onClick={() => setOpen(false)}
    >
      {children}
    </Link>
  );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;
