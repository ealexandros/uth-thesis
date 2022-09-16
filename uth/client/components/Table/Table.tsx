import React from "react";
import { twMerge } from "tailwind-merge";

type BaseTableProps = {
  className?: string;
  children?: React.ReactNode | React.ReactNode[] | string;
  title?: string;
};

export const Table = ({ children, className }: BaseTableProps) => (
  <table
    className={twMerge(
      "table-fixed w-full text-center text-xs sm:text-sm",
      className
    )}
  >
    {children}
  </table>
);

export const THead = ({ children, className }: BaseTableProps) => (
  <thead className={twMerge("uppercase", className)}>{children}</thead>
);

export const THCell = ({ children, className }: BaseTableProps) => (
  <th scope="col" className={twMerge("py-8", className)}>
    {children}
  </th>
);

export const TBCell = ({ children, className }: BaseTableProps) => (
  <th scope="row" className={twMerge("py-4 font-light", className)}>
    {children}
  </th>
);

export const TBody = ({ children, className }: BaseTableProps) => (
  <tbody className={twMerge(className)}>{children}</tbody>
);

export const TRow = ({ children, className }: BaseTableProps) => (
  <tr className={twMerge(className)}>{children}</tr>
);
