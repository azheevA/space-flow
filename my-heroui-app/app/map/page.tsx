import { title } from "@/components/primitives";
import { MapBlock } from "./MapBlock";

export default function Map() {
  return (
    <div className="w-full">
      <h1 className={title()}>Map</h1>
      <MapBlock />
    </div>
  );
}
