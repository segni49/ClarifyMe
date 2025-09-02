import React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "highlight";
}

export default function Card({
  children,
  variant = "default",
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl shadow-lg p-6 transition-all",
        variant === "default" && "bg-[var(--clr-bg-light)] border border-[var(--clr-bg-dark)]",
        variant === "highlight" && "bg-[var(--clr-highlight)] text-white border-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
