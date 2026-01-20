import { title } from "@/components/primitives";
import { NeonGlassCard } from "@/shared/ui/neon-card";
import { CreateItemForm } from "@/components/UI/card/form/create-item-form";

export default function CreateItemPage() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className={title()}>Favorite</h1>
      <CreateItemForm />
    </div>
  );
}
