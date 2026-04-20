import youtubeData from "./youtube.json";

export type VideoCategory =
    | "AI Discussions"
    | "Human Behavior"
    | "Philosophy"
    | "Short"
    | "Full Episode";

export interface LabVideo {
    id: string;
    title: string;
    slug: string;
    category?: VideoCategory;
    description: string;
    duration: string;
    youtubeId: string;
    publishedAt?: string;
    thumbnailUrl?: string;
    isFeatured?: boolean;
}

type YoutubeUpload = {
    id: string;
    title: string;
    description: string;
    publishedAt: string;
    thumbnails?: {
        default?: { url: string };
        medium?: { url: string };
        high?: { url: string };
        standard?: { url: string };
        maxres?: { url: string };
    };
    duration: string;
};

type YoutubeData = {
    uploads: YoutubeUpload[];
};

const data = youtubeData as YoutubeData;

export const labVideos: LabVideo[] = data.uploads.map((u, i) => ({
    id: u.id,
    title: u.title,
    slug: u.id,
    description: u.description ?? "",
    duration: u.duration ?? "",
    youtubeId: u.id,
    publishedAt: u.publishedAt,
    thumbnailUrl:
        u.thumbnails?.maxres?.url ??
        u.thumbnails?.high?.url ??
        u.thumbnails?.medium?.url ??
        u.thumbnails?.default?.url,
    isFeatured: i === 0,
}));
