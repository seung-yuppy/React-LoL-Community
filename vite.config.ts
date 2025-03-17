import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    // vite.config.ts에 global 객체 정의하기
    define: {
        global: "window",
    },
});
