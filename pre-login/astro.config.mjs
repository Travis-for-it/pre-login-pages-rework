// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';

import tailwindcss from '@tailwindcss/vite';
import { defaultLocale } from './src/utils/defaultLocale';
import { availableLocales } from './src/utils/availableLocales';

// https://astro.build/config
export default defineConfig({
  i18n: { 
      defaultLocale: defaultLocale, 
      locales: Object.keys(availableLocales),
      routing: {
        prefixDefaultLocale: false,
      }
  },
  integrations: [vue()],

  vite: {
    plugins: [tailwindcss()]
  }
});