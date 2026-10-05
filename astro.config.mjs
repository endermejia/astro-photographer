import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://nhoasanchez.com',
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
				return !url.startsWith('https://nhoasanchez.com/es/');
			}
		})
	]
});
