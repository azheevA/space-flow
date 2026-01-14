import { NeonGlassCard } from "@/shared/ui/neon-card";
import CardItem from "./CardItem";

export default function CardList() {
  return (
    <div className="grid grid-cols-4 gap-4 my-10  min-w-5xl">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <NeonGlassCard
          key={item}
          color="purple"
          intensity="high"
          className="p-6 w-60"
        >
          <CardItem key={item}>Card</CardItem>
        </NeonGlassCard>
      ))}
    </div>
  );
}
