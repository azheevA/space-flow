"use client";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { useCardItemQuery } from "./queries/useCardItemQuery";
import { NeonGlassCard } from "@/shared/ui/neon-card";
import CardItem from "./CardItem";
import { CreateItemDto } from "@/server/generate/generate";

export default function CardList() {
  const { data, isLoading, error } = useCardItemQuery();

  if (isLoading)
    return <div className="text-white text-center">Загрузка...</div>;
  if (error)
    return <div className="text-red-500 text-center">Ошибка при загрузке</div>;

  const items = data as unknown as CreateItemDto[];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-10 max-w-7xl mx-auto px-4">
      {items?.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Tilt
            tiltMaxAngleX={7}
            tiltMaxAngleY={7}
            perspective={1200}
            transitionSpeed={1500}
            glareEnable={true}
            glareMaxOpacity={0.2}
            glareColor="#ffffff"
            glarePosition="all"
            glareBorderRadius="12px"
            scale={1.03}
            className="rounded-xl overflow-hidden shadow-2xl"
          >
            <NeonGlassCard
              color="purple"
              intensity="high"
              className="p-4 w-full cursor-pointer border-none"
            >
              <CardItem item={item}>Card</CardItem>
            </NeonGlassCard>
          </Tilt>
        </motion.div>
      ))}
    </div>
  );
}
