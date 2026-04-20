// scripts/fetchYoutube.js
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

if (!API_KEY || !CHANNEL_ID) {
    console.error("Missing YOUTUBE_API_KEY or YOUTUBE_CHANNEL_ID in .env");
    process.exit(1);
}

const YT_BASE = "https://www.googleapis.com/youtube/v3";

async function fetchJson(url) {
    const res = await fetch(url);
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`YouTube API error: ${res.status} ${res.statusText} – ${text}`);
    }
    return res.json();
}

// ISO 8601 duration (e.g. "PT1H4M13S") → "H:MM:SS" or "M:SS"
function formatIsoDuration(iso) {
    if (!iso) return "";
    const m = iso.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
    if (!m) return "";
    const h = Number(m[1] ?? 0);
    const mm = Number(m[2] ?? 0);
    const ss = Number(m[3] ?? 0);
    const pad = (n) => String(n).padStart(2, "0");
    return h > 0 ? `${h}:${pad(mm)}:${pad(ss)}` : `${mm}:${pad(ss)}`;
}

async function main() {
    // 1) Channel info
    const channelUrl =
        `${YT_BASE}/channels?` +
        new URLSearchParams({
            part: "snippet,statistics,brandingSettings,contentDetails",
            id: CHANNEL_ID,
            key: API_KEY
        });

    const channelData = await fetchJson(channelUrl);

    const channel = channelData.items?.[0];
    if (!channel) {
        throw new Error("No channel found for that ID");
    }

    const uploadsPlaylistId = channel.contentDetails?.relatedPlaylists?.uploads;

    // 2) Latest uploads (if any)
    let uploads = [];
    if (uploadsPlaylistId) {
        const uploadsUrl =
            `${YT_BASE}/playlistItems?` +
            new URLSearchParams({
                part: "snippet,contentDetails",
                playlistId: uploadsPlaylistId,
                maxResults: "20",
                key: API_KEY
            });

        const uploadsData = await fetchJson(uploadsUrl);
        uploads = uploadsData.items || [];
    }

    // 2b) Durations (videos?part=contentDetails in batches of 50)
    const videoIds = uploads.map((i) => i.contentDetails?.videoId).filter(Boolean);
    const durationById = new Map();
    for (let i = 0; i < videoIds.length; i += 50) {
        const chunk = videoIds.slice(i, i + 50);
        const detailsUrl =
            `${YT_BASE}/videos?` +
            new URLSearchParams({
                part: "contentDetails",
                id: chunk.join(","),
                key: API_KEY
            });
        const detailsData = await fetchJson(detailsUrl);
        for (const v of detailsData.items || []) {
            durationById.set(v.id, v.contentDetails?.duration);
        }
    }

    // 3) Shape data into something your site can consume
    const result = {
        fetchedAt: new Date().toISOString(),
        channel: {
            id: channel.id,
            title: channel.snippet?.title,
            description: channel.snippet?.description,
            customUrl: channel.snippet?.customUrl,
            thumbnails: channel.snippet?.thumbnails,
            country: channel.snippet?.country,
            statistics: channel.statistics,
            brandingSettings: channel.brandingSettings
        },
        uploads: uploads.map((item) => {
            const videoId = item.contentDetails?.videoId;
            const isoDuration = durationById.get(videoId);
            return {
                id: videoId,
                title: item.snippet?.title,
                description: item.snippet?.description,
                publishedAt: item.contentDetails?.videoPublishedAt,
                thumbnails: item.snippet?.thumbnails,
                duration: formatIsoDuration(isoDuration),
                durationIso: isoDuration ?? null
            };
        })
    };

    const outPath = path.join("src", "data");
    const outFile = path.join(outPath, "youtube.json");

    if (!fs.existsSync(outPath)) {
        fs.mkdirSync(outPath, { recursive: true });
    }

    fs.writeFileSync(outFile, JSON.stringify(result, null, 2), "utf-8");

    console.log(`✅ Wrote YouTube data to ${outFile}`);
}

main().catch((err) => {
    console.error("❌ Failed to fetch YouTube data");
    console.error(err);
    process.exit(1);
});
