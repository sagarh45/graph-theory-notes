import React from 'react';

export function Button({ children, variant = 'default', className = '', ...props }) {
  const base = "px-4 py-2 rounded font-semibold transition";
  const variants = {
    default: "bg-primary text-black hover:bg-blue-800",
    outline: "border border-primary text-primary bg-white hover:bg-primary hover:text-white"
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}