"use client";

import Navigation from "./Navigation";
import Logo from "@/components/icons/Logo";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 h-16 w-full flex items-center bg-accent-secondary z-1000 px-6">
      <div className="h-full w-full flex items-center justify-start lg:justify-center relative gap-16">
        <Logo className="h-10 w-10 text-background" />

        <Navigation />
      </div>
    </header>
  );
}
