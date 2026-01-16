"use client";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import clsx from "clsx";
import ModalComponent from "@/components/UI/modal/modal";
import { authControllerGetSessionInfo } from "@/server/generate/generate";
import { useQuery } from "@tanstack/react-query";
import { SignUpForm } from "@/components/registration/auth/UI/signUpForm";
import { NeonGlassCard } from "@/shared/ui/neon-card";
import { Image } from "@heroui/image";
export default function Home() {
  const { data } = useQuery({
    queryKey: ["session"],
    queryFn: () => authControllerGetSessionInfo(),
  });

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <NeonGlassCard
        color="purple"
        intensity="high"
        className="p-6 flex flex-cols justify-center items-center"
      >
        <h1 className={title()}>
          Welcome to{" "}
          <span className={title({ color: "violet" })}>{siteConfig.name}</span>
        </h1>
        <div className="">{data?.email}</div>
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
      <Image
        src="/logo.svg"
        alt="space-flow logo"
        width={400}
        height={400}
        className="rounded-xl mt-10"
      />
    </section>
  );
}
