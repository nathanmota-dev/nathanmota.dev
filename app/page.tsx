import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaSpotify } from "react-icons/fa";
import { FiBookOpen, FiMessageCircle, FiBox } from "react-icons/fi";
import { SlScreenDesktop } from "react-icons/sl";
import { SiX } from "react-icons/si";
import { Badge } from "@/components/badge/badge";
import CardBio from "@/components/cards/card-bio/card-bio";
import { getResumeData } from "@/data/resume-data";
import MyGithubCalendar from "@/components/github-calendar/github-calendar";
import { DownloadResumeButton } from "@/components/download-resume-button/download-resume-button";

export default function Home() {
    const t = useTranslations("home");
    const resume = getResumeData(useTranslations("resume"));
  const techStack = resume.techStack;
  const findSocialUrl = (name: string) =>
    resume.contact.social.find((item) => item.name === name)?.url ?? "#";

  const xUrl = findSocialUrl("X (Twitter)");
  const linkedInUrl = findSocialUrl("LinkedIn");
  const spotifyUrl = findSocialUrl("Spotify");
  const resumeDownloadName = `${resume.name}.pdf`;

  return (
    <div className="text-foreground py-2 px-4 sm:px-6 selection:bg-primary/20">
      <main className="max-w-3xl mx-auto space-y-4">
        <div className="flex flex-col-reverse md:flex-row justify-between gap-6">
          <div className="md:col-span-8 flex flex-col justify-center space-y-4 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              {resume.position}
            </h1>
            <p className="text-muted-foreground text-base max-w-xl leading-relaxed">
              {resume.initialPhrase}
            </p>
            <div className="flex justify-center items-center gap-2">
              <Link
                href="/cv"
                className="w-full flex justify-center px-6 py-2.5 border border-border/50 rounded-2xl font-medium text-sm transition-all duration-300 hover:bg-black/2 hover:shadow-xl hover:shadow-primary/5 active:scale-[1.02]"
              >
                {t("resume")}
              </Link>
              <DownloadResumeButton fileName={resumeDownloadName} />
            </div>
          </div>
          <div className="md:col-span-4 relative group">
            <div className="md:col-span-4 flex justify-center">
              <div className="rounded-3xl overflow-hidden border border-border/50">
                <Image
                  src={resume.avatarUrl}
                  width={180}
                  height={180}
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-110"
                  alt={t("profile")}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Tech Stack */}
          <div
            role="button"
            tabIndex={0}
            className="group bento-card md:col-span-9 p-6 space-y-4 border border-border/50 rounded-3xl cursor-pointer transition-all duration-300 hover:bg-black/2 hover:shadow-xl hover:shadow-primary/5 active:scale-[1.02]"
          >
            <div className={`flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1`}>
              <FiBox className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-bold uppercase tracking-wider">{t("stack")}</h3>
            </div>
            <div className={`flex flex-wrap gap-2 transition-transform duration-300 group-hover:translate-x-1`}>
              {techStack.map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="px-2.5 py-1 rounded-lg text-[11px] border-border/50"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          {/* My Setup */}
          <CardBio
            variant="social"
            href="/setup"
            icon={SlScreenDesktop}
            text={t("setup")}
            className="md:col-span-3"
          />

          {/* X */}
          <CardBio
            variant="social"
            href={xUrl}
            external
            icon={SiX}
            iconClassName="w-5 h-5"
            text="X (Twitter)"
            className="md:col-span-3"
          />

          {/* Get in touch */}
          <a
            href={`mailto:${resume.contact.email}`}
            className="group bento-card md:col-span-6 p-6 flex items-center justify-center gap-4 border border-border/50 rounded-3xl transition-all duration-300 hover:bg-black/2 hover:shadow-xl hover:shadow-primary/5 active:scale-[1.02] md:justify-start"
          >
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="hover:text-primary transition-transform duration-700 group-hover:rotate-360">
                <FiMessageCircle className="w-6 h-6" />
              </div>
              <div className="transition-transform duration-300 group-hover:translate-x-1">
                <h3 className="font-bold font-display">{t("contact")}</h3>
                <p className="text-xs text-muted-foreground">{resume.contact.email}</p>
              </div>
            </div>
          </a>

          {/* LinkedIn */}
          <CardBio
            variant="social"
            href={linkedInUrl}
            external
            icon={FaLinkedin}
            iconHoverClassName="group-hover:text-[#0A66C2]"
            text="LinkedIn"
            className="md:col-span-3"
          />

          {/* Latest Articles */}
          <CardBio
            variant="content"
            href="/articles"
            icon={FiBookOpen}
            title={t("articles")}
            text={t("articlesDescription")}
            className="md:col-span-6"
          />

          {/* Spotify */}
          <CardBio
            variant="content"
            href={spotifyUrl}
            external
            icon={FaSpotify}
            iconHoverClassName="group-hover:text-[#1DB954]"
            title={t("playlist")}
            text={t("playlistDescription")}
            className="md:col-span-6"
          />
          <MyGithubCalendar />
        </div>
      </main>
    </div>
  );
}
