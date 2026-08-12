import ToolBadge from "@/components/tool-badge/tool-badge";
import { RESUME_DATA } from "@/data/resume-data";
import Image from "next/image";
import { FiBox } from "react-icons/fi";
import { PiStackSimpleBold } from "react-icons/pi";
import { SlScreenDesktop } from "react-icons/sl";

export default function Setup() {
    const { specsItems, personalStackItems, workStackItems, toolsItems } = RESUME_DATA.setup;

    return (
        <div className="max-w-3xl mx-auto py-2 px-4 sm:px-0">
            <div className="py-4 flex justify-center text-center">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] pb-6">
                    My Setup
                </h2>
            </div>

            <main>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

                    {/* Setup */}
                    <div className="group overflow-hidden bento-card md:col-span-8 border border-border/50 rounded-3xl transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 active:scale-[1.01]">
                        <div className="relative h-full min-h-75 w-full">
                            <Image
                                src="/setup/setup.jpg"
                                alt="Setup"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                        </div>
                    </div>

                    {/* Specs */}
                    <div className="group bento-card md:col-span-4 p-6 border border-border/50 rounded-3xl transition-all duration-300 hover:bg-black/2 hover:shadow-xl hover:shadow-primary/5">
                        <div className="flex flex-col h-full space-y-4">
                            <div className="flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
                                <SlScreenDesktop className="w-4 h-4 text-muted-foreground" />
                                <h3 className="text-sm font-bold uppercase tracking-wider">Specs</h3>
                            </div>

                            <div className="flex flex-col gap-3 pt-2">
                                {specsItems.map((item) => (
                                    <div key={item} className="flex flex-col space-y-1">
                                        <span className="text-xs font-mono text-muted-foreground leading-none">
                                            {item}
                                        </span>
                                        <div className="h-px w-full bg-border/40" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Personal environment */}
                    <div className="group bento-card md:col-span-7 p-6 border border-border/50 rounded-3xl transition-all duration-300 hover:bg-black/2 hover:shadow-xl hover:shadow-primary/5">
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                            <PiStackSimpleBold className="w-4 h-4" /> Personal Environment
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {personalStackItems.map((tool) => (
                                <ToolBadge key={tool.name} {...tool} />
                            ))}
                        </div>
                    </div>

                    {/* Work environment */}
                    <div className="group bento-card md:col-span-5 p-6 border border-border/50 rounded-3xl transition-all duration-300 hover:bg-black/2 hover:shadow-xl hover:shadow-primary/5">
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                            <PiStackSimpleBold className="w-4 h-4" /> Work Environment
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {workStackItems.map((tool) => (
                                <ToolBadge key={tool.name} {...tool} />
                            ))}
                        </div>
                    </div>

                    <div className="group bento-card md:col-span-12 p-6 border border-border/50 rounded-3xl transition-all duration-300 hover:bg-black/2 hover:shadow-xl hover:shadow-primary/5">
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                            <FiBox className="w-4 h-4" /> Daily Apps
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {toolsItems.map((tool) => (
                                <ToolBadge key={tool.name} {...tool} />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
