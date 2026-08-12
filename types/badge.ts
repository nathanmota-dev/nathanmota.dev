import type React from "react";

export type BadgeVariant = "default" | "secondary";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    className?: string;
    variant?: BadgeVariant;
}
