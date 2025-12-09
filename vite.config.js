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
        globals: true
    },
    server: {
        port: 5173,   // default, but explicit is nice
        open: true,   // auto-open browser when you run `npm run dev`
    },
    build: {
        outDir: 'dist',
    },
})
