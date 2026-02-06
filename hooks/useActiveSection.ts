import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const useActiveSection = (isHomePage: boolean, sections: string[]) => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (!isHomePage) return;

    const ctx = gsap.context(() => {
      sections.forEach((id) => {
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActiveSection(id);
          },
        });
      });
    });

    return () => ctx.revert();
  }, [isHomePage, sections]);

  return activeSection;
};