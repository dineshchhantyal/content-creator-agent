import React from "react";

interface BadgeProps {
  variant?: "default" | "outline";
  className?: string;
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ variant = "default", className, children }) => {
  const baseStyles = "inline-flex items-center px-2 py-1 rounded text-sm font-medium";
  const variantStyles = variant === "default"
    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
    : "border border-gray-300 text-gray-600 dark:border-gray-800 dark:text-gray-400";

  return (
    <span className={`${baseStyles} ${variantStyles} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;