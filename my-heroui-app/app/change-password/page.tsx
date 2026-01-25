"use client";

import { ChangePasswordForm } from "@/components/registration/auth/UI/change-password";
import { ProfileForm } from "@/components/registration/change-user-data/user-profile-form";

export default function ChangePasswordPage() {
  return (
    <>
      <div className="flex flex-row gap-10">
        <ProfileForm />
        <ChangePasswordForm />
      </div>
    </>
  );
}
