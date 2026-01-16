import { Spinner } from "@heroui/spinner";

export default function Loading() {
  return (
    <div className="flex min-h-[500px] w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Spinner
          color="secondary"
          variant="gradient"
          size="lg"
          label="Загрузка..."
          labelColor="secondary"
        />
      </div>
    </div>
  );
}
