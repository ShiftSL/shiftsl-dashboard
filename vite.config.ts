import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/user": {
                target: "https://spring-app-284647065201.us-central1.run.app",
                changeOrigin: true,
                secure: true,
                rewrite: (path) => path.replace(/^\/user/, "/user"),
            }
        }
    }
});
