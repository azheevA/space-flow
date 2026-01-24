"use client";

import { Eye, EyeOff } from "lucide-react";
import clsx from "clsx";
import { neonInput } from "./input-style";
import { useState } from "react";

type Props = {
  placeholder: string;
  error?: string;
  register: any;
};

export function PasswordInput({ placeholder, register, error }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        className={clsx(
          neonInput,
          error && "border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.6)]",
        )}
        {...register}
      />

      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400 hover:text-cyan-300 transition"
      >
        {visible ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
}
