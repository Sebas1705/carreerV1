import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://portfolio.amksandbox.cloud/',
  base: '/',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
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
