"use client";
import React, { ReactNode } from "react";
import { Card, CardFooter, Image, Button, Link } from "@heroui/react";
import { CreateItemDto } from "@/server/generate/generate";

type ItemType = CreateItemDto;
interface ICardItemProps {
  children: ReactNode;
  item: ItemType;
}
const BASE_URL = "http://localhost:3000";
export default function CardItem({ children, item }: ICardItemProps) {
  const firstPhotoUrl =
    item.photos && item.photos.length > 0
      ? `${BASE_URL}${item.photos[0].url}`
      : "/123.png";
  return (
    <Card isFooterBlurred className="border-none" radius="lg">
      <Image
        alt={item.title}
        className="object-cover"
        height={400}
        src={firstPhotoUrl}
        width={400}
      />
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <div className="flex flex-col">
          <p className="text-tiny text-white/80 font-bold">{item.title}</p>
          {item.content && (
            <p className="text-[9px] text-white/60">{item.content.type}</p>
          )}
        </div>
        <Button
          className="text-tiny text-white bg-black/20"
          color="default"
          radius="lg"
          size="sm"
          variant="flat"
        >
          <Link href={`/items/${item.id}`}>{children}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
