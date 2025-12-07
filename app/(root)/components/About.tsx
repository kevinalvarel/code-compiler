import FadeContent from "@/components/react-bits/FadeContent";
import DecryptedText from "@/components/react-bits/DecryptedText";
import VariableProximity from "@/components/react-bits/VariableProximity";

const About = () => {
  return (
    <section className="overflow-hidden relative z-10 w-full bg-[#0a0a0a] px-4 py-24 text-center md:py-32">
      <FadeContent blur={true} duration={1} easing="easeOut" initialOpacity={0}>
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-3xl font-bold tracking-tight md:text-5xl text-neutral-200 cursor-default">
            <DecryptedText
              text="Kenapa Memilih Kami?"
              animateOn="view"
              speed={50}
              maxIterations={30}
              className="text-3xl md:text-5xl font-bold text-neutral-200"
            />
          </h2>

          <div className="mb-6">
            <VariableProximity
              label="Platform kompilator online yang dirancang untuk kecepatan dan kemudahan. Tulis, jalankan, dan debug kode dalam hitungan detik tanpa perlu menginstal software apapun di perangkat Anda."
              className="text-lg text-neutral-400 md:text-xl leading-relaxed"
              fromScale={1}
              toScale={1.1}
              fromOpacity={0.7}
              toOpacity={1}
              radius={50}
            />
          </div>

          <div>
            <VariableProximity
              label="Mendukung lebih dari beberapa bahasa pemrograman populer dengan fitur syntax highlighting, dan berbagi kode secara instan. Sempurna untuk belajar, prototyping, atau technical interview."
              className="text-lg text-neutral-400 md:text-xl leading-relaxed"
              fromScale={1}
              toScale={1.1}
              fromOpacity={0.7}
              toOpacity={1}
              radius={50}
            />
          </div>
        </div>
      </FadeContent>
    </section>
  );
};

export default About;
