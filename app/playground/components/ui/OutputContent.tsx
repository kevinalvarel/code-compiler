"use client";

interface OutputContentProps {
  output: string;
  error: string | null;
}

const OutputContent = ({ output, error }: OutputContentProps) => {
  if (error) {
    return (
      <pre className="font-mono text-xs text-red-400 whitespace-pre-wrap sm:text-sm">
        {error}
      </pre>
    );
  }

  if (output) {
    return (
      <pre className="font-mono text-xs text-green-400 whitespace-pre-wrap sm:text-sm">
        {output}
      </pre>
    );
  }

  return (
    <div className="flex h-full items-center justify-center text-xs text-neutral-500 sm:text-sm">
      <span className="text-center">
        Tekan &quot;Run&quot; untuk menjalankan kode
      </span>
    </div>
  );
};

export default OutputContent;
