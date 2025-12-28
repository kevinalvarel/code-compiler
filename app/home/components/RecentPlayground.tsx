import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { getRecentSnippets } from "@/db/queries/snippets";
import { getSession } from "@/lib/auth";
import { Clock, Code2, ArrowRight, FileCode } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

// Map language ke warna badge
const languageColors: Record<string, string> = {
  javascript: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  typescript: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  python: "bg-green-500/20 text-green-400 border-green-500/30",
  java: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  cpp: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  c: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  go: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  rust: "bg-red-500/20 text-red-400 border-red-500/30",
  default: "bg-neutral-500/20 text-neutral-400 border-neutral-500/30",
};

const RecentPlayground = async () => {
  const session = await getSession();
  if (!session) redirect("/login");

  const snippets = await getRecentSnippets(session.user.id, 8);

  return (
    <div>
      <section>
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-neutral-100">
          <Clock className="w-5 h-5 text-emerald-500" /> Recent Playground
        </h2>

        {snippets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FileCode className="w-16 h-16 text-neutral-600 mb-4" />
            <h3 className="text-lg font-medium text-neutral-400 mb-2">
              No snippets yet
            </h3>
            <p className="text-sm text-neutral-500 mb-4">
              Create your first code snippet to get started
            </p>
            <Link
              href="/playground/"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Create Snippet
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {snippets.map((snippet) => (
              <Link href={`/playground/${snippet.id}`} key={snippet.id}>
                <SpotlightCard
                  className="h-[220px] group cursor-pointer border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 transition-colors"
                  spotlightColor="rgba(16, 185, 129, 0.15)"
                >
                  <div className="p-5 h-full flex flex-col relative z-10">
                    {/* Header: Icon & Language Badge */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2.5 bg-neutral-800/50 rounded-xl border border-neutral-700/50 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-all duration-300">
                        <Code2 className="w-5 h-5 text-emerald-400/80 group-hover:text-emerald-400 transition-colors" />
                      </div>
                      <span
                        className={`text-[10px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full border flex items-center gap-1.5 ${
                          languageColors[snippet.language.toLowerCase()] ||
                          languageColors.default
                        }`}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
                        {snippet.language}
                      </span>
                    </div>

                    {/* Content: Title & Description */}
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-neutral-200 mb-2 line-clamp-1 group-hover:text-emerald-400 transition-colors duration-300">
                        {snippet.title}
                      </h3>
                      <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">
                        {snippet.description || "No description"}
                      </p>
                    </div>

                    {/* Footer: Date & Action Arrow */}
                    <div className="mt-4 pt-4 border-t border-neutral-800/50 flex justify-between items-center">
                      <span className="text-xs text-neutral-500 font-medium flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {new Date(snippet.updatedAt).toLocaleDateString(
                          undefined,
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </span>

                      {/* Visibility Badge */}
                      <div className="flex items-center gap-2">
                        {snippet.isPublic && (
                          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                            Public
                          </span>
                        )}

                        {/* Animated Arrow */}
                        <div className="flex items-center text-emerald-400 text-xs font-medium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">
                          Open <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default RecentPlayground;
