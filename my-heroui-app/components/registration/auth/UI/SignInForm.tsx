"use client";
import { uniqueText } from "@/components/primitives";
import { Button } from "@/shared/ui/button";
import clsx from "clsx";

import { useSignIn } from "../model/use-sign-in";

export function SignInForm() {
  const { register, errorMessage, handleSubmit, isLoading } = useSignIn();
  return (
    <form className="flex flex-col gap-2 p-6 w-full" onSubmit={handleSubmit}>
      <h1 className="text-2xl">
        Введите{" "}
        <span className={clsx(uniqueText({ color: "violet", size: "sm" }))}>
          email
        </span>
      </h1>
      <input
        className="
                  px-5 py-2 rounded-full 
                bg-black text-white text-lg tracking-[0.2em]
                border-2 border-cyan-500/80
                shadow-[0_0_15px_rgba(6,182,212,0.4)]
                outline-none focus:border-cyan-400 
                focus:shadow-[0_0_25px_rgba(34,211,238,0.6)]
                transition-all duration-300
                "
        type="email"
        placeholder="test@test.com"
        {...register("email", {
          required: "This field is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "Invalid email address",
          },
        })}
      />
      <h1 className="text-2xl">
        Введите{" "}
        <span className={clsx(uniqueText({ color: "violet", size: "sm" }))}>
          пароль
        </span>
      </h1>
      <input
        className="
                 px-5 py-2 rounded-full 
                bg-black text-white text-lg tracking-[0.2em]
                border-2 border-cyan-500/80
                shadow-[0_0_15px_rgba(6,182,212,0.4)]
                outline-none focus:border-cyan-400 
                focus:shadow-[0_0_25px_rgba(34,211,238,0.6)]
                transition-all duration-300
                "
        type="text"
        placeholder="qwerty"
        {...register("password", {
          required: "This field is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        })}
      />
      <div className="mt-20 w-full flex justify-center">
        <Button size="lg" disabled={isLoading}>
          Sign In
        </Button>
      </div>
      {errorMessage ? (
        <div className="text-rose-500">{errorMessage}</div>
      ) : (
        <div className="p-5"></div>
      )}
    </form>
  );
}
