import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import clsx from "clsx";
import ModalComponent from "@/components/UI/modal/modal";
import RegistrationComponent from "@/components/registration/registrationComponent";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className={title()}>
        Welcome to{" "}
        <span className={title({ color: "violet" })}>{siteConfig.name}</span>
      </h1>

      <p
        className={clsx(
          subtitle(),
          "flex items-center justify-center  max-w-2xl text-center"
        )}
      >
        {siteConfig.description}
      </p>
      <ModalComponent title="Регистрация">
        <RegistrationComponent />
      </ModalComponent>
    </section>
  );
}
