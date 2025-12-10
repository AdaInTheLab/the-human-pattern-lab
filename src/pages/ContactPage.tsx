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
import { LayoutShell } from "@/components/layout/LayoutShell";

// ✅ Replace this with your real Formspree (or other) endpoint URL
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mjknaadn";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactPage() {
    const [status, setStatus] = useState<FormStatus>("idle");
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
        if (status !== "idle") setStatus("idle");
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // super basic validation
        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            setStatus("error");
            return;
        }

        try {
            setStatus("submitting");

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
                setStatus("error");
                return;
            }

            setStatus("success");
            setForm({
                name: "",
                email: "",
                topic: "",
                message: "",
            });
        } catch {
            setStatus("error");
        }
    }

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
                        <label className="block text-xs font-semibold text-slate-200 mb-1">
                            Name
                        </label>
                        <input
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Human, entity, or raccoon alias"
                            className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-200 mb-1">
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@galaxy.net"
                            className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-200 mb-1">
                            Topic (optional)
                        </label>
                        <select
                            name="topic"
                            value={form.topic}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-50 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                        >
                            <option value="">Choose one…</option>
                            <option value="collaboration">Collaboration</option>
                            <option value="ai-human">AI &amp; human patterns</option>
                            <option value="content">Content / video question</option>
                            <option value="permissions">Content use / permissions</option>
                            <option value="just-saying-hi">Just saying hi</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-200 mb-1">
                            Message
                        </label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            rows={5}
                            placeholder="Tell us what’s on your mind. The weirder the pattern, the better."
                            className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed transition"
                    >
                        {status === "submitting"
                            ? "Transmitting to the Lab..."
                            : "Send message"}
                    </button>

                    {status === "success" && (
                        <p className="text-[11px] text-emerald-300">
                            Message received. Orbson is analyzing, Carmel is judging
                            (affectionately).
                        </p>
                    )}
                    {status === "error" && (
                        <p className="text-[11px] text-rose-300">
                            Name, email, and message are required, or something went wrong
                            while sending. Please check your details and try again, or email
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
                            <li>Ideas for videos, Lab Notes, or experiments.</li>
                            <li>Kind, constructive feedback about the Lab&apos;s work.</li>
                            <li>Pics of creatures who are clearly Lab-adjacent.</li>
                        </ul>
                    </div>
                </div>
            </section>
        </LayoutShell>
    );
}
