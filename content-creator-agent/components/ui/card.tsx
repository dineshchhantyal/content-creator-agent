import React from "react";

export const Card = ({ children, className }) => {
  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

export const CardHeader = ({ children, className }) => {
  return <div className={`border-b border-gray-200 dark:border-gray-800 pb-2 ${className}`}>{children}</div>;
};

export const CardTitle = ({ children, className }) => {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
};

export const CardDescription = ({ children, className }) => {
  return <p className={`text-sm text-gray-600 dark:text-gray-400 ${className}`}>{children}</p>;
};