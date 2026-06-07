import { useState, useEffect } from "react";

interface UseCountUpOptions {
  end: number;
  duration?: number; // in milliseconds
  start?: number;
  decimals?: number;
}

export function useCountUp({
  end,
  duration = 2000,
  start = 0,
  decimals = 0,
}: UseCountUpOptions): string {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function für sanfte Animation (ease-out)
      const easeOutQuad = 1 - Math.pow(1 - progress, 2);

      const currentCount = start + (end - start) * easeOutQuad;

      setCount(
        decimals === 0
          ? Math.round(currentCount)
          : parseFloat(currentCount.toFixed(decimals))
      );

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [end, duration, start, decimals]);

  return decimals === 0 ? count.toString() : count.toFixed(decimals);
}
