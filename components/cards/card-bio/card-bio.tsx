import Link from "next/link";
import type { CardBioProps } from "@/types/card-bio";

function joinClasses(...classes: Array<string | undefined>) {
    return classes.filter(Boolean).join(" ");
}

const textShiftClassName = "transition-transform duration-300 group-hover:translate-x-1";

function CardBioContent(props: CardBioProps) {
    const Icon = props.icon;

    if (props.variant === "social") {
        return (
            <>
                <Icon
                    className={joinClasses(
                        "w-6 h-6 transition-transform duration-500 group-hover:scale-110",
                        props.iconHoverClassName,
                        props.iconClassName,
                    )}
                />
                <span className={joinClasses("text-xs font-semibold", textShiftClassName)}>
                    {props.text}
                </span>
            </>
        );
    }

    return (
        <>
            <div className={joinClasses("flex items-center gap-2", textShiftClassName)}>
                <Icon
                    className={joinClasses(
                        "w-4 h-4 text-muted-foreground transition-colors",
                        props.iconHoverClassName,
                        props.iconClassName,
                    )}
                />
                <h3 className="text-sm font-bold uppercase tracking-wider">{props.title}</h3>
            </div>
            <p
                className={joinClasses(
                    "text-sm text-muted-foreground leading-relaxed",
                    textShiftClassName,
                    props.descriptionClassName,
                )}
            >
                {props.text}
            </p>
        </>
    );
}

export default function CardBio(props: CardBioProps) {
    const isInternal = props.href.startsWith("/");
    const shouldOpenInNewTab = Boolean(props.external) && !isInternal;

    const className = joinClasses(
        "group bento-card border border-border/50 rounded-3xl transition-all duration-300 hover:bg-black/2 hover:shadow-xl hover:shadow-primary/5 active:scale-[1.02]",
        props.variant === "social"
            ? "p-6 flex flex-col items-center justify-center gap-3"
            : "p-6 space-y-3",
        props.containerHoverClassName,
        props.className,
    );

    if (isInternal) {
        return (
            <Link href={props.href} className={className}>
                <CardBioContent {...props} />
            </Link>
        );
    }

    return (
        <a
            href={props.href}
            target={shouldOpenInNewTab ? "_blank" : undefined}
            rel={shouldOpenInNewTab ? "noreferrer" : undefined}
            className={className}
        >
            <CardBioContent {...props} />
        </a>
    );
}
