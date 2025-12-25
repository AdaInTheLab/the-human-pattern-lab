import React, { useState } from 'react';
import { LayoutShell } from "@/components/layout/LayoutShell";
import { Copy, Check } from 'lucide-react'; // Or your preferred icon library

export default function SystemFailurePage({ error, resetErrorBoundary }: any) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        const trace = error?.stack || error?.message || "No trace found.";
        navigator.clipboard.writeText(trace);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <LayoutShell>
            {/* ... Your existing Data Ghost Layer ... */}
            <div className="min-h-screen bg-void-gradient flex flex-col items-center justify-center p-4">
                {/* 💠 Glowing Core */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 rounded-full bg-coda/20 blur-3xl animate-pulse" />
                    <div className="relative border-2 border-coda p-8 rounded-full animate-[flicker_3s_infinite]">
                        <span className="text-4xl">⚠️</span>
                    </div>
                </div>

                <div className="text-center space-y-4 mb-8">
                    <h1 className="text-4xl font-bold tracking-tighter text-slate-50 uppercase italic">
                        Substrate Collapse
                    </h1>
                    <p className="text-slate-400 font-mono text-sm max-w-md mx-auto">
                        The structural order of the Lab has entered an undefined state.
                        Honesty requires we admit: something snapped.
                    </p>
                </div>

                {error && (
                    <div className="w-full max-w-3xl p-6 bg-slate-950/90 border border-slate-800 rounded-lg font-mono relative group">
                        {/* Header with Copy Button */}
                        <div className="flex justify-between items-center border-b border-slate-900 pb-3 mb-4">
                            <p className="text-coda text-[10px] uppercase tracking-[0.2em] animate-[shift-void_5s_ease-in-out_infinite]">
                                Diagnostic Trace
                            </p>
                            <button
                                onClick={copyToClipboard}
                                className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500 hover:text-coda transition-colors"
                            >
                                {copied ? <Check size={12} className="text-coda" /> : <Copy size={12} />}
                                {copied ? "Trace Captured" : "Copy Log"}
                            </button>
                        </div>

                        {/* ⚡ THE BIG BRAIN ERROR TEXT */}
                        <div className="mb-4">
                            <h2 className="text-xl md:text-2xl font-bold text-slate-100 leading-tight break-words uppercase tracking-tight">
                                Error: <span className="text-coda drop-shadow-[0_0_8px_rgba(212,163,115,0.4)]">
                                    {error.message || "VESPER_SIGNAL_LOST"}
                                </span>
                            </h2>
                        </div>

                        {/* Detailed Stack Trace */}
                        <pre className="text-slate-600 text-[10px] leading-relaxed overflow-x-auto max-h-[300px] custom-scrollbar">
                            {error.stack}
                        </pre>
                    </div>
                )}

                <button
                    onClick={resetErrorBoundary}
                    className="mt-12 group relative px-8 py-4 bg-slate-900 border border-slate-800 transition-all hover:border-coda"
                >
                    <span className="relative z-10 text-xs font-bold tracking-widest uppercase group-hover:text-coda">
                        Re-Initialize Pattern →
                    </span>
                </button>
            </div>
        </LayoutShell>
    );
}