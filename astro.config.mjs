import { defineConfig } from "astro/config";
import AstroPWA from "@vite-pwa/astro";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";

import robotsTxt from "astro-robots-txt";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://jadwal.rmecha.my.id",

  integrations: [
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
        description:
          "Sebuah web yang berisikan jadwal pelajaran dari seluruh kelas",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
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
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    sitemap(),
    robotsTxt(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});