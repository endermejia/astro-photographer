import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://nhoa-noir.netlify.app',
	integrations: [
		sitemap({
			i18n: {
				defaultLocale: 'es',
				locales: {
					en: 'en',
					es: 'es'
				}
			},
			filter: (url) => {
				return !url.startsWith('https://nhoa-noir.netlify.app/es/');
			}
		})
	]
});
