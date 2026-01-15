import { title } from "@/components/primitives";
import { Image } from "@heroui/image";
export default function BlogPage() {
  return (
    <div>
      <h1 className={title()}>Blog</h1>
      <Image
        src="/1_.svg"
        alt="space-flow logo"
        width={50}
        height={50}
        className="rounded-xl mt-10 bg-white"
      />
    </div>
  );
}
