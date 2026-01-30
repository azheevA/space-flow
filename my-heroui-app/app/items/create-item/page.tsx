"use client";
import { CreateItemForm } from "@/components/card/ui/create-item-form";
import { useRouter } from "next/navigation";

export default function CreateItemPage() {
  const router = useRouter();

  const handleComplete = () => {
    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#050508] py-12 px-4">
      <CreateItemForm onComplete={handleComplete} />
    </div>
  );
}
