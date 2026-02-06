import { useState, useLayoutEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return ScrollTrigger.isTouch === 1;
    }
    return false; 
  });

  useLayoutEffect(() => {
    const checkMobile = () => {
      const touchStatus = ScrollTrigger.isTouch === 1;
      setIsMobile(touchStatus);
    };

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}