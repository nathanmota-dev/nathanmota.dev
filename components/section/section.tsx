import React from "react";
import type { SectionProps } from "@/types/section";

function joinClasses(...classes: Array<string | undefined>) {
    return classes.filter(Boolean).join(" ");
}

export function Section({ className, ...props }: SectionProps) {
    return (
        <section
            className={joinClasses("flex min-h-0 flex-col gap-y-3", className)}
            {...props}
        />
    );
}
