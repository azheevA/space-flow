import React from "react";
import AddBlockItemForm from "./ui/add-block-item-form";
import { useBlockListQuery } from "./query/queries";
import BlockList from "./ui/block-list";

export function BlockPage() {
  const { data, isLoading } = useBlockListQuery();
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="py-10 px-5 w-full flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-6">Block list</h1>
      <AddBlockItemForm />
      <BlockList />
    </div>
  );
}
