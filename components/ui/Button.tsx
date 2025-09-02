import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "disabled";
  loading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  loading = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "min-h-[48px] px-6 py-2 rounded-xl font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-[var(--clr-accent)]",
        variant === "primary" && "bg-[var(--clr-primary)] text-white hover:bg-[var(--clr-accent)]",
        variant === "secondary" && "bg-[var(--clr-accent)] text-white hover:bg-[var(--clr-highlight)]",
        variant === "disabled" && "bg-[var(--clr-bg-dark)] text-[var(--clr-text-muted)] cursor-not-allowed opacity-60",
        loading && "opacity-70 cursor-wait",
        className
      )}
      disabled={variant === "disabled" || loading}
  {...(loading ? { 'aria-busy': 'true' } : {})}
      {...props}
    >
      {loading ? (
        <span className="animate-spin mr-2 inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full"></span>
      ) : null}
      {children}
    </button>
  );
}
