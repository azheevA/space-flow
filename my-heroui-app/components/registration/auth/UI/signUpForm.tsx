import {
  authControllerSignUp,
  SignUpBodyDto,
} from "@/server/generate/generate";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  password: string;
}
export default function SignUpForm() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<IForm>();
  const signUpMutation = useMutation({
    mutationFn: (data: SignUpBodyDto) => authControllerSignUp(data),
  });
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit((data) => {
        signUpMutation.mutate(data);
      })}
    >
      <input
        className="p-2 bg-amber-950 border border-black rounded-2xl"
        type="email"
        placeholder="заполните поле email"
        {...register("email", {
          required: "This field is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "Invalid email address",
          },
        })}
      />
      <input
        className="p-2 bg-amber-950 border border-black rounded-2xl"
        type="text"
        placeholder="заполните поле password"
        {...register("password", {
          required: "This field is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "Invalid password",
          },
        })}
      />
      <button
        className="bg-blue-900 rounded-2xl border border-b-cyan-500"
        disabled={signUpMutation.isPending}
      >
        Sign Up
      </button>
    </form>
  );
}
