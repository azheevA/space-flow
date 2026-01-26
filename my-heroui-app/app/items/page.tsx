import { title, uniqueText } from "@/components/primitives";
import CardList from "../../components/UI/card/CardList";

import clsx from "clsx";
import { Link } from "@heroui/link";
import { Button } from "@/shared/ui/button";

export default function ItemList() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className={clsx(title(), "mb-10", uniqueText({ color: "cyan" }))}>
        Каталог
      </h1>
      <Button variant="primary">
        <Link href="/items/create-item">Создать свою карточку</Link>
      </Button>
      <CardList />
    </div>
  );
}
