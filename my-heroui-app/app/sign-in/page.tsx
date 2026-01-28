"use client";
import { SignInPage } from "@/components/registration/auth/sign-in/ui/sign-in";
import { motion } from "framer-motion";
import React from "react";

export default function page() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-10"
    >
      <SignInPage className="max-w-[900px] mx-auto" />
    </motion.div>
  );
}
