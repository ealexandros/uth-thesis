import React from "react";
import { twMerge } from "tailwind-merge";
import { IconType } from "react-icons";

const sizes = {
  xs: "text-xs px-3 py-1",
  sm: "text-sm px-4 py-1",
  md: "text-sm  py-2 px-4",
};

const variants = {
  primary: "bg-primary rounded-md text-light hover:bg-primary-hover",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
};

export const Button: React.FC<ButtonProps> = ({
  type = "button",
  variant = "primary",
  size = "sm",
  className = "",
  ...props
}) => (
  <button
    type={type}
    className={twMerge(
      "w-min capitalize",
      sizes[size],
      variants[variant],
      className
    )}
    {...props}
  >
    {props.children}
  </button>
);
