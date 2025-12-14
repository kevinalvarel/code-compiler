import DecryptedText from "@/components/react-bits/DecryptedText";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const Greetings = async () => {
  const session = await getSession();
  if (!session) redirect("/login");
  const userFirstName = session.user.name.split(" ")[0];

  return (
    <>
      <section className="mb-12 space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
          <span className="text-neutral-500 mr-3">Welcome back,</span>
          <DecryptedText
            text={userFirstName}
            animateOn="view"
            revealDirection="start"
            speed={50}
            maxIterations={15}
            className="text-white"
          />
        </h1>
        <p className="text-neutral-400 max-w-lg">
          Ready to build something amazing today? Start a new project or
          continue where you left off.
        </p>
      </section>
    </>
  );
};

export default Greetings;
