import { Eye, EyeOff } from "lucide-react";
import clsx from "clsx";

type Props = {
  icon: React.ReactNode;
  placeholder: string;
  error?: string;
  type: "text" | "password";
  toggle: () => void;
  visible: boolean;
  register: any;
  color: "cyan" | "violet" | "emerald";
};

export function PasswordInput({
  icon,
  placeholder,
  error,
  type,
  toggle,
  visible,
  register,
  color,
}: Props) {
  const colors = {
    cyan: "border-cyan-500/60 shadow-[0_0_15px_rgba(34,211,238,0.4)]",
    violet: "border-violet-500/60 shadow-[0_0_15px_rgba(139,92,246,0.4)]",
    emerald: "border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.4)]",
  };

  return (
    <div className="flex flex-col gap-1">
      <div
        className={clsx(
          "flex items-center gap-3 px-5 py-3 rounded-full bg-black border",
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

        <button
          type="button"
          onClick={toggle}
          className="text-slate-400 hover:text-white transition"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && <span className="text-rose-500 text-sm pl-4">{error}</span>}
    </div>
  );
}
