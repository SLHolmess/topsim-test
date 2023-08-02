import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
import node from "@astrojs/node";
import autoprefixer from 'autoprefixer';

// https://astro.build/config
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  integrations: [ compress(), tailwind(), react(),],
  output: "server",
  adapter: node({
    mode: 'standalone'
  }),
  vite: {
    postcss: {
      plugins: [autoprefixer({}) // add options if needed
      ]
    },

    ssr: {
      noExternal: ["path-to-regexp"]
    }
  }
});