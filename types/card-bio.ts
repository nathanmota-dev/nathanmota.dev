import type React from "react";

type BioIcon = React.ComponentType<{ className?: string }>;

interface CardBioBaseProps {
    className?: string;
    href: string;
    external?: boolean;
    icon: BioIcon;
    iconClassName?: string;
    iconHoverClassName?: string;
    containerHoverClassName?: string;
}

interface CardBioSocialProps extends CardBioBaseProps {
    variant: "social";
    text: string;
}

interface CardBioContentProps extends CardBioBaseProps {
    variant: "content";
    title: string;
    text: string;
    descriptionClassName?: string;
}

export type CardBioProps = CardBioSocialProps | CardBioContentProps;
