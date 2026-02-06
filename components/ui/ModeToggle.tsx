"use client";

import * as React from "react";
import { MdOutlineLightMode as Sun } from "react-icons/md";
import { MdOutlineDarkMode as Moon } from "react-icons/md";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-10 h-10" />;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative flex items-center justify-center h-10 w-10 bg-transparent cursor-pointer border-none"
    >
      <Sun className="h-8 w-8 text-background rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />

      <Moon className="absolute h-8 w-8 text-background rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Theme umschalten</span>
    </button>
  );
}
