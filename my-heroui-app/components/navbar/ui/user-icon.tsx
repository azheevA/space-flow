import { useProfile } from "../../registration/change-user-data/model/use-profile";

export const UserIcon = () => {
  const { data } = useProfile();

  return (
    <img
      src={data?.photo?.url || "/profile.jpg"}
      className="w-10 h-10 rounded-full object-cover border border-cyan-500/40"
    />
  );
};
