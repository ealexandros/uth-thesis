import React from "react";
import { twMerge } from "tailwind-merge";

const sizes = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-md",
};

const variants = {
  primary:
    "bg-transparent border-b-2 border-dark pb-2 focus:border-b-[#1D2131] transition-all duration-150",
};

type TextProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
};

export const Text = ({
  type = "text",
  placeholder = "Type..",
  variant = "primary",
  className = "",
  size = "sm",
  ...props
}: TextProps) => (
  <input
    type={type}
    placeholder={placeholder}
    className={twMerge(
      "outline-none",
      variants[variant],
      sizes[size],
      className
    )}
    {...props}
  />
);
