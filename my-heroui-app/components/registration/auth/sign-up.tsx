import SignUpForm from "./UI/signUpForm";

export function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col ">
      <main className="grow flex flex-col ">
        <div className="rounded-xl border border-slate-300 px-14 py-8  bg-[#19172c] self-center">
          <h1 className="text-2xl mb-10">Sign Up</h1>
          <SignUpForm />
        </div>
      </main>
    </div>
  );
}
