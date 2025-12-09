/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Dara (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: VideoDetailPage.tsx
   Purpose: TODO: fill in purpose.
   =========================================================== */

/**
 * @file VideoDetailPage.tsx
 * @author Dara
 * @assistant Lyric
 * @lab-unit TODO: set lab unit
 * @since TODO: set date
 * @description TODO: describe this file.
 */

// src/pages/VideoDetailPage.tsx
import { useParams, Link } from "react-router-dom";
import { labVideos } from "../data/videos";
import {LayoutShell} from "@/components/layout/LayoutShell";

export function VideoDetailPage() {
    const { slug } = useParams<{ slug: string }>();

    const video = labVideos.find((v) => v.slug === slug);

    if (!video) {
        return (
            <LayoutShell>
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-cyan-400 via-violet-500 to-emerald-400 flex items-center justify-center">
                    <span className="text-3xl">📺</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-semibold">
                    Transmission not found.
                </h1>
                <p className="max-w-md text-slate-300">
                    Orbson checked the archives and couldn&apos;t find this video in the
                    Lab&apos;s current broadcast schedule. It may have moved, been renamed,
                    or hasn&apos;t aired yet.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                    <Link
                        to="/videos"
                        className="px-4 py-2 rounded-full bg-cyan-500 text-slate-950 text-sm font-semibold hover:bg-cyan-400 transition"
                    >
                        Back to Video Archive
                    </Link>
                    <Link
                        to="/"
                        className="px-4 py-2 rounded-full border border-slate-700 text-sm text-slate-200 hover:border-cyan-400 hover:text-cyan-200 transition"
                    >
                        Return to Homepage
                    </Link>
                </div>
                <p className="text-xs text-slate-500 italic">
                    Error Code: VID-404 — Signal Lost
                </p>
            </LayoutShell>
        );
    }

    const watchUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;

    return (
        <LayoutShell>
            {/* HEADER / META */}
            <header className="space-y-4 border-b border-slate-800 pb-6">
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <span className="inline-flex items-center rounded-full border border-cyan-500/40 bg-cyan-500/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-cyan-300">
            {video.category}
          </span>

                    <span>Duration: {video.duration}</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-semibold text-slate-50">
                    {video.title}
                </h1>

                <p className="text-base md:text-lg text-slate-300 max-w-3xl">
                    {video.description}
                </p>

                <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                    <Link
                        to="/videos"
                        className="inline-flex items-center gap-1 hover:text-cyan-300"
                    >
                        ← Back to all videos
                    </Link>

                    <a
                        href={watchUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200"
                    >
                        Open on YouTube ↗
                    </a>
                </div>
            </header>

            {/* PLAYER */}
            <section className="space-y-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 overflow-hidden">
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
                            <div className="flex h-full items-center justify-center text-sm text-slate-400">
                                Video embed pending. The Lab is still wiring this transmission.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* BODY / NOTES */}
            <section className="space-y-4 text-sm md:text-base text-slate-200 max-w-3xl">
                {/*
          🔮 Optional: later you can add a `showNotes` or `chapters` field to LabVideo
          and render structured notes here.
        */}

                <p>
                    This broadcast explores one of the Lab&apos;s favorite patterns in
                    more depth. If you&apos;re coming here from the archive, this is the
                    room where we pin the idea to the wall and walk around it slowly.
                </p>

                <p className="text-slate-300">
                    In the future, this section can include episode notes, timestamps,
                    references, frameworks mentioned in the video, or extra context for
                    humans who like reading alongside watching.
                </p>

                <p className="text-slate-400 text-sm">
                    If you&apos;d like to see full breakdowns, transcripts, or companion
                    Lab Notes for specific videos, feel free to send a suggestion via the{" "}
                    <Link
                        to="/contact"
                        className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2"
                    >
                        contact page
                    </Link>
                    . The Lab prioritizes episodes that spark the most curiosity.
                </p>
            </section>
        </LayoutShell>
    );
}
