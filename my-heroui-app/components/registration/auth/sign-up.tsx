import { SignUpForm } from "./UI/signUpForm";
import clsx from "clsx";

type SignUpPageProps = {
  className?: string;
};
export function SignUpPage({ className }: SignUpPageProps) {
  return (
    <div className={clsx("flex flex-col ", className)}>
      <main className="grow flex flex-col ">
        <div className="rounded-xl border border-slate-300 px-14 py-8  bg-[#19172c] w-full">
          <h1 className="text-2xl mb-10">Sign Up</h1>
          <SignUpForm />
        </div>
      </main>
    </div>
  );
}
