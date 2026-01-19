"use client";
import { NeonGlassCard } from "@/shared/ui/neon-card";
import CardItem from "./CardItem";
import { useCardItemQuery } from "./queries/useCardItemQuery";
import { CreateItemDto } from "@/server/generate/generate";

export default function CardList() {
  const { data, isLoading, error } = useCardItemQuery();
  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка при загрузке</div>;
  const items = data as unknown as CreateItemDto[];
  return (
    <div className="grid grid-cols-4 gap-4 my-10  min-w-5xl">
      {items?.map((item) => (
        <NeonGlassCard
          key={item.id}
          color="purple"
          intensity="high"
          className="p-6 w-60"
        >
          <CardItem item={item}>Card</CardItem>
        </NeonGlassCard>
      ))}
    </div>
  );
}
