import { title } from "@/components/primitives";
import CardList from "../../components/UI/card/CardList";

export default function Favorite() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className={title()}>Favorite</h1>
      <CardList />
    </div>
  );
}
