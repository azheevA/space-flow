import { uniqueText } from "@/config/utils/primitives";
import { SignUpForm } from "./signUpForm";
import clsx from "clsx";

type SignUpPageProps = {
  className?: string;
};
export function SignUpPage({ className }: SignUpPageProps) {
  return (
    <div className={clsx("flex flex-col ", className)}>
      <main className="grow flex flex-col ">
        <div
          className="px-14 pt-8  w-full
                      rounded-2xl bg-[#0b0b14]
                      border border-cyan-500/20
                      shadow-[0_0_40px_rgba(34,211,238,0.15)]"
        >
          <h1
            className={clsx(
              "text-3xl mb-2",
              uniqueText({ color: "cyan", size: "lg" }),
            )}
          >
            Регистрация
          </h1>
          <SignUpForm />
        </div>
      </main>
    </div>
  );
}
