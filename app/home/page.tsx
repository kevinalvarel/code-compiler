import { getSession } from "@/server/auth";
import { redirect } from "next/navigation";
import Header from "./components/Header";
import QuickStart from "./components/QuickStart";
import Greetings from "./components/Greetings";
import RecentProject from "./components/RecentProject";

const Home = async () => {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <Header />
      <Greetings />
      <QuickStart />
      <RecentProject />
    </div>
  );
};

export default Home;
