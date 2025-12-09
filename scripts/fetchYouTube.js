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
        uploads: uploads.map((item) => ({
            id: item.contentDetails?.videoId,
            title: item.snippet?.title,
            description: item.snippet?.description,
            publishedAt: item.contentDetails?.videoPublishedAt,
            thumbnails: item.snippet?.thumbnails
        }))
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
