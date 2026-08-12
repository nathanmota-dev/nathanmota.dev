import type { z } from "zod";
import type { contactSchema } from "@/schema/contact-schema";

export type ContactFormValues = z.infer<typeof contactSchema>;
export type ContactSubmitStatus = "idle" | "sending" | "success";
