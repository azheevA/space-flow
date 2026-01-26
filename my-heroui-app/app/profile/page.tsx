"use client";
import { ChangePasswordForm } from "@/components/registration/auth/UI/change-password";
import { ProfileForm } from "@/components/registration/change-user-data/user-profile-form";
import { motion } from "framer-motion";

export default function ChangePasswordPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-1 flex items-center">
        <div className="flex flex-row gap-10 mx-auto mt-20">
          <ProfileForm />
          <ChangePasswordForm />
        </div>
      </div>
    </motion.div>
  );
}
