import { Link } from "@heroui/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full max-w-full flex items-center justify-center py-3 fixed bottom-0 left-0 overflow-x-hidden">
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
