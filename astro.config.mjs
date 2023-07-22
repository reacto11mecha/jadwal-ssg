import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import AstroPWA from "@vite-pwa/astro";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    AstroPWA({
      mode: "development",
      base: "/",
      scope: "/",
      registerType: "autoUpdate",
      manifest: {
        theme_color: "#0074d9",
        name: "Jadwal Pelajaran SMAN 12 Kota Bekasi",
        short_name: "Jadwal Pelajaran",
        description: "Sebuah web yang berisikan jadwal pelajaran dari seluruh kelas",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        navigateFallback: "/404",
        globPatterns: ["**/*.{css,js,html,png}"],
      },
      devOptions: {
        enabled: true,
        navigateFallbackAllowlist: [/^\/404$/],
      },
    }),
  ],
});
