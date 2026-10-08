/* eslint-disable valid-jsdoc */
import { defaultLang, routes, showDefaultLang, ui } from './ui';

/** Returns the language segment from a page URL.
 * @param {URL} url Current page URL.
 * @returns {keyof typeof ui} The active language code.
 */
export function getLangFromUrl(url: URL) {
	const [, lang] = url.pathname.split('/');
	if (lang in ui) {
		return lang as keyof typeof ui;
	}
	return defaultLang;
}

/** Creates a localized base path helper.
 * @returns {(lang: string) => string} A function that builds a language base path.
 */
export function getLangPath() {
	return function path(lang: string) {
		return !showDefaultLang && lang === defaultLang ? '/' : `/${lang}/`;
	};
}

/** Creates a translation lookup helper for a language.
 * @param {keyof typeof ui} lang Active language code.
 * @returns {(key: keyof (typeof ui)[typeof defaultLang]) => string} A translation lookup function.
 */
export function useTranslations(lang: keyof typeof ui) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return ui[lang][key] || ui[defaultLang][key];
	};
}

/** Creates a route helper that maps shared album keys to localized paths.
 * @param {keyof typeof ui} lang Default language code for the helper.
 * @returns {(path: string, l?: string) => string} A localized route function.
 */
export function useTranslatedPath(lang: keyof typeof ui) {
	return function translatePath(path: string, l: string = lang) {
		const pathName = path.replaceAll('/', '');
		const hasTranslation = routes[l] !== undefined && routes[l][pathName] !== undefined;
		let translatedPath = (hasTranslation ? '/' + routes[l][pathName] : path) + '/';

		translatedPath = translatedPath.replace(/(#\w+)\/$/gm, '$1');

		return !showDefaultLang && l === defaultLang ? translatedPath : `/${l}${translatedPath}`;
	};
}

/** Returns the shared route key represented by a localized URL.
 * @param {URL} url Current page URL.
 * @returns {string | undefined} The shared route key, when one exists.
 */
export function getRouteFromUrl(url: URL): string | undefined {
	const pathname = new URL(url).pathname;
	const parts = pathname?.split('/');
	const path = parts.pop() || parts.pop();

	if (path === undefined) {
		return undefined;
	}

	const currentLang = getLangFromUrl(url);

	if (defaultLang === currentLang) {
		const route = Object.values(routes)[0];
		return route[path] !== undefined ? route[path] : undefined;
	}

	const getKeyByValue = (obj: Record<string, string>, value: string): string | undefined => {
		return Object.keys(obj).find((key) => {
			return obj[key] === value;
		});
	};

	const reversedKey = getKeyByValue(routes[currentLang], path);

	if (reversedKey !== undefined) {
		return reversedKey;
	}

	return undefined;
}

/** Returns the shared route key represented by a generated static path.
 * @param {URL} url Current page URL.
 * @param {string} path Generated route path.
 * @returns {string | undefined} The shared route key, when one exists.
 */
export function getRouteFromStaticPath(url: URL, path: string): string | undefined {
	if (path === undefined) {
		return undefined;
	}

	const currentLang = getLangFromUrl(url);
	let normalizedPath = path;

	if (defaultLang !== currentLang) {
		normalizedPath = path.replace(`${currentLang}/`, '');
	}

	const getKeyByValue = (obj: Record<string, string>, value: string): string | undefined => {
		return Object.keys(obj).find((key) => {
			return obj[key] === value;
		});
	};

	const reversedKey = getKeyByValue(routes[currentLang], normalizedPath);

	if (reversedKey !== undefined) {
		return reversedKey;
	}

	return undefined;
}
