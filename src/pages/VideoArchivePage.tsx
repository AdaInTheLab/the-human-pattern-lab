/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Dara (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: VideoArchivePage.tsx
   Purpose: TODO: fill in purpose.
   =========================================================== */

/**
 * @file VideoArchivePage.tsx
 * @author Dara
 * @assistant Lyric
 * @lab-unit TODO: set lab unit
 * @since TODO: set date
 * @description TODO: describe this file.
 */

// src/pages/VideoArchivePage.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { labVideos } from "../data/videos";
import {LayoutShell} from "@/components/layout/LayoutShell";

const ALL = "All";

export function VideoArchivePage() {
    const [activeCategory, setActiveCategory] = useState<string>(ALL);

    const categories = [
        ALL,
        ...Array.from(new Set(labVideos.map((v) => v.category))),
    ];

    const sorted = [...labVideos]; // if you later add publishedAt, sort here

    const filtered =
        activeCategory === ALL
            ? sorted
            : sorted.filter((v) => v.category === activeCategory);

    return (
        <LayoutShell>
            {/* HEADER / INTRO */}
            <section className="space-y-4">
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">
                    Video Archive
                </p>
                <h1 className="text-3xl md:text-4xl font-semibold">
                    Broadcasts from the Lab.
                </h1>
                <p className="text-base md:text-lg text-slate-300 max-w-3xl">
                    Long-form talks, breakdowns, judgment logs, and pattern reports.
                    These are the transmissions where we put visuals to the chaos:
                    humans, AI, creatures, and everything in between.
                </p>
            </section>

            {/* CATEGORY FILTERS */}
            <section className="space-y-3">
                <h2 className="text-sm font-semibold text-slate-200">
                    Filter by series
                </h2>
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => {
                        const isActive = cat === activeCategory;
                        return (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setActiveCategory(cat)}
                                className={[
                                    "inline-flex items-center rounded-full border px-3 py-1 text-xs transition",
                                    isActive
                                        ? "border-cyan-400 bg-cyan-500/20 text-cyan-200"
                                        : "border-slate-700 bg-slate-900/60 text-slate-300 hover:border-cyan-400/70 hover:text-cyan-200",
                                ].join(" ")}
                            >
                                {cat}
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* VIDEO GRID */}
            <section className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                    <h2 className="text-xl font-semibold text-slate-100">
                        {activeCategory === ALL ? "All videos" : activeCategory}
                    </h2>
                    <p className="text-xs text-slate-500">
                        Showing {filtered.length}{" "}
                        {filtered.length === 1 ? "video" : "videos"}
                    </p>
                </div>

                {filtered.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-6 text-sm text-slate-400">
                        No videos in this category yet. Orbson is still editing.
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                        {filtered.map((video) => {
                            const watchUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;

                            return (
                                <article
                                    key={video.id}
                                    className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col gap-3 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/15 transition"
                                >
                                    {/* Thumbnail / embed placeholder */}
                                    <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
                                        <div className="aspect-video bg-slate-900">
                                            {video.youtubeId ? (
                                                <iframe
                                                    className="h-full w-full"
                                                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                                                    title={video.title}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                    allowFullScreen
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-xs text-slate-400">
                                                    Video coming soon. Transmission pending.
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Meta */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between gap-2 text-[11px] text-slate-400">
                      <span className="inline-flex items-center rounded-full border border-cyan-500/40 bg-cyan-500/10 px-2 py-0.5 uppercase tracking-[0.16em] text-cyan-300">
                        {video.category}
                      </span>
                                            <span>Duration: {video.duration}</span>
                                        </div>

                                        <h3 className="text-sm md:text-base font-semibold text-slate-50 group-hover:text-cyan-200">
                                            {video.title}
                                        </h3>

                                        <p className="text-sm text-slate-300">
                                            {video.description}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="pt-2 flex flex-wrap gap-3 text-[11px]">
                                        <a
                                            href={watchUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center px-3 py-1.5 rounded-full bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 transition"
                                        >
                                            Watch on YouTube
                                        </a>

                                        <Link
                                            to={`/videos/${video.slug}`}
                                            className="inline-flex items-center px-3 py-1.5 rounded-full border border-slate-700 text-slate-200 hover:border-cyan-400 hover:text-cyan-200 transition"
                                        >
                                            Episode details
                                        </Link>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>
        </LayoutShell>
    );
}
