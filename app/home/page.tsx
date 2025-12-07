import { getSession } from "@/server/auth";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await getSession();
  if (!session) redirect("/login");

  return <div>Halo ini adalah homepage</div>;
};

export default Home;
