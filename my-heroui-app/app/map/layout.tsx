import { ProtectedPage } from "@/components/registration/auth/UI/protected-page";

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-8 md:py-10">
      <ProtectedPage>
        <div className="text-center justify-center">{children}</div>
      </ProtectedPage>
    </section>
  );
}
