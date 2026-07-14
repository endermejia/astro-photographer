import { useState, useEffect } from 'react';

export default function ThemeToggle() {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const saved = localStorage.getItem('theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		setIsDark(saved === 'dark' || (!saved && prefersDark));
	}, []);

	useEffect(() => {
		if (isDark) {
			document.documentElement.classList.remove('light-theme');
			document.documentElement.classList.add('dark-theme');
		} else {
			document.documentElement.classList.remove('dark-theme');
			document.documentElement.classList.add('light-theme');
		}
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
	}, [isDark]);

	return (
		<button
			class="theme-toggle"
			aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
			title="Toggle theme"
			onClick={() => setIsDark(!isDark)}
		>
			{isDark ? (
				<svg
					class="moon-icon"
					width="24"
					height="24"
					fill="none"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M9.36 3.293a1 1 0 0 1 .187 1.157A7.45 7.45 0 0 0 19.55 14.453a1 1 0 0 1 1.343 1.343 9.45 9.45 0 1 1-12.69-12.69 1 1 0 0 1 1.158.187Z"
						fill="currentcolor"
					/>
				</svg>
			) : (
				<svg class="sun-icon" width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M12 4V2m0 20v-2m-8-8H2m20 0h-2m-1.414-7.414l-1.414 1.414M5.414 5.414L4 4m16 16-1.414-1.414M5.414 18.586 4 20M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
						stroke="currentcolor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			)}
		</button>
	);
}
