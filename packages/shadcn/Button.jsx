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

  const baseClass = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  let variantClass = "";
  if (normalizedVariant === "default") {
    variantClass = "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm";
  }
  if (normalizedVariant === "outline") {
    variantClass = "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm";
  }
  if (normalizedVariant === "destructive") {
    variantClass = "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm";
  }

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
