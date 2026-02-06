"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useIsMobile } from "@/hooks/useIsMobile";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const isMobile = useIsMobile();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!isMobile) {
        smootherRef.current = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 0.6,
          effects: true,
          normalizeScroll: false,
        });
      }
    });

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (link && link.hash && link.pathname === window.location.pathname) {
        const targetElement = document.querySelector(link.hash);
        if (targetElement) {
          e.preventDefault();
          if (smootherRef.current) {
            smootherRef.current.scrollTo(targetElement, true, "top top");
          } else {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      ctx.revert();
      document.removeEventListener("click", handleAnchorClick);
      smootherRef.current = null;
    };
  }, [isMobile, pathname]);

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      const hash = window.location.hash;
      if (hash) {
        const target = document.querySelector(hash);
        if (target) {
          if (smootherRef.current) {
            smootherRef.current.scrollTo(target, false, "top top");
          } else {
            target.scrollIntoView();
          }
        }
      } else {
        if (smootherRef.current) {
          smootherRef.current.scrollTo(0, false);
        } else {
          window.scrollTo(0, 0);
        }
      }
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
