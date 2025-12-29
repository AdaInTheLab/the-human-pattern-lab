// src/components/labnotes/LabNotesGridSkeleton.tsx
import React from "react";
import { LabNoteCardSkeleton } from "@/components/labnotes/LabNoteCardSkeleton";
import {LabNote} from "@/lib/labNotes";
import {LabNoteCard} from "@/components/labnotes/LabNoteCard";

export function LabNotesGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, i) => (
                <LabNoteCardSkeleton key={i} />
            ))}
        </div>
    );
}
export function LabNotesGrid({ notes }: { notes: LabNote[] }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((n) => (
                <LabNoteCard key={n.id} note={n} index={0} />
            ))}
        </div>
    );
}