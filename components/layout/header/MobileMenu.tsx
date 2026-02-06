"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { IoClose as CloseIcon } from "react-icons/io5";
import { ModeToggle } from "@/components/ui/ModeToggle";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  menuItems: { href: string; label: string }[];
  onItemClick: (href: string) => void;
}

export default function MobileMenu({
  isOpen,
  setIsOpen,
  menuItems,
  onItemClick,
}: MobileMenuProps) {
  const mobileLinksRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    if (isOpen && mobileLinksRef.current) {
      const ctx = gsap.context(() => {
        gsap.from("li", {
          x: 30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        });
      }, mobileLinksRef);
      return () => ctx.revert();
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 sm:hidden"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-screen w-full bg-background z-50 transform transition-transform duration-500 ease-in-out sm:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col px-6 py-6`}
      >
        <div className="flex items-center justify-between">
          <ModeToggle />
          <button onClick={() => setIsOpen(false)} aria-label="Close menu">
            <CloseIcon className="w-10 h-10" />
          </button>
        </div>

        <ul
          ref={mobileLinksRef}
          className="h-full flex flex-col items-center justify-center text-4xl space-y-8"
        >
          {menuItems.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => onItemClick(item.href)}
                className="cursor-pointer uppercase tracking-tighter"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
