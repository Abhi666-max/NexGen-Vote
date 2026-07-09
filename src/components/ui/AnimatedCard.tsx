"use client";

import React, { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface AnimatedCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  delay?: number;
  hoverEffect?: boolean;
}

export function AnimatedCard({
  children,
  className = "",
  delay = 0,
  hoverEffect = true,
  ...rest
}: AnimatedCardProps) {
  return (
    <motion.div
      {...rest}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        borderColor: [
          "rgba(6, 182, 212, 0.35)",
          "rgba(139, 92, 246, 0.45)",
          "rgba(16, 185, 129, 0.35)",
          "rgba(6, 182, 212, 0.35)",
        ],
        boxShadow: [
          "0 0 16px -4px rgba(6, 182, 212, 0.25)",
          "0 0 28px -4px rgba(139, 92, 246, 0.35)",
          "0 0 16px -4px rgba(16, 185, 129, 0.25)",
          "0 0 16px -4px rgba(6, 182, 212, 0.25)",
        ],
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        y: { duration: 0.5, delay, type: "spring", stiffness: 100 },
        borderColor: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        boxShadow: { duration: 5, repeat: Infinity, ease: "easeInOut" },
      }}
      whileHover={
        hoverEffect
          ? {
              scale: 1.015,
              y: -5,
              borderColor: "rgba(34, 211, 238, 0.85)",
              boxShadow: "0 14px 45px -8px rgba(6, 182, 212, 0.45)",
            }
          : undefined
      }
      className={`relative rounded-3xl bg-obsidian-950/75 backdrop-blur-2xl border overflow-hidden ${className}`}
    >
      {/* Continuous Cybernetic Edge Highlight Beam */}
      <motion.div
        animate={{
          opacity: [0.3, 0.85, 0.3],
          left: ["-20%", "100%", "-20%"],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[1px] h-[2px] w-[30%] bg-gradient-to-r from-transparent via-cyber-400 to-transparent pointer-events-none rounded-full blur-[0.5px]"
      />
      {children}
    </motion.div>
  );
}
