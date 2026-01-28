"use client";
import { title, uniqueText } from "@/config/utils/primitives";
import CardList from "../../components/card/ui/CardList";

import clsx from "clsx";
import { Link } from "@heroui/link";
import { Button } from "@/shared/ui/button/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select, SelectItem } from "@heroui/select";

export default function ItemList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSortChange = (keys: any) => {
    const selectedSort = Array.from(keys)[0] as string;
    const params = new URLSearchParams(searchParams);
    if (selectedSort) {
      params.set("sort", selectedSort);
    }
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className={clsx(title(), "mb-10", uniqueText({ color: "cyan" }))}>
        Каталог
      </h1>
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between w-full max-w-7xl px-4 mb-6">
        <Button size="lg" variant="secondary">
          <Link href="/items/create-item">Создать свою карточку</Link>
        </Button>
        <Select
          label="Сортировка"
          placeholder="Выберите порядок"
          className="max-w-xs"
          variant="bordered"
          onSelectionChange={handleSortChange}
          selectedKeys={new Set([searchParams.get("sort") || "newest"])}
        >
          <SelectItem key="newest">Сначала новые</SelectItem>
          <SelectItem key="oldest">Сначала старые</SelectItem>
          <SelectItem key="title_asc">По алфавиту (А-Я)</SelectItem>
        </Select>
      </div>
      <CardList />
    </div>
  );
}
