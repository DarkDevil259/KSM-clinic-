import { useEffect, useRef, useState, useCallback } from "react";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export function AnimatedCounter({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
}: AnimatedCounterProps) {
  // Ensure end is a valid number
  const validEnd = typeof end === 'number' && !isNaN(end) && isFinite(end) ? Math.max(0, end) : 0;
  const [count, setCount] = useState(0);

  // Use refs for state that shouldn't trigger re-renders or effect re-runs
  const hasAnimatedRef = useRef(false);
  const countRef = useRef(0);
  const ref = useRef<HTMLSpanElement>(null);
  const previousEndRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(false);

  // Keep countRef in sync with state
  useEffect(() => {
    countRef.current = count;
  }, [count]);

  const animateCount = useCallback((startVal: number, targetVal: number) => {
    // Cancel any existing animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startVal + (targetVal - startVal) * easeOutQuart);

      setCount(Math.max(0, currentValue)); // Ensure non-negative

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Ensure we end at the exact end value
        setCount(targetVal);
        animationFrameRef.current = null;
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [duration]);

  // Watch for end value changes
  useEffect(() => {
    // If first render
    if (previousEndRef.current === null) {
      previousEndRef.current = validEnd;
      return;
    }

    // If value changed
    if (previousEndRef.current !== validEnd) {
      if (isVisibleRef.current) {
        // Value changed and component is visible - animate from current to new value
        animateCount(countRef.current, validEnd);
      }
      previousEndRef.current = validEnd;
    }
  }, [validEnd, animateCount]);

  // Intersection Observer
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisibleRef.current = true;
            if (!hasAnimatedRef.current) {
              hasAnimatedRef.current = true;
              // Start animation from 0 to validEnd
              animateCount(0, validEnd);
            } else if (previousEndRef.current !== validEnd) {
              // Already animated but value changed (and tracked in other effect, but strictly handling visibility entry here)
              // Actually, the other effect handles value changes while visible.
              // This handles BECOMING visible.
              // If we become visible, we might need to resume or update?
              // The logic "animateCount(count, validEnd)" was here before.
              if (countRef.current !== validEnd) {
                animateCount(countRef.current, validEnd);
              }
            }
          } else {
            isVisibleRef.current = false;
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      // DO NOT cancel animation here, as it might be running while we observe/unobserve
      // actually cleanup should cancel if we unmount.
      // But purely unobserving? 
      // If we unmount, yes.
      // But if deps change? deps are [validEnd, animateCount].
      // If validEnd changes, we want to maybe restart animation? 
      // The other effect handles validEnd changes.
    };
  }, [validEnd, animateCount]);

  // Cleanup on unmount only
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return num.toLocaleString();
    }
    return num.toString();
  };

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
}




