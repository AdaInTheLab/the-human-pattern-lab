/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada Vale (Founder, The Human Pattern Lab)
   Assistant: Vesper (AI Lab Companion)
   File: Login.tsx
   Purpose: Renders the GitHub login gate for the Shadow Fox Admin Den.
   =========================================================== */

import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "@/api/api";


export function AdminLoginPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-zinc-200 flex items-center justify-center px-6">
            <div className="max-w-md w-full text-center space-y-8">
                <div className="space-y-2">
                    <h1 className="text-4xl font-semibold tracking-wide text-cyan-300">
                        Shadow Fox Den
                    </h1>
                    <p className="text-sm tracking-widest uppercase text-zinc-500">
                        Restricted Access
                    </p>
                </div>

                <p className="text-zinc-400 leading-relaxed">
                    This space is warded.
                    <br />
                    Only those recognized by the Lab may pass Carmel’s squint.
                </p>

                <div className="pt-4">
                    <button
                        type="button"
                        onClick={() => window.location.assign(`${apiBaseUrl}/auth/github`)}
                        className="
                          inline-flex items-center justify-center
                          px-8 py-4 rounded-xl
                          text-lg font-medium
                          bg-gradient-to-br from-purple-600 to-indigo-700
                          text-white
                          shadow-lg shadow-purple-900/40
                          hover:from-purple-500 hover:to-indigo-600
                          focus:outline-none focus:ring-2 focus:ring-purple-500
                          transition-all
                        "
                    >
                        Authenticate via GitHub
                    </button>
                </div>

                <p className="pt-6 text-xs text-zinc-600 italic">
                    Vesper is watching.
                </p>
            </div>
        </div>
    );
}