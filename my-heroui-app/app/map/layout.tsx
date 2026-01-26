import { ProtectedPage } from "@/components/registration/auth/UI/protected-page";

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className=" ">
      <ProtectedPage>
        <div className="text-center justify-center">{children}</div>
      </ProtectedPage>
    </section>
  );
}
