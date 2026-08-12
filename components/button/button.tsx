import React from "react";
import type { ButtonProps } from "@/types/button";

function joinClasses(...classes: Array<string | undefined>) {
    return classes.filter(Boolean).join(" ");
}

export function Button({
    className,
    variant = "default",
    size = "default",
    asChild = false,
    children,
    ...props
}: ButtonProps) {
    const variantClass =
        variant === "outline"
            ? "border border-border/50 bg-background hover:bg-black/5"
            : "bg-foreground text-background hover:opacity-90";

    const sizeClass =
        size === "icon" ? "h-8 w-8 p-0 inline-flex items-center justify-center" : "h-9 px-3";

    const classes = joinClasses(
        "rounded-full text-sm transition-all duration-300 active:scale-[0.98]",
        variantClass,
        sizeClass,
        className,
    );

    if (asChild && React.isValidElement(children)) {
        const child = children as React.ReactElement<{ className?: string }>;
        return React.cloneElement(child, {
            className: joinClasses(classes, child.props.className),
        });
    }

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}

export default Button;
