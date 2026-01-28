import { Button } from "@/shared/ui/button/button";
import { useToggleBlocking } from "../module/use-toggle-blocking";

export function ToggleBlockingButton() {
  const { isBlockingEnabled, isLoading, toggleBlocking, isReady } =
    useToggleBlocking();
  if (!isReady) {
    return null;
  }
  return (
    <Button disabled={isLoading} onClick={toggleBlocking}>
      {isBlockingEnabled ? "Disable blocking" : "Enable blocking"}
    </Button>
  );
}
