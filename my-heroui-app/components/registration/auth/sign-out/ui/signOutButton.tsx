import { Button } from "@/shared/ui/button/button";
import React from "react";
import { useSignOut } from "../model/use-sign-out";

export default function SignOutButton() {
  const { signOut, isLoading } = useSignOut();
  return (
    <Button variant="classic" disabled={isLoading} onClick={() => signOut({})}>
      Sign Out
    </Button>
  );
}
