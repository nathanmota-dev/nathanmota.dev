import Badge from "@/components/badge/badge";
import type { ToolBadgeProps } from "@/types/tool-badge";
import type { CSSProperties } from "react";

export default function ToolBadge({ name, icon: Icon, color }: ToolBadgeProps) {
    return (
        <Badge
            variant="secondary"
            className="cursor-pointer gap-1.5 transition-colors duration-200 hover:border-[var(--tool-color)] hover:text-[var(--tool-color)]"
            style={{ "--tool-color": color } as CSSProperties}
        >
            <Icon aria-hidden="true" className="size-3.5" />
            {name}
        </Badge>
    );
}
