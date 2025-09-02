import React from "react";
import clsx from "clsx";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function InputField({
  label,
  error,
  className = "",
  ...props
}: InputFieldProps) {
  return (
    <div className="w-full mb-4">
      <label className="block text-[var(--clr-text-muted)] mb-1 font-medium" htmlFor={props.id}>{label}</label>
      <input
        className={clsx(
          "w-full px-4 py-3 rounded-xl border border-[var(--clr-bg-dark)] bg-[var(--clr-bg-light)] text-[var(--clr-text-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clr-accent)] transition-all",
          error && "border-[var(--clr-error)]",
          className
        )}
        {...props}
      />
      {error && <span className="text-[var(--clr-error)] text-sm mt-1 block animate-fadeInUp">{error}</span>}
    </div>
  );
}
