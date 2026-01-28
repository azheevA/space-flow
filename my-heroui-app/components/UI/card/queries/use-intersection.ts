import { useCallback, useRef } from "react";

export function useIntersection(onIntersect: () => void) {
  const observer = useRef<IntersectionObserver | null>(null);

  return useCallback(
    (el: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      });

      if (el) observer.current.observe(el);
    },
    [onIntersect],
  );
}
