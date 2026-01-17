import { useState } from "react";
import { useBlockListQuery } from "../query/queries";

export function useBlockItems() {
  const [q, setQ] = useState("");
  const blockListQuery = useBlockListQuery({ q });
  const items = blockListQuery.data?.items ?? [];
  return { items, isLoading: blockListQuery.isLoading, q, setQ };
}
