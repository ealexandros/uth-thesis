import React from "react";
import { twMerge } from "tailwind-merge";

const sizes = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "h-16 w-16",
  xl: "h-24 w-24",
};

const positions = {
  max: "w-max h-max",
  center: "w-full h-full",
  screen: "w-screen h-screen",
};

type SpinnerProps = {
  size?: keyof typeof sizes;
  position?: keyof typeof positions;
  className?: string;
  wrapperClassName?: string;
};

export type SpinnerArgs = Omit<SpinnerProps, "className">;

export const Spinner: React.FC<SpinnerProps> = ({
  className,
  size = "md",
  position = "center",
  wrapperClassName,
}) => (
  <div
    data-testid="loader"
    className={twMerge(
      "flex flex-col justify-center items-center",
      positions[position],
      wrapperClassName
    )}
  >
    <div
      style={{ borderTopColor: "transparent" }}
      className={twMerge(
        "border-4 border-solid rounded-full animate-spin h-full w-full border-primary",
        sizes[size],
        className
      )}
    />
  </div>
);
