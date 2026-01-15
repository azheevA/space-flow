"use client";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import clsx from "clsx";
import ModalComponent from "@/components/UI/modal/modal";
import RegistrationComponent from "@/components/registration/registrationComponent";
import { authControllerGetSessionInfo } from "@/server/generate/generate";
import { useQuery } from "@tanstack/react-query";
import { SignUpPage } from "@/components/registration/auth/sign-up";
import { SignUpForm } from "@/components/registration/auth/UI/signUpForm";
import { NeonGlassCard } from "@/shared/ui/neon-card";

export default function Home() {
  const { data } = useQuery({
    queryKey: ["session"],
    queryFn: () => authControllerGetSessionInfo(),
  });

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <NeonGlassCard color="purple" intensity="high" className="p-6 ">
        <h1 className={title()}>
          Welcome to{" "}
          <span className={title({ color: "violet" })}>{siteConfig.name}</span>
        </h1>
      </NeonGlassCard>

      <p
        className={clsx(
          subtitle(),
          "flex items-center justify-center  max-w-2xl text-center",
        )}
      >
        {siteConfig.description}
      </p>
      <ModalComponent title="Регистрация">
        <SignUpForm />
      </ModalComponent>
    </section>
  );
}
