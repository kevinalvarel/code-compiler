"use client";

import { useEffect, useRef } from "react";
import { SiCplusplus, SiJavascript, SiReact } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const languages = [
  {
    name: "JavaScript",
    description: "Web Development",
    icon: <SiJavascript className="w-8 h-8 text-yellow-400" />,
    color: "bg-yellow-500/10 border-yellow-500/20 hover:border-yellow-500/50",
  },
  {
    name: "C++",
    description: "System Programming",
    icon: <SiCplusplus className="w-8 h-8 text-blue-500" />,
    color: "bg-blue-500/10 border-blue-500/20 hover:border-blue-500/50",
  },
  {
    name: "C#",
    description: "Enterprise & Game Dev",
    icon: <TbBrandCSharp className="w-8 h-8 text-purple-500" />,
    color: "bg-purple-500/10 border-purple-500/20 hover:border-purple-500/50",
  },
  {
    name: "React",
    description: "UI Library",
    icon: <SiReact className="w-8 h-8 text-cyan-400" />,
    color: "bg-cyan-500/10 border-cyan-500/20 hover:border-cyan-500/50",
  },
];

const Language = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        ".section-title",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        }
      )
        .fromTo(
          ".section-desc",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .fromTo(
          ".language-card",
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.6"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-20 relative overflow-hidden bg-[#0a0a0a]"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title text-3xl md:text-4xl font-bold text-white mb-4">
            Supported Languages
          </h2>
          <p className="section-desc text-neutral-400 max-w-2xl mx-auto">
            Compile and run your code in the most popular programming languages
            and frameworks with zero setup.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {languages.map((lang, index) => (
            <div
              key={index}
              className={`language-card group relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${lang.color} bg-neutral-900/50 backdrop-blur-sm`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-xl bg-neutral-950/50 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  {lang.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {lang.name}
                </h3>
                <p className="text-sm text-neutral-500">{lang.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Language;
