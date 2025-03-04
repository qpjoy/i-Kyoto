import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const apiUrl = process.env.VITE_API_URL;
  // const appName = pro
  console.log(`[Mode]: `, mode, apiUrl);
  return {
    base: "/roll",
    "process.env.VITE_API_URL": JSON.stringify(apiUrl),
    plugins: [react(), tsconfigPaths()]
  };
});
