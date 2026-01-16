import { Link } from "@heroui/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full flex items-center justify-center py-3 absolute bottom-0">
      <Link
        isExternal
        className="flex items-center gap-1 text-current"
        href="https://heroui.com?utm_source=next-app-template"
        title="heroui.com homepage"
      >
        <span className="text-default-600">Powered by</span>
        <p className="text-primary">Ghost Raven</p>
      </Link>
    </footer>
  );
}
