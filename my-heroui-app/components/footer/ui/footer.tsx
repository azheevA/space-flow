import { Link } from "@heroui/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full max-w-full flex items-center justify-center py-3 fixed bottom-0 left-0 overflow-x-hidden">
      <Link
        isExternal
        className="flex items-center gap-1 text-current"
        href="https://ulan-ude.hh.ru/resume/54894c25ff0d2512130039ed1f45793857656d?hhtmFrom=resume_list"
        title="Ghost Raven"
      >
        <span className="text-default-600">Powered by</span>
        <p className="text-primary">Ghost Raven</p>
      </Link>
    </footer>
  );
}
