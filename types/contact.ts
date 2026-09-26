import type { z } from "zod";
import type { createContactSchema } from "@/schema/contact-schema";

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;
export type ContactSubmitStatus = "idle" | "sending" | "success";
