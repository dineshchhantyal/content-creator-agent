import React from "react";
import { useDropdownMenu } from "react-aria";

export const DropdownMenu = ({ children }) => {
  const { menuProps } = useDropdownMenu();

  return (
    <div {...menuProps} className="relative inline-block text-left">
      {children}
    </div>
  );
};

export const DropdownMenuTrigger = ({ children, ...props }) => {
  return (
    <button {...props} className="inline-flex justify-center">
      {children}
    </button>
  );
};

export const DropdownMenuContent = ({ children, align = "start" }) => {
  return (
    <div
      className={`absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none ${align}`}
    >
      {children}
    </div>
  );
};

export const DropdownMenuItem = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
    >
      {children}
    </button>
  );
};