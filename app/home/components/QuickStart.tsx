import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { Code2, LayoutTemplate, Plus } from "lucide-react";
import Link from "next/link";

const QuickStart = () => {
  return (
    <>
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Plus className="w-5 h-5 text-indigo-500" /> Quick Start
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <Link href="/playground">
            <SpotlightCard
              className="h-40 group cursor-pointer"
              spotlightColor="rgba(99, 102, 241, 0.2)"
            >
              <div className="p-6 h-full flex flex-col justify-between relative z-10">
                <div className="p-3 bg-neutral-800/50 w-fit rounded-lg group-hover:bg-indigo-500/20 transition-colors">
                  <Code2 className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">
                    New Playground
                  </h3>
                  <p className="text-sm text-neutral-400">
                    Start coding from scratch
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </Link>

          <Link href="/templates">
            <SpotlightCard
              className="h-40 group cursor-pointer"
              spotlightColor="rgba(236, 72, 153, 0.2)"
            >
              <div className="p-6 h-full flex flex-col justify-between relative z-10">
                <div className="p-3 bg-neutral-800/50 w-fit rounded-lg group-hover:bg-pink-500/20 transition-colors">
                  <LayoutTemplate className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">
                    Browse Templates
                  </h3>
                  <p className="text-sm text-neutral-400">
                    Start with a pre-built setup
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </Link>
        </div>
      </section>
    </>
  );
};

export default QuickStart;
