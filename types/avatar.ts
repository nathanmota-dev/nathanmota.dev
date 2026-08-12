import type React from "react";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
}

export type AvatarStatus = "idle" | "loading" | "loaded" | "error";

export interface AvatarContextValue {
    hasSrc: boolean;
    status: AvatarStatus;
    setHasSrc: (hasSrc: boolean) => void;
    setStatus: (status: AvatarStatus) => void;
}
