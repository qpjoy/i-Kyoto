import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(async () => {
  return {
    server: {
      host: "0.0.0.0",
      port: 5173
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        // "@src": "/src",
        "@components": path.resolve(__dirname, "./src/components")
      }
    }
  };
});
