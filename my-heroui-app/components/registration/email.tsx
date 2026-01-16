import { useSessionQuery } from "./entities";

export const UserEmail = () => {
  const { data } = useSessionQuery();

  if (!data?.email) return null;

  return <div className="text-sm text-default-500">{data.email}</div>;
};
