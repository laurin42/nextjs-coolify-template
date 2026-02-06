import { useCallback } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export const useScrollTo = () => {
  return useCallback((id: string) => {
    const targetId = id.replace("#", "");
    const smoother = ScrollSmoother.get();

    if (smoother) {
      const target = document.getElementById(targetId);
      if (target) {
        smoother.scrollTo(target, true);
      } else if (targetId === "home") {
        smoother.scrollTo(0, true);
      }
    } else {
      const target = document.getElementById(targetId);
      target?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
};