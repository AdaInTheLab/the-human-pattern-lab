export interface LabNote {
    id: string;
    title: string;
    subtitle?: string;
    contentHtml: string;
    published: string;
    department_id: string;
    shadow_density: number;
    safer_landing: boolean;
    tags: string[];
    readingTime: number;
}

export async function fetchLabNotes(signal?: AbortSignal): Promise<LabNote[]> {
    const res = await fetch("/api/lab-notes", { signal });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Failed to fetch lab notes (${res.status}): ${text}`);
    }

    return (await res.json()) as LabNote[];
}
