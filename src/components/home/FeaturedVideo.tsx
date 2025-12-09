/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Dara (Founder, The Human Pattern Lab)
   Assistant: Lyric (AI Lab Companion)
   File: FeaturedVideo.tsx
   Purpose: TODO: fill in purpose.
   =========================================================== */

/**
 * @file FeaturedVideo.tsx
 * @author Dara
 * @assistant Lyric
 * @lab-unit TODO: set lab unit
 * @since TODO: set date
 * @description TODO: describe this file.
 */

import { Link } from "react-router-dom";
import { labVideos } from "../../data/videos";

export function FeaturedVideo() {
    const featured =
        labVideos.find((v) => v.isFeatured) ?? labVideos[0] ?? null;

    if (!featured) {
        // Fallback if no videos exist yet
        return (
            <section aria-labelledby="featured-video-heading">
                <div className="flex items-baseline justify-between gap-4 mb-4">
                    <div>
                        <h2
                            id="featured-video-heading"
                            className="text-xl md:text-2xl font-semibold"
                        >
                            Featured Video
                        </h2>
                        <p className="text-sm text-slate-400 mt-1">
                            Our latest transmission from the Lab.
                        </p>
                    </div>
                </div>

                <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-6 text-sm text-slate-400">
                    No videos yet. Orbson is calibrating the cameras…
                </div>
            </section>
        );
    }

    const watchUrl = `https://www.youtube.com/watch?v=${featured.youtubeId}`;

    return (
        <section aria-labelledby="featured-video-heading">
            <div className="flex items-baseline justify-between gap-4 mb-4">
                <div>
                    <h2
                        id="featured-video-heading"
                        className="text-xl md:text-2xl font-semibold"
                    >
                        Featured Video
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">
                        A hand-picked transmission from the Lab’s archive.
                    </p>
                </div>

                <Link
                    to="/videos"
                    className="hidden md:inline-flex items-center text-xs font-medium text-cyan-300 hover:text-cyan-200"
                >
                    View all videos →
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-[3fr,2fr] items-start">
                {/* VIDEO EMBED */}
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 overflow-hidden">
                    <div className="aspect-video bg-slate-900">
                        {featured.youtubeId ? (
                            <iframe
                                className="h-full w-full"
                                src={`https://www.youtube.com/embed/${featured.youtubeId}`}
                                title={featured.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center text-sm text-slate-400">
                                Video coming soon. Please stand by.
                            </div>
                        )}
                    </div>
                </div>

                {/* VIDEO DETAILS */}
                <article className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <span className="inline-flex items-center rounded-full border border-cyan-500/40 bg-cyan-500/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-cyan-300">
            {featured.category}
          </span>

                    <h3 className="text-lg md:text-xl font-semibold text-slate-50">
                        {featured.title}
                    </h3>

                    <p className="text-sm text-slate-300">{featured.description}</p>

                    <p className="text-xs text-slate-500">
                        Duration:{" "}
                        <span className="font-medium text-slate-300">
              {featured.duration}
            </span>
                    </p>

                    <div className="flex flex-wrap gap-3 pt-1">
                        <a
                            href={watchUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500 text-slate-950 text-xs font-semibold hover:bg-cyan-400 transition"
                        >
                            Watch on YouTube
                        </a>

                        <Link
                            to={`/videos/${featured.slug}`}
                            className="inline-flex items-center px-3 py-2 rounded-full border border-slate-700 text-xs text-slate-200 hover:border-cyan-400 hover:text-cyan-200 transition"
                        >
                            Episode details
                        </Link>
                    </div>
                </article>
            </div>

            {/* MOBILE VIEW-ALL */}
            <div className="mt-3 md:hidden">
                <Link
                    to="/videos"
                    className="inline-flex items-center text-xs font-medium text-cyan-300 hover:text-cyan-200"
                >
                    View all videos →
                </Link>
            </div>
        </section>
    );
}
