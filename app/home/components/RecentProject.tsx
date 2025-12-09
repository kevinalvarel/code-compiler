import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { getProjects } from "@/json/projects";
import { getSession } from "@/server/auth";
import { Clock, Folder } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const RecentProject = async () => {
  const session = await getSession();
  if (!session) redirect("/login");

  const projects = await getProjects(session.user.id);

  return (
    <div>
      <section>
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-500" /> Recent Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {projects.map((project: any) => (
            <Link href={`/project/${project.id}`} key={project.id}>
              <SpotlightCard
                className="h-48 group cursor-pointer"
                spotlightColor="rgba(16, 185, 129, 0.15)"
              >
                <div className="p-6 h-full flex flex-col relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-neutral-800/50 rounded-lg">
                      <Folder className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className="text-xs text-neutral-500 font-mono border border-neutral-800 px-2 py-1 rounded">
                      {project.framework}
                    </span>
                  </div>

                  <h3 className="text-lg font-medium text-white mb-2 line-clamp-1 group-hover:text-emerald-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-neutral-400 line-clamp-2 mb-auto">
                    {project.description}
                  </p>

                  <div className="text-xs text-neutral-600 mt-4 pt-4 border-t border-neutral-800 flex justify-between">
                    <span>
                      Edited {new Date(project.updatedAt).toLocaleDateString()}
                    </span>
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
