import React from "react";
import clsx from "clsx";

type Props = {
  icon: React.ReactNode;
  placeholder: string;
  error?: string;
  type?: "text" | "email" | "tel";
  register: any;
  color: "cyan" | "violet" | "emerald";
};

export function AuthInput({
  icon,
  placeholder,
  error,
  type = "text",
  register,
  color,
}: Props) {
  const colors = {
    cyan: "border-cyan-500/60 shadow-[0_0_15px_rgba(34,211,238,0.4)] focus-within:shadow-[0_0_25px_rgba(34,211,238,0.6)] focus-within:border-cyan-400",
    violet:
      "border-violet-500/60 shadow-[0_0_15px_rgba(139,92,246,0.4)] focus-within:shadow-[0_0_25px_rgba(139,92,246,0.6)] focus-within:border-violet-400",
    emerald:
      "border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.4)] focus-within:shadow-[0_0_25px_rgba(16,185,129,0.6)] focus-within:border-emerald-400",
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <div
        className={clsx(
          "flex items-center gap-3 px-5 py-3 rounded-full bg-black border transition-all duration-300",
          error
            ? "border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.6)]"
            : colors[color],
        )}
      >
        <span className="text-slate-300">{icon}</span>

        <input
          type={type}
          placeholder={placeholder}
          {...register}
          className="
            bg-transparent w-full text-white outline-none
            placeholder:text-slate-500 tracking-wider
          "
        />
      </div>
      {error && (
        <span className="text-rose-500 text-xs md:text-sm pl-4 animate-in fade-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </div>
  );
}
