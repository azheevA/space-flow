import { useProfile } from "./change-user-data/hooks/use-profile";

export const UserEmail = () => {
  const { data } = useProfile();

  return (
    <img
      src={data?.photo?.url || "/avatar-placeholder.png"}
      className="w-10 h-10 rounded-full object-cover border border-cyan-500/40"
    />
  );
};
