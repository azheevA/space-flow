"use client";

import { title, subtitle, uniqueText } from "@/config/utils/primitives";
import { MapBlock } from "../../components/map/MapBlock";
import { NeonGlassCard } from "@/shared/border-css/neon-card";
import { motion } from "framer-motion";
import clsx from "clsx";

export default function MapPage() {
  return (
    <section className="relative flex flex-col items-center justify-center gap-4 ">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-cyan-500/10 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h1
          className={clsx(
            title({ size: "lg" }),
            uniqueText({ color: "cyan" }),
            "mb-5",
          )}
        >
          Интерактивная карта
        </h1>
        <p className={clsx(subtitle(), "text-default-500 max-w-2xl", "mt-4")}>
          Используйте навигацию для изучения объектов. Я интегрировали 2GIS для
          интереса.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-6xl px-4"
      >
        <NeonGlassCard
          color="cyan"
          intensity="medium"
          className="p-3 border-white/5 shadow-3xl"
        >
          <MapBlock />
        </NeonGlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex gap-6 text-xs uppercase tracking-widest text-default-400 font-medium"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          API Connected
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-cyan-500 rounded-full" />
          2GIS Engine
        </div>
      </motion.div>
    </section>
  );
}
