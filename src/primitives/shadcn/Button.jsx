import React from 'react';

const sizeMap = {
  small: "sm",
  medium: "default",
  large: "lg",
};

const variantMap = {
  primary: "default",
  secondary: "outline",
  danger: "destructive",
};

export const Button = ({ children, onClick, variant = 'primary', size = 'medium' }) => {
  const normalizedSize = sizeMap[size] || "default";
  const normalizedVariant = variantMap[variant] || "default";

  // Using raw tailwind classes as a semantic fallback for Shadcn Button natively
  let baseClass = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";
  
  let variantClass = "";
  if (normalizedVariant === "default") variantClass = "bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90";
  if (normalizedVariant === "outline") variantClass = "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50";
  if (normalizedVariant === "destructive") variantClass = "bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90";

  let sizeClass = "";
  if (normalizedSize === "default") sizeClass = "h-10 px-4 py-2";
  if (normalizedSize === "sm") sizeClass = "h-9 rounded-md px-3";
  if (normalizedSize === "lg") sizeClass = "h-11 rounded-md px-8";

  return (
    <button onClick={onClick} className={`${baseClass} ${variantClass} ${sizeClass}`}>
      {children}
    </button>
  );
};
