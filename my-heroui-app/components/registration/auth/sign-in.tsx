import { SignInForm } from "./UI/signInForm";
import clsx from "clsx";

type SignUpPageProps = {
  className?: string;
};
export function SignInPage({ className }: SignUpPageProps) {
  return (
    <div className={clsx("min-h-screen flex flex-col ", className)}>
      <main className="grow flex flex-col ">
        <div className="rounded-xl border border-slate-300 px-14 py-8  bg-[#19172c] w-full">
          <h1 className="text-2xl mb-10">Sign In</h1>
          <SignInForm />
        </div>
      </main>
    </div>
  );
}
