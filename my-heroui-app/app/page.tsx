"use client";

import { siteConfig } from "@/config/utils/site";
import { title, subtitle, uniqueText } from "@/config/utils/primitives";
import clsx from "clsx";
import ModalComponent from "@/components/modal/modal";
import { SignUpForm } from "@/components/registration/auth/sign-up/ui/signUpForm";
import { NeonGlassCard } from "@/shared/border-css/neon-card";
import { Image } from "@heroui/image";
import { TextWritter } from "@/components/UI/text-write/text-writing";
import { motion } from "framer-motion";
import { Button } from "@heroui/button";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-12 mt-10 pb-12 md:pb-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-5xl px-4"
      >
        <NeonGlassCard color="purple" intensity="high" className="p-10 md:p-16">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-[1.5] flex flex-col items-center md:items-start text-center md:text-left">
              <h1 className={title({ size: "lg" })}>
                <span
                  className={clsx(uniqueText({ color: "cyan", size: "lg" }))}
                >
                  Добро пожаловать <br /> в{" "}
                </span>
                <span className={title({ color: "violet" })}>
                  {siteConfig.name}
                </span>
              </h1>

              <div className="h-16 mt-6">
                <TextWritter
                  className={clsx(
                    subtitle(),
                    uniqueText({ color: "cyan" }),
                    "text-2xl md:text-3xl font-extrabold tracking-tight",
                  )}
                />
              </div>

              <p className={clsx(subtitle(), "mt-6 text-default-500 max-w-xl")}>
                {siteConfig.description}
              </p>

              <div className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start">
                <ModalComponent title="Get Started">
                  <SignUpForm />
                </ModalComponent>
                <Link
                  href="https://github.com/azheevA/space-flow"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="flat"
                    color="secondary"
                    radius="full"
                    size="lg"
                    className="font-semibold"
                  >
                    Документация
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex-1 flex justify-center relative">
              <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
              <Image
                src="/logo.svg"
                alt="Logo"
                width={320}
                height={320}
                className="relative z-10 drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]"
              />
            </div>
          </div>
        </NeonGlassCard>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl px-4">
        <FeatureCard
          title="Оптимизация"
          desc="Оптимизация релизована скорость Next.js, внедренный SSR значительно улучшает производительность"
          color="cyan"
          delay={0.2}
        />
        <FeatureCard
          title="UI/UX Дизайн"
          desc="Прекрасные эффекты морфинга стекла и плавная анимация с помощью Framer Motion и т.д."
          color="purple"
          delay={0.4}
        />
        <FeatureCard
          title="Безопастность"
          desc="Лучшие достоинств Nest.js а также безопасность паролей благодаря хешу"
          color="pink"
          delay={0.6}
        />
      </div>
    </section>
  );
}

function FeatureCard({
  title: t,
  desc,
  color,
  delay,
}: {
  title: string;
  desc: string;
  color: any;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
    >
      <NeonGlassCard
        color={color}
        intensity="low"
        className="p-8 h-full border-white/5"
      >
        <div
          className={clsx(
            "w-12 h-12 rounded-lg mb-4 flex items-center justify-center bg-white/5",
            color === "cyan" && "text-cyan-400",
            color === "purple" && "text-purple-400",
            color === "pink" && "text-pink-400",
          )}
        >
          <div className="w-6 h-6 border-2 border-current rounded-md opacity-70" />
        </div>
        <h3 className="text-xl font-bold mb-3 tracking-tight">{t}</h3>
        <p className="text-default-400 text-sm leading-relaxed">{desc}</p>
      </NeonGlassCard>
    </motion.div>
  );
}
