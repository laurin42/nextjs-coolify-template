"use client";

import Link from "next/link";
import { useLayoutEffect, useState, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { IoMdMenu as MenuIcon } from "react-icons/io";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { useScrollTo } from "@/hooks/useScrollTo";
import { useActiveSection } from "@/hooks/useActiveSection";
import MobileMenu from "./MobileMenu";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const executeScroll = useScrollTo();

  const isHomePage = pathname === "/";
  const sections = useMemo(() => ["home", "about", "contact"], []);
  const activeSection = useActiveSection(isHomePage, sections);

  const menuItems = useMemo(
    () => [
      { href: "#home", label: "Home" },
      { href: "#about", label: "About" },
      { href: "#contact", label: "Contact" },
    ],
    [],
  );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-anim-item", {
        y: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, []);

  const handleMenuClick = (href: string) => {
    const targetId = href.replace("#", "");
    if (!isHomePage) {
      router.push(`/${href}`);
    } else {
      executeScroll(targetId);
      window.history.pushState(null, "", href);
    }
    setIsOpen(false);
  };

  return (
    <div className="flex items-center w-full justify-between h-20 text-background">
      <div className="block sm:hidden text-xl  tracking-widest font-semibold">
        <Link href="/">
          {activeSection === "home" || !isHomePage
            ? "PROJECT"
            : activeSection.toUpperCase()}
        </Link>
      </div>

      <nav className="hidden sm:flex items-center gap-8">
        <ul className="flex flex-row gap-8 font-light text-md tracking-widest">
          {menuItems.map((item) => {
            const isActive =
              isHomePage && activeSection === item.href.replace("#", "");
            return (
              <li key={item.href} className="nav-anim-item">
                <button
                  onClick={() => handleMenuClick(item.href)}
                  className={`relative cursor-pointer transition-colors duration-300 group ${
                    isActive
                      ? "text-accent-primary font-medium"
                      : "hover:text-accent-primary/80"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute left-0 -bottom-1 h-px bg-current transition-all duration-500 ease-in-out ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="hidden sm:block">
        <ModeToggle />
      </div>

      <div className="sm:hidden flex items-center gap-4">
        <ModeToggle />
        <button onClick={() => setIsOpen(true)} aria-label="Open menu">
          <MenuIcon className="w-10 h-10" />
        </button>
      </div>

      <MobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        menuItems={menuItems}
        onItemClick={handleMenuClick}
      />
    </div>
  );
}
