"use client";

import { useEffect, useRef } from "react";

export default function FastCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.transform = `
        translate(${e.clientX}px, ${e.clientY}px)
      `;
      ref.current.classList.remove("hidden");
    };

    const leave = () => ref.current?.classList.add("hidden");

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, []);

  return <div className="cursor-fast hidden" ref={ref} />;
}
