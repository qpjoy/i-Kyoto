import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

import postCssPxToRem from "postcss-pxtorem";
// import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const mdx = await import("@mdx-js/rollup");
  return {
    base: "/pushcode/",
    plugins: [
      react(),
      mdx.default({
        // mdxOptions: {
        //   remarkPlugins: [],
        //   // rehypePlugins: [],
        // },
        // providerImportSource: "@mdx-js/react",
      })
    ],
    optimizeDeps: {
      // include: ["react/jsx-runtime"],
      // exclude: [],
    },
    build: {
      // manifest: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        // "@src": "/src",
        "@components": path.resolve(__dirname, "./src/components")
      }
    },
    css: {
      postcss: {
        plugins: [
          postCssPxToRem({
            rootValue: 75,
            propList: ["font", "font-size", "line-height", "letter-spacing", "word-spacing"],
            unitPrecision: 5,
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0,
            exclude: /node_modules/i
          })
        ]
      }
    }
  };
});
