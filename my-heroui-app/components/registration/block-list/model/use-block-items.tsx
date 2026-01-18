import { useState } from "react";
import { useBlockListQuery } from "../query/queries";
import { useDebouncedValue } from "@/shared/lib/react-std";

export function useBlockItems() {
  const [q, setQ] = useState("");
  const blockListQuery = useBlockListQuery({ q: useDebouncedValue(q, 500) });
  const items = blockListQuery.data?.items ?? [];
  return { items, isLoading: blockListQuery.isLoading, q, setQ };
}
