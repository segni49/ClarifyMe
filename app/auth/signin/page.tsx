"use client";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-[#0F4C5C] via-[#6C2DC7] to-[#1A1A1A] flex flex-col items-center justify-center py-16 animate-fadeInUp">
      <div className="w-full flex flex-col items-center justify-center">
        <section className="bg-white/80 rounded-2xl shadow-2xl p-10 w-full max-w-xl mx-auto flex flex-col items-center animate-scaleIn">
          <h1 className="text-5xl font-extrabold text-[#0F4C5C] mb-6 animate-fadeInUp text-center">
            Welcome to ClarifyMe
          </h1>
          <p className="text-xl text-[#4B5563] mb-8 text-center max-w-lg animate-fadeInUp">
            Your AI-powered learning companion. Sign in with Google to simplify
            complex topics, generate quizzes, and track your learning journey.
          </p>
          <button
            onClick={() => signIn("google", { callbackUrl: "/clarify" })}
            className="px-8 py-4 bg-[#6C2DC7] text-white rounded-xl font-bold shadow-lg hover:bg-[#2ED3B2] transition-all text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C5C] animate-scaleIn"
          >
            Sign in with Google
          </button>
        </section>
      </div>
    </main>
  );
}