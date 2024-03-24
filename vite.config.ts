import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/offline-sqlfmt/",
  resolve: {
    alias: [
      {
        find: "#sqlformat_wasm",
        replacement: `${__dirname}/sqlformat_wasm/pkg/sqlformat_wasm.js`,
      },
    ],
  },
});
