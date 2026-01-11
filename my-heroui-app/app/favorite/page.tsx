import { title } from "@/components/primitives";
import CardList from "../../components/UI/card/CardList";

export default function Favorite() {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-4">
      <h1 className={title()}>Favorite</h1>
      <p className="text-default-600">This is the favorite page.</p>
      <CardList />
    </div>
  );
}
