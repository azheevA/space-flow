export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-8 md:py-10">
      <div className="text-center justify-center">{children}</div>
    </section>
  );
}
