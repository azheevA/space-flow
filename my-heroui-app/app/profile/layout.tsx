import { ProtectedPage } from "@/components/registration/auth/protected-page/ui/protected-page";

export default function ChangePasswordLayout({
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
