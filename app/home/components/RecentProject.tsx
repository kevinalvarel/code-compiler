import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { getProjects } from "@/json/projects";
import { getSession } from "@/server/auth";
import { Clock, Folder, ArrowRight } from "lucide-react"; // Tambah import icon
import Link from "next/link";
import { redirect } from "next/navigation";

const RecentProject = async () => {
  const session = await getSession();
  if (!session) redirect("/login");

  const projects = await getProjects(session.user.id);

  return (
    <div>
      <section>
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-neutral-100">
          <Clock className="w-5 h-5 text-emerald-500" /> Recent Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <Link href={`/project/${project.id}`} key={project.id}>
              <SpotlightCard
                className="h-[220px] group cursor-pointer border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 transition-colors"
                spotlightColor="rgba(16, 185, 129, 0.15)"
              >
                <div className="p-5 h-full flex flex-col relative z-10">
                  {/* Header: Icon & Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2.5 bg-neutral-800/50 rounded-xl border border-neutral-700/50 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-all duration-300">
                      <Folder className="w-5 h-5 text-emerald-400/80 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <span className="text-[10px] font-medium tracking-wide text-neutral-400 uppercase bg-neutral-800/80 px-2.5 py-1 rounded-full border border-neutral-700/50 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                      {project.framework}
                    </span>
                  </div>

                  {/* Content: Title & Desc */}
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-neutral-200 mb-2 line-clamp-1 group-hover:text-emerald-400 transition-colors duration-300">
                      {project.name}
                    </h3>
                    <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Footer: Date & Action Arrow */}
                  <div className="mt-4 pt-4 border-t border-neutral-800/50 flex justify-between items-center">
                    <span className="text-xs text-neutral-500 font-medium flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {new Date(project.updatedAt).toLocaleDateString(
                        undefined,
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>

                    {/* Animated Arrow */}
                    <div className="flex items-center text-emerald-400 text-xs font-medium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">
                      Open <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RecentProject;
