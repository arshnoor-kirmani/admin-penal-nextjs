"use client";
import React from "react";
import Header from "./header";
import Hero from "./hero";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <Hero />
      </main>

      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-500">
          <div>© {new Date().getFullYear()} Institute Management System</div>
          <div className="mt-3 sm:mt-0 space-x-4">
            <a className="hover:underline" href="#">
              Support
            </a>
            <a className="hover:underline" href="#">
              Privacy
            </a>
            <a className="hover:underline" href="#">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
