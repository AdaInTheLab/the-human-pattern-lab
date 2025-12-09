/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Dara (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: LabNotesPage.tsx
   Purpose: TODO: fill in purpose.
   =========================================================== */

/**
 * @file LabNotesPage.tsx
 * @author Dara
 * @assistant Lyric
 * @lab-unit TODO: set lab unit
 * @since TODO: set date
 * @description TODO: describe this file.
 */

// src/pages/LabNotesPage.tsx
import {LayoutShell} from "@/components/layout/LayoutShell";
import { useTranslation } from "react-i18next";
import { getLabNotes } from "@/lib/labNotes";

const categoryColors: Record<string, string> = {
    "AI & Alignment": "bg-cyan-500/10 text-cyan-300 border-cyan-500/40",
    "Human Psychology": "bg-emerald-500/10 text-emerald-300 border-emerald-500/40",
    "Cosmic Philosophy": "bg-violet-500/10 text-violet-300 border-violet-500/40",
    Humor: "bg-amber-500/10 text-amber-300 border-amber-500/40",
    "Behind the Lab": "bg-slate-500/10 text-slate-200 border-slate-500/40",
    "Lore Drop": "bg-pink-500/10 text-pink-300 border-pink-500/40",
};

const ALL = "All";

export function LabNotesPage() {
    const { t, i18n } = useTranslation("labNotesPage");
    const locale = i18n.language || "en";
    const notes = getLabNotes(locale);
    //"{t(\"nav.content-use-policy\")}"

    // Optional debug for one run:

    console.log("bundle?", i18n.hasResourceBundle("en", "labNotesPage"));
    console.log("title test:", t("title"));

    return (

        <LayoutShell>
            <header>
                <h1 className="text-3xl font-bold"> {t("title")}</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    {t("subtitle")}
                </p>
            </header>

            {notes.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t("empty")}</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {notes.map((note) => (
                        <article key={note.id} className="border rounded-2xl p-4">
                            <p className="text-xs uppercase tracking-wide opacity-70">
                                {note.type === "paper" ? "Research Note" : "Lab Memo"}
                            </p>
                            <h2 className="mt-1 font-semibold text-lg">{note.title}</h2>
                            {note.subtitle && (
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    {note.subtitle}
                                </p>
                            )}
                            <p className="text-xs text-muted-foreground mt-1">
                                {note.published} • {note.readingTime ?? 3} min
                            </p>
                            <p className="text-sm mt-3 line-clamp-3">{note.summary}</p>
                            <a
                                href={`/lab-notes/${note.id}`}
                                className="mt-3 inline-block text-xs underline"
                            >
                                {t("readMore", { defaultValue: "Read full note" })}
                            </a>
                        </article>
                    ))}
                </div>
            )}
        </LayoutShell>
    );
}