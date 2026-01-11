import CardItem from "./CardItem";

export default function CardList() {
  return (
    <div className="grid grid-cols-4 gap-4 my-10  min-w-4xl">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <CardItem key={item}>Card</CardItem>
      ))}
    </div>
  );
}
