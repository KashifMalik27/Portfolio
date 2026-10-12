'use client';

import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    let lenis;
    let isMounted = true;

    const setupSmoothScroll = async () => {
      const Lenis = (await import('lenis')).default;

      if (!isMounted) return;

      lenis = new Lenis({
        autoRaf: true,
        lerp: 0.14,
        smoothWheel: true,
        syncTouch: false,
        anchors: { offset: -96 },
      });
    };

    setupSmoothScroll();

    return () => {
      isMounted = false;
      if (lenis) lenis.destroy();
    };
  }, []);

  return null;
}
