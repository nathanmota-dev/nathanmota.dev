import React from "react";
import type { BadgeProps } from "@/types/badge";

function joinClasses(...classes: Array<string | undefined>) {
    return classes.filter(Boolean).join(" ");
}

export function Badge({
    className,
    variant = "default",
    ...props
}: BadgeProps) {
    const variantClass =
        variant === "secondary"
            ? "bg-muted text-foreground"
            : "bg-foreground text-background";

    return (
        <span
            className={joinClasses(
                "inline-flex items-center rounded-md border border-border/50 px-2 py-0.5 text-xs font-medium",
                variantClass,
                className,
            )}
            {...props}
        />
    );
}

export default Badge;
