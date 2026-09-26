import { z } from "zod";

export const CONTACT_FIELD_LIMITS = {
    name: {
        min: 2,
        max: 80,
    },
    email: {
        max: 254,
    },
    description: {
        min: 10,
        max: 1000,
    },
} as const;

export function createContactSchema(t: (key: string, values?: Record<string, number>) => string) {
    return z.object({
        name: z.string().min(CONTACT_FIELD_LIMITS.name.min, t("nameMin"))
            .max(CONTACT_FIELD_LIMITS.name.max, t("nameMax", {max: CONTACT_FIELD_LIMITS.name.max})),
        email: z.email(t("email")).max(CONTACT_FIELD_LIMITS.email.max,
            t("emailMax", {max: CONTACT_FIELD_LIMITS.email.max})),
        description: z.string().min(CONTACT_FIELD_LIMITS.description.min,
            t("descriptionMin", {min: CONTACT_FIELD_LIMITS.description.min}))
            .max(CONTACT_FIELD_LIMITS.description.max,
            t("descriptionMax", {max: CONTACT_FIELD_LIMITS.description.max})),
    });
}
