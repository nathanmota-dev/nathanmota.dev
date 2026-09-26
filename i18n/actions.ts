"use server";
import { cookies } from "next/headers";
import { isLocale, type Locale } from "./config";

export async function setLocale(locale: Locale) {
  if (!isLocale(locale)) throw new Error("Unsupported locale");
  (await cookies()).set("NEXT_LOCALE", locale, {
    path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax", httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
}
