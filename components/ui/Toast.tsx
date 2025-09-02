import React from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
}

export default function Toast({ message, type = "info" }: ToastProps) {
  const color =
    type === "success"
      ? "bg-[var(--clr-highlight)] text-white"
      : type === "error"
      ? "bg-[var(--clr-error)] text-white"
      : "bg-[var(--clr-accent)] text-white";
  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg font-semibold text-base animate-fadeInUp ${color}`} role="alert">
      {message}
    </div>
  );
}
