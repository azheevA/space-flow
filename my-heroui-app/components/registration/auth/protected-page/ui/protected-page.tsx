"use client";
import Loading from "@/app/(protected)/loading";
import { ROUTES } from "@/config/utils/constants/routing";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import { useSessionQuery } from "../../../session-entities";

export function ProtectedPage({ children }: PropsWithChildren) {
  const router = useRouter();

  const { isLoading, isError } = useSessionQuery();
  useEffect(() => {
    if (isError) {
      router.replace(ROUTES.SIGN_IN);
    }
  }, [isError, router]);
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return null;
  }
  return <>{children}</>;
}
