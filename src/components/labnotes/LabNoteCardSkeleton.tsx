// src/components/labnotes/LabNoteCardSkeleton.tsx
import React from "react";
import { Skeleton, ScanlineWrap } from "@/components/ui/Skeleton";

export function LabNoteCardSkeleton() {
    return (
        <ScanlineWrap className="rounded-2xl">
            <div className="rounded-2xl p-5 bg-white/3 border border-white/10 shadow-[0_0_30px_rgba(120,80,255,0.10)]">
                <div className="flex items-start gap-3">
                    <Skeleton variant="circle" className="shrink-0" />
                    <div className="flex-1 space-y-2">
                        <Skeleton variant="line" className="w-2/3" />
                        <Skeleton variant="line" className="w-1/2 opacity-80" />
                    </div>
                    <Skeleton variant="pill" className="w-16 h-6 opacity-70" />
                </div>

                <div className="mt-4 space-y-2">
                    <Skeleton variant="line" className="w-full" />
                    <Skeleton variant="line" className="w-11/12 opacity-90" />
                    <Skeleton variant="line" className="w-3/4 opacity-80" />
                </div>

                <div className="mt-5 flex gap-2">
                    <Skeleton variant="pill" className="w-16" />
                    <Skeleton variant="pill" className="w-20 opacity-90" />
                    <Skeleton variant="pill" className="w-14 opacity-80" />
                </div>
            </div>
        </ScanlineWrap>
    );
}
