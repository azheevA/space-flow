import React from "react";
import { useBlockItems } from "../model/use-block-items";
import Loading from "@/app/(protected)/loading";
import BlockItem from "./block-item";
import clsx from "clsx";

export default function BlockList({ className }: { className?: string }) {
  const { isLoading, items, q, setQ } = useBlockItems();
  return (
    <div className={clsx("mt-10", className)}>
      <input
        className="p-4 border border-white rounded-xl"
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search..."
      />
      <div className="rounded-xl border-slate-100/50 px-10 py-6 gap-2">
        {isLoading ? (
          <Loading />
        ) : (
          items.map((item) => <BlockItem key={item.id} {...item} />)
        )}
      </div>
    </div>
  );
}
