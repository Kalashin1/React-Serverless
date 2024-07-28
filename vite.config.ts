/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defineConfig } from "vite";
import { config } from "dotenv";
import react from "@vitejs/plugin-react";

config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // @ts-ignore
    "process.env": process.env,
  },
});
