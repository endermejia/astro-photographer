import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://nhoanoir.com',
	integrations: [
		react(),
		sitemap({
			i18n: {
				defaultLocale: 'es',
				locales: {
					en: 'en',
					es: 'es'
				}
			},
			filter: (url) => {
				return !url.startsWith('https://nhoanoir.com/es/');
			}
		})
	]
});
