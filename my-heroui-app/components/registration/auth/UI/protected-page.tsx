"use client";
import Loading from "@/app/(protected)/loading";
import { authControllerGetSessionInfo } from "@/server/generate/generate";
import { ROUTES } from "@/shared/constants/routing";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export function ProtectedPage({ children }: PropsWithChildren) {
  const router = useRouter();
  const { isLoading, isError } = useQuery({
    queryKey: ["session"],
    queryFn: authControllerGetSessionInfo,
    retry: false,
  });
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
