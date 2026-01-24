import { useState } from "react";

export function usePasswordToggle(): {
  type: "text" | "password";
  toggle: () => void;
  visible: boolean;
} {
  const [visible, setVisible] = useState(false);

  return {
    type: visible ? "text" : "password",
    toggle: () => setVisible((v) => !v),
    visible,
  };
}
