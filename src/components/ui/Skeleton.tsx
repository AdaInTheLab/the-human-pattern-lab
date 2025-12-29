// src/components/ui/Skeleton.tsx
import React from "react";

type SkeletonProps = {
  className?: string;
  variant?: "line" | "block" | "pill" | "circle";
};

export function Skeleton({ className = "", variant = "block" }: SkeletonProps) {
  const base =
    "relative overflow-hidden rounded-xl " +
    "bg-white/5 border border-white/10 " +
    "shadow-[0_0_18px_rgba(120,80,255,0.12)] " +
    "before:absolute before:inset-0 " +
    "before:bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.10),transparent)] " +
    "before:translate-x-[-120%] before:animate-[skeleton-shimmer_1.35s_infinite] " +
    "after:absolute after:inset-0 " +
    "after:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent)] " +
    "after:opacity-40";

  const shape =
    variant === "line"
      ? "h-3 rounded-lg"
      : variant === "pill"
        ? "h-7 rounded-full"
        : variant === "circle"
          ? "h-10 w-10 rounded-full"
          : "h-24";

  return <div className={`${base} ${shape} ${className}`} />;
}

/**
 * Optional: a tiny “scanline” overlay wrapper for extra Lab vibes.
 * Use sparingly—one per card/container feels best.
 */
export function ScanlineWrap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={
        "relative " +
        "before:pointer-events-none before:absolute before:inset-0 " +
        "before:bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.04)_0px,rgba(255,255,255,0.04)_1px,transparent_2px,transparent_6px)] " +
        "before:opacity-20 " +
        className
      }
    >
      {children}
    </div>
  );
}
