import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Header from "./components/Header";
import QuickStart from "./components/QuickStart";
import Greetings from "./components/Greetings";
import RecentPlayground from "./components/RecentPlayground";

const Home = async () => {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-black text-white p-8 overflow-x-hidden">
      <Header />
      <Greetings />
      <QuickStart />
      <RecentPlayground />
    </div>
  );
};

export default Home;
