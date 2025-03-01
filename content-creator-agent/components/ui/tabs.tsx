import React from "react";

export const Tabs = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  const handleTabClick = (value) => {
    setActiveTab(value);
  };

  return (
    <div>
      <div className="flex border-b">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              isActive: child.props.value === activeTab,
              onClick: handleTabClick,
            });
          }
          return child;
        })}
      </div>
      <div className="mt-4">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.props.value === activeTab) {
            return child.props.children;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export const TabsList = ({ children }) => {
  return <div className="flex">{children}</div>;
};

export const TabsTrigger = ({ value, isActive, onClick, children }) => {
  return (
    <button
      className={`py-2 px-4 ${isActive ? "border-b-2 border-purple-600" : ""}`}
      onClick={() => onClick(value)}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ children }) => {
  return <div>{children}</div>;
};