import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function Modal({ open, onClose, children, title }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="bg-[var(--clr-bg-light)] dark:bg-[var(--clr-bg-dark)] rounded-2xl shadow-2xl p-8 max-w-md w-full relative animate-fadeInUp">
        {title && <h2 className="text-xl font-bold mb-4 text-[var(--clr-text-primary)]">{title}</h2>}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-[var(--clr-text-muted)] hover:text-[var(--clr-primary)] focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)]"
        >
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path d="M6 6l8 8M6 14L14 6" /></svg>
        </button>
        {children}
      </div>
    </div>
  );
}
