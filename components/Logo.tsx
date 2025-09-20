"use client";
import { motion } from "framer-motion";
import React from "react";

export function Logo({ size = 32 }: { size?: number }) {
  return (
    <div className="inline-flex items-center justify-center shrink-0" aria-label="Xerironx logo">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 160, damping: 14 }}
        className="relative"
        style={{ width: size, height: size }}
      >
        {/* Company logo */}
        <img
          src="/xerironx logo.png"
          alt="Xerironx Logo"
          className="w-full h-full object-contain"
        />
      </motion.div>
    </div>
  );
}
