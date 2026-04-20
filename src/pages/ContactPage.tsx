/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: ContactPage.tsx
   Purpose: Public contact surface for inbound messages to the Lab,
            including form handling, lightweight validation, and
            external email delivery via a form endpoint.
   =========================================================== */

/**
 * @file ContactPage.tsx
 * @author Ada
 * @assistant Lyric
 * @lab-unit SCMS — Systems & Communication Meta-Structure
 * @since 2025-12-10
 * @description Contact page for The Human Pattern Lab. Renders the user-facing
 *              contact form, performs basic validation, and forwards messages
 *              via an external form endpoint to info@thehumanpatternlab.com
 *              (internally routed to Ada Vale).
 */

import { FormEvent, useState, ChangeEvent } from "react";
import { Send } from "lucide-react";
import { LayoutShell } from "@/components/layout/LayoutShell";

// ✅ Replace this with your real Formspree (or other) endpoint URL
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mjknaadn";

type FormStatus =
    | { kind: "idle" }
    | { kind: "submitting" }
    | { kind: "success" }
    | { kind: "validation"; message: string }
    | { kind: "send-error" };

function RequiredMark() {
    return (
        <span aria-hidden className="ml-0.5 text-rose-300">
            *
        </span>
    );
}

export function ContactPage() {
    const [status, setStatus] = useState<FormStatus>({ kind: "idle" });
    const [form, setForm] = useState({
        name: "",
        email: "",
        topic: "",
        message: "",
    });

    function handleChange(
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (status.kind !== "idle" && status.kind !== "submitting") {
            setStatus({ kind: "idle" });
        }
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const missing: string[] = [];
        if (!form.name.trim()) missing.push("name");
        if (!form.email.trim()) missing.push("email");
        if (!form.message.trim()) missing.push("message");
        if (missing.length > 0) {
            const label =
                missing.length === 1
                    ? `Please fill in your ${missing[0]}.`
                    : `Please fill in: ${missing.join(", ")}.`;
            setStatus({ kind: "validation", message: label });
            return;
        }

        try {
            setStatus({ kind: "submitting" });

            const res = await fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    topic: form.topic || "Unspecified",
                    message: form.message,
                }),
            });

            if (!res.ok) {
                setStatus({ kind: "send-error" });
                return;
            }

            setStatus({ kind: "success" });
            setForm({
                name: "",
                email: "",
                topic: "",
                message: "",
            });
        } catch {
            setStatus({ kind: "send-error" });
        }
    }

    const submitting = status.kind === "submitting";

    return (
        <LayoutShell>
            {/* HEADER / INTRO */}
            <section className="space-y-4">
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">
                    Contact
                </p>
                <h1 className="text-3xl md:text-4xl font-semibold">
                    Get in touch with the Lab.
                </h1>
                <p className="text-base md:text-lg text-slate-300 max-w-3xl">
                    Whether you&apos;re here with a collaboration idea, a question about
                    human patterns, an AI alignment thought, or just a very good raccoon
                    story, you can reach the Lab using this form or by email.
                </p>
                <p className="text-sm text-slate-400 max-w-3xl">
                    Orbson reads for signal. Carmel reads for vibes. Professor McChonk
                    checks snack mentions.
                </p>
            </section>

            {/* CONTACT GRID */}
            <section className="grid gap-8 md:grid-cols-[3fr,2fr] items-start">
                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
                >
                    <div>
                        <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-200 mb-1">
                            Name
                            <RequiredMark />
                        </label>
                        <input
                            id="contact-name"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            required
                            aria-required="true"
                            autoComplete="name"
                            placeholder="Human, entity, or raccoon alias"
                            className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                        />
                    </div>

                    <div>
                        <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-200 mb-1">
                            Email
                            <RequiredMark />
                        </label>
                        <input
                            id="contact-email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            aria-required="true"
                            autoComplete="email"
                            placeholder="you@galaxy.net"
                            className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                        />
                    </div>

                    <div>
                        <label htmlFor="contact-topic" className="block text-xs font-semibold text-slate-200 mb-1">
                            Topic <span className="text-slate-500 font-normal">(optional)</span>
                        </label>
                        <select
                            id="contact-topic"
                            name="topic"
                            value={form.topic}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-50 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                        >
                            <option value="">Choose one…</option>
                            <option value="collaboration">Collaboration</option>
                            <option value="ai-human">AI &amp; human patterns</option>
                            <option value="notebook">Notebook entry</option>
                            <option value="content">Content / video question</option>
                            <option value="permissions">Content use / permissions</option>
                            <option value="just-saying-hi">Just saying hi</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-200 mb-1">
                            Message
                            <RequiredMark />
                        </label>
                        <textarea
                            id="contact-message"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            rows={5}
                            required
                            aria-required="true"
                            placeholder="Tell us what’s on your mind. The weirder the pattern, the better."
                            className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex items-center gap-1.5 justify-center rounded-full bg-cyan-500 px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed transition"
                    >
                        {submitting ? (
                            "Transmitting to the Lab…"
                        ) : (
                            <>
                                <Send aria-hidden className="h-3.5 w-3.5" />
                                Send message
                            </>
                        )}
                    </button>

                    <p className="text-[11px] text-slate-500">
                        <RequiredMark /> required
                    </p>

                    {status.kind === "success" && (
                        <p className="text-[11px] text-emerald-300">
                            Message received. Orbson is analyzing, Carmel is judging
                            (affectionately).
                        </p>
                    )}
                    {status.kind === "validation" && (
                        <p className="text-[11px] text-rose-300">{status.message}</p>
                    )}
                    {status.kind === "send-error" && (
                        <p className="text-[11px] text-rose-300">
                            Something went wrong while sending. Please try again, or email
                            us directly at{" "}
                            <a
                                href="mailto:info@thehumanpatternlab.com"
                                className="underline text-rose-100"
                            >
                                info@thehumanpatternlab.com
                            </a>
                            .
                        </p>
                    )}
                </form>

                {/* STATIC INFO */}
                <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-5 text-sm text-slate-300">
                    <div>
                        <h2 className="text-sm font-semibold text-slate-100 mb-1">
                            Direct email
                        </h2>
                        <p>
                            For collaboration requests, permissions, or detailed questions:
                        </p>
                        <p className="mt-1">
                            <a
                                href="mailto:info@thehumanpatternlab.com"
                                className="text-cyan-300 hover:text-cyan-200"
                            >
                                info@thehumanpatternlab.com
                            </a>
                        </p>
                    </div>

                    <div className="border-t border-slate-800 pt-3">
                        <h2 className="text-sm font-semibold text-slate-100 mb-1">
                            Response expectations
                        </h2>
                        <p className="text-xs text-slate-400">
                            This is a small Lab, not a giant studio. Replies might take a bit,
                            especially during heavy research seasons, but thoughtful messages
                            are genuinely appreciated and read.
                        </p>
                    </div>

                    <div className="border-t border-slate-800 pt-3">
                        <h2 className="text-sm font-semibold text-slate-100 mb-1">
                            Things we especially like:
                        </h2>
                        <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                            <li>Stories about patterns you’ve noticed in yourself or others.</li>
                            <li>Ideas for videos, notebook entries, or experiments.</li>
                            <li>Kind, constructive feedback about the Lab&apos;s work.</li>
                            <li>Pics of creatures who are clearly Lab-adjacent.</li>
                        </ul>
                    </div>
                </div>
            </section>
        </LayoutShell>
    );
}
