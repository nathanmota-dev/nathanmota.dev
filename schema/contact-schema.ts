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

export const contactSchema = z.object({
    name: z
        .string()
        .min(CONTACT_FIELD_LIMITS.name.min, "Enter your full name.")
        .max(
            CONTACT_FIELD_LIMITS.name.max,
            `Enter your name with at most ${CONTACT_FIELD_LIMITS.name.max} characters.`,
        ),
    email: z
        .email("Enter a valid email address.")
        .max(
            CONTACT_FIELD_LIMITS.email.max,
            `Enter an email address with at most ${CONTACT_FIELD_LIMITS.email.max} characters.`,
        ),
    description: z
        .string()
        .min(
            CONTACT_FIELD_LIMITS.description.min,
            `Write a message with at least ${CONTACT_FIELD_LIMITS.description.min} characters.`,
        )
        .max(
            CONTACT_FIELD_LIMITS.description.max,
            `Write a message with at most ${CONTACT_FIELD_LIMITS.description.max} characters.`,
        ),
});
