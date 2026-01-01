// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { plugin as md, Mode } from "vite-plugin-markdown";

export default defineConfig({
    plugins: [react(),md({
        mode: [Mode.HTML, Mode.MARKDOWN] // html + raw markdown
    })],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            // Now you can do: import Header from '@/components/Header'
        },
    },
    test: {
        environment: "happy-dom",
        setupFiles: "./src/setupTests.ts",
        globals: true,
        coverage: {
            provider: "v8",       // built-in, no extra installs needed
            reporter: ["text", "lcov"],
            reportsDirectory: "./coverage"
        }
    },
    server: {
        port: 5173,   // default, but explicit is nice
        open: true,   // auto-open browser when you run `npm run dev`
        hmr: {
            overlay: false, // 💠 This silences the aggressive purple Vite error screen
        },
    },
    build: {
        outDir: 'dist',
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ["react", "react-dom"],
                    router: ["react-router-dom"],
                    // If you use swagger-ui-react:
                    swagger: ["swagger-ui-react"],
                },
            },
        },
    },
})
