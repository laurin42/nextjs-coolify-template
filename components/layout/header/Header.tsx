"use client";

import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 h-16 w-full flex items-center bg-background text-foreground z-1000">
      <div className="h-full w-full flex items-center justify-start lg:justify-center relative">
        <Navigation />
      </div>
    </header>
  );
}
