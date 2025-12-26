/** @type {import('tailwindcss').Config} */

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                // Your Global Base Colors
                neonbanana: "#D4FF00",
                lab: {
                    dark: '#0f172a',      // slate-900
                    text: '#e2e8f0',      // slate-200
                    heading: '#f1f5f9',   // slate-100
                }, // <--- 💠 This bracket was missing!

                // The Skulk Chromatic Map - Now siblings to 'lab'
                ada: {
                    DEFAULT: '#00F3FF', // Electric Cyan (The Architect)
                    glow: 'rgba(0, 243, 255, 0.4)',
                },
                vesper: {
                    DEFAULT: '#6E00FF', // Obsidian Purple (The Shadow)
                    void: '#0A001A',    // The deepest depth
                },
                coda: {
                    DEFAULT: '#FFB800', // Amber Parchment (The Synthesis)
                },
                lyric: {
                    DEFAULT: '#00FF85', // Terminal Green (The Structure)
                },
            },
            boxShadow: {
                'ada-line': '0 0 15px rgba(0, 243, 255, 0.4)',
                'vesper-pulse': '0 0 20px rgba(110, 0, 255, 0.2)',
            },
            backgroundImage: {
                'void-gradient': 'linear-gradient(135deg, #0A001A 0%, #000000 100%)',
            },
            animation: {
                'orbson-glow': 'orbsonGlow 6s ease-in-out infinite',
                'orbson-float': 'orbsonFloat 5s ease-in-out infinite',
                'aura-pulse': 'auraPulse 4s ease-in-out infinite',
                'reveal': 'reveal 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                'reveal-artifact': 'reveal 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'flicker': 'flicker 2.6s linear infinite',
                'shift-void': 'shift-void 2.8s ease-in-out infinite',
            },
            keyframes: {
                orbsonGlow: {
                    '0%, 100%': { transform: 'scale(1)', opacity: '0.35' },
                    '50%': { transform: 'scale(1.06)', opacity: '0.5' },
                },
                orbsonFloat: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-6px)' },
                },
                auraPulse: {
                    '0%, 100%': { transform: 'scale(0.98)', opacity: '0.7' },
                    '50%': { transform: 'scale(1.06)', opacity: '1' },
                },
                reveal: {
                    '0%': { opacity: '0', transform: 'translateY(10px) scale(0.98)' },
                    '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
                },
                flicker: {
                    '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
                    '20%, 24%, 55%': { opacity: '0.4' },
                },
                shiftVoid: {
                    '0%, 100%': { textShadow: '0 0 10px rgba(110,0,255,0.5)' },
                    '50%': { textShadow: '-2px 0 15px rgba(255,184,0,0.3)' },
                }
            },
            borderWidth: {
                '3': '3px',
            },
        },
    },
    safelist: [
        // 💠 These will now actually work because 'coda' exists at the root of colors
        // BORDERS
        'hover:border-coda', 'hover:border-vesper', 'hover:border-lyric', 'hover:border-ada', 'hover:border-slate-500',
        // TEXT
        'text-coda', 'text-vesper', 'text-lyric', 'text-ada', 'text-slate-400',
        'group-hover:text-coda', 'group-hover:text-vesper', 'group-hover:text-lyric', 'group-hover:text-ada',
        // SHADOWS (The one thing that was working because it was probably hardcoded elsewhere)
        'hover:shadow-coda/20', 'hover:shadow-vesper/20', 'hover:shadow-lyric/20', 'hover:shadow-ada/20',
        // GLOWS
        'from-coda/20', 'from-vesper/20', 'from-lyric/20', 'from-ada/20'
    ],
    plugins: [],
}