import React, { createContext, useContext, useState, useMemo } from 'react';
import { cn } from "@/lib/utils";

const TabsContext = createContext(null);

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs subcomponents must be rendered within a Tabs provider");
  }
  return context;
};

//TABS
export const Tabs = ({ defaultValue, value: externalValue, onValueChange, orientation = "horizontal", className, children, ...props }) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const activeValue = externalValue !== undefined ? externalValue : internalValue;

  const setActiveValue = (val) => {
    if (onValueChange) {
      onValueChange(val);
    } else {
      setInternalValue(val);
    }
  };

  const contextValue = useMemo(() => ({ activeValue, setActiveValue, orientation }), [activeValue, orientation]);

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={cn("flex w-full", orientation === "vertical" ? "flex-row gap-6" : "flex-col gap-2", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

//TABS LIST
export const TabsList = ({ className, children, variant = "default", ...props }) => {
  const { orientation } = useTabs();

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { variant });
    }
    return child;
  });

  return (
    <div
      className={cn(
        "inline-flex p-1 text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800",
        orientation === "vertical" 
          ? "flex-col items-stretch rounded-xl w-40 h-fit" 
          : cn("items-center justify-center rounded-xl", variant === "line" && "bg-transparent border-b border-slate-200 dark:border-slate-800 p-0 rounded-none w-full justify-start gap-4"),
        className
      )}
      {...props}
    >
      {childrenWithProps}
    </div>
  );
};

//TABS TRIGGER
export const TabsTrigger = ({ className, value, disabled, variant = "default", children, ...props }) => {
  const { activeValue, setActiveValue, orientation } = useTabs();
  const isActive = activeValue === value;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => setActiveValue(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-semibold transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        orientation === "vertical"
          ? cn("rounded-lg text-left justify-start py-2.5 px-4", isActive ? "bg-white text-slate-900 shadow-sm dark:bg-slate-950 dark:text-slate-50" : "hover:bg-slate-100/50 dark:hover:bg-slate-800/50")
          : variant === "line"
            ? cn(
                "border-b-2 bg-transparent rounded-none px-4 py-2 hover:bg-transparent dark:hover:bg-transparent hover:text-slate-900 dark:hover:text-slate-50 transition-colors",
                isActive 
                  ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400" 
                  : "border-transparent text-slate-500"
              )
            : cn(
                "rounded-lg",
                isActive 
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-950 dark:text-slate-50" 
                  : "hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
              ),
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

//TABS CONTENT
export const TabsContent = ({ className, value, children, ...props }) => {
  const { activeValue } = useTabs();
  if (activeValue !== value) return null;

  return (
    <div
      className={cn("mt-2 text-sm text-slate-500 dark:text-slate-400 animate-fade-in w-full", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export function TabsLine() {
  return (
    <Tabs defaultValue="overview">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Content of Tab Pane 1</TabsContent>
      <TabsContent value="analytics">Content of Tab Pane 2</TabsContent>
      <TabsContent value="reports">Content of Tab Pane 3</TabsContent>
    </Tabs>
  );
}

export function TabsVertical() {
  return (
    <Tabs defaultValue="account" orientation="vertical">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <div className="flex-1 min-h-[120px] p-4 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-950">
        <TabsContent value="account">Account settings content: Manage your profile details and username.</TabsContent>
        <TabsContent value="password">Password security content: Configure two-factor authentication and passwords.</TabsContent>
        <TabsContent value="notifications">Notifications configuration content: Select which emails and notifications you receive.</TabsContent>
      </div>
    </Tabs>
  );
}

export function TabsDisabled() {
  return (
    <Tabs defaultValue="home">
      <TabsList>
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger value="settings" disabled>
          Disabled
        </TabsTrigger>
      </TabsList>
      <TabsContent value="home">Welcome home! Content is active.</TabsContent>
    </Tabs>
  );
}
