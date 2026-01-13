"use client";

import { useRef } from "react";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  color?: "cyan" | "purple" | "pink" | "green";
  intensity?: "low" | "medium" | "high";
  className?: string;
};

const COLORS = {
  cyan: "0,255,255",
  purple: "168,85,247",
  pink: "236,72,153",
  green: "34,197,94",
};

const INTENSITY = {
  low: 0.25,
  medium: 0.4,
  high: 0.6,
};

export function NeonGlassCard({
  children,
  color = "cyan",
  intensity = "medium",
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      style={{
        ["--rgb" as any]: COLORS[color],
        ["--glow" as any]: INTENSITY[intensity],
      }}
      className={clsx(
        "neon-border relative overflow-hidden rounded-2xl",
        "bg-white/5 backdrop-blur-xl border border-white/10",
        className,
      )}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
