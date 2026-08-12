import type React from "react";

export type ButtonVariant = "default" | "outline";
export type ButtonSize = "default" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    asChild?: boolean;
}
