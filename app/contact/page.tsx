"use client";
import { useTranslations } from "next-intl";


import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/button/button";
import { RESUME_DATA } from "@/data/resume-data";
import Image from "next/image";
import {
    CONTACT_FIELD_LIMITS,
    createContactSchema,
} from "@/schema/contact-schema";
import type { ContactFormValues, ContactSubmitStatus } from "@/types/contact";

const isHoneypotFilled = (form: HTMLFormElement) => {
    const honeyValue = new FormData(form).get("_honey");

    return typeof honeyValue === "string" && honeyValue.trim().length > 0;
};

export default function Contact() {
    const t = useTranslations("contact");
    const formElementRef = useRef<HTMLFormElement>(null);
    const hasSubmittedRef = useRef(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<ContactSubmitStatus>("idle");

    useEffect(() => {
        const root = document.documentElement;

        const syncTheme = () => {
            setIsDarkMode(root.classList.contains("dark"));
        };

        syncTheme();

        const observer = new MutationObserver(syncTheme);
        observer.observe(root, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(createContactSchema((key, values) => t(`validation.${key}`, values))),
        defaultValues: {
            name: "",
            email: "",
            description: "",
        },
    });
    const description = useWatch({
        control,
        name: "description",
        defaultValue: "",
    });
    const descriptionLength = description.length;
    const isDescriptionAtLimit = descriptionLength >= CONTACT_FIELD_LIMITS.description.max;

    const submitWithFormSubmit = () => {
        setSubmitStatus("sending");
        hasSubmittedRef.current = true;
        formElementRef.current?.submit();
    };

    return (
        <div className="max-w-3xl mx-auto py-2 px-4 sm:px-0">
            <div className="py-4 flex justify-center text-center">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] pb-6">
                    {t("title")}
                </h2>
            </div>

            <main className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <section className="group bento-card md:col-span-8 p-6 border border-border/50 rounded-3xl transition-all duration-300 hover:bg-black/2 hover:shadow-xl hover:shadow-primary/5 active:scale-[1.01] space-y-5">
                    <div className="space-y-2">
                        <h3 className="text-lg font-bold">{t("talk")}</h3>
                        <p className="text-sm text-muted-foreground">
                            {t("intro")}
                        </p>
                    </div>

                    <form
                        ref={formElementRef}
                        className="space-y-4"
                        action={`https://formsubmit.co/${RESUME_DATA.contact.email}`}
                        method="POST"
                        target="contact-form-submit-target"
                        onSubmit={(event) => {
                            event.preventDefault();

                            if (isHoneypotFilled(event.currentTarget)) {
                                return;
                            }

                            void handleSubmit(submitWithFormSubmit)();
                        }}
                    >
                        <input type="hidden" name="_subject" value={t("subject")} />
                        <input type="hidden" name="_captcha" value="false" />
                        <input
                            type="text"
                            name="_honey"
                            style={{ display: "none" }}
                            tabIndex={-1}
                            autoComplete="off"
                        />

                        <div className="space-y-1.5">
                            <label htmlFor="name" className="text-sm font-medium">
                                {t("name")}
                            </label>
                            <input
                                id="name"
                                type="text"
                                required
                                minLength={CONTACT_FIELD_LIMITS.name.min}
                                maxLength={CONTACT_FIELD_LIMITS.name.max}
                                placeholder={t("namePlaceholder")}
                                className="w-full rounded-2xl border border-border/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground placeholder:opacity-100 outline-none transition-all focus:border-purple-700 dark:placeholder:text-foreground/70"
                                {...register("name")}
                            />
                            {errors.name?.message ? (
                                <p className="text-xs text-red-600">{errors.name.message}</p>
                            ) : null}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="email" className="text-sm font-medium">
                                {t("email")}
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                maxLength={CONTACT_FIELD_LIMITS.email.max}
                                placeholder={t("emailPlaceholder")}
                                className="w-full rounded-2xl border border-border/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground placeholder:opacity-100 outline-none transition-all focus:border-purple-700 dark:placeholder:text-foreground/70"
                                {...register("email")}
                            />
                            {errors.email?.message ? (
                                <p className="text-xs text-red-600">{errors.email.message}</p>
                            ) : null}
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between gap-3">
                                <label htmlFor="description" className="text-sm font-medium">
                                    {t("description")}
                                </label>
                                <span
                                    className={`text-xs tabular-nums ${
                                        isDescriptionAtLimit
                                            ? "text-red-600"
                                            : "text-muted-foreground"
                                    }`}
                                    aria-live="polite"
                                >
                                    {descriptionLength}/{CONTACT_FIELD_LIMITS.description.max}
                                </span>
                            </div>
                            <textarea
                                id="description"
                                rows={6}
                                required
                                minLength={CONTACT_FIELD_LIMITS.description.min}
                                maxLength={CONTACT_FIELD_LIMITS.description.max}
                                placeholder={t("messagePlaceholder")}
                                className="w-full resize-none rounded-2xl border border-border/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground placeholder:opacity-100 outline-none transition-all focus:border-purple-700 dark:placeholder:text-foreground/70"
                                {...register("description")}
                            />
                            {errors.description?.message ? (
                                <p className="text-xs text-red-600">{errors.description.message}</p>
                            ) : null}
                        </div>

                        <Button type="submit" variant="outline" className="w-full rounded-2xl h-11">
                            {submitStatus === "sending" ? t("sending") : t("send")}
                        </Button>

                        {submitStatus === "success" ? (
                            <p className="text-sm text-green-700">
                                {t("success")}
                            </p>
                        ) : null}
                    </form>

                    <iframe
                        title={t("frame")}
                        name="contact-form-submit-target"
                        className="hidden"
                        onLoad={() => {
                            if (hasSubmittedRef.current) {
                                setSubmitStatus("success");
                                reset();
                                hasSubmittedRef.current = false;
                            }
                        }}
                    />
                </section>

                <aside className="group bento-card hidden md:flex md:col-span-4 min-h-105 p-6 border border-border/50 rounded-3xl transition-all duration-300 hover:bg-black/2 hover:shadow-xl hover:shadow-primary/5 active:scale-[1.01] items-center justify-center text-center">
                    <Image
                        src={isDarkMode ? "/contact/cellphone-white.png" : "/contact/cellphone.png"}
                        alt={t("phone")}
                        width={500}
                        height={500}
                        className="animate-float-slow w-48 md:w-96 h-auto"
                    />
                </aside>
            </main>
        </div>
    );
}
