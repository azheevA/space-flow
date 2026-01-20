import { ProtectedPage } from "@/components/registration/auth/UI/protected-page";

export default function FavoriteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 ">
      <ProtectedPage>
        <div className="inline-block text-center justify-center">
          {children}
        </div>
      </ProtectedPage>
    </section>
  );
}
