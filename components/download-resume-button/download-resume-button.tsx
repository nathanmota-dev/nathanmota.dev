"use client";

type DownloadResumeButtonProps = {
  fileName: string;
};

export function DownloadResumeButton({ fileName }: DownloadResumeButtonProps) {
  const handleDownload = async () => {
    const response = await fetch("/cv/curriculum.pdf");
    if (!response.ok) {
      throw new Error("Unable to download resume");
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="w-full flex justify-center px-6 py-2.5 border border-border/50 rounded-3xl font-medium text-sm transition-all duration-300 hover:bg-black/2 hover:shadow-xl hover:shadow-primary/5 active:scale-[1.02]"
    >
      Download Resume
    </button>
  );
}
