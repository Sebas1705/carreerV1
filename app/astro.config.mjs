import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: 'https://sebas1705.github.io',
  base: '/carreerV1',
  output: 'static',
  build: {
    assets: 'assets'
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': '/src',
        '@domain': '/src/domain',
        '@data': '/src/data',
        '@core': '/src/core',
        '@presentation': '/src/presentation'
      }
    }
  }
});
