"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";


type DownloadResumeButtonProps = {
  fileName: string;
};

export function DownloadResumeButton({ fileName }: DownloadResumeButtonProps) {
    const t = useTranslations("common");
  const [error, setError] = useState(false);
  const handleDownload = async () => {
    setError(false);
    try {
    const response = await fetch("/cv/curriculum.pdf");
    if (!response.ok) {
      throw new Error(t("downloadError"));
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
    } catch {
      setError(true);
    }
  };

  return (
    <div className="w-full">
    <button
      type="button"
      onClick={handleDownload}
      className="w-full flex justify-center px-1 md:px-6 py-2.5 border border-border/50 rounded-2xl font-medium text-sm whitespace-nowrap md:whitespace-normal cursor-pointer transition-all duration-300 hover:bg-black/2 hover:shadow-xl hover:shadow-primary/5 active:scale-[1.02]"
    >
      {t("download")}
    </button>
    {error && <p role="alert" className="mt-2 text-xs text-red-600">{t("downloadError")}</p>}
    </div>
  );
}
