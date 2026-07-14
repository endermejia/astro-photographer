import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

interface NavItem {
	href: string;
	label: string;
}

interface Props {
	navItems: NavItem[];
	menuLabel: string;
}

export default function Navigation({ navItems, menuLabel }: Props) {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const sections = document.querySelectorAll('header#header, section#photos, section#about, section#contact');
		const navLinks = document.querySelectorAll('nav ul li a:not(.theme-toggle)');

		if (sections.length === 0 || navLinks.length === 0) return;

		const options = {
			root: null,
			rootMargin: '-30% 0px -40% 0px',
			threshold: 0
		};

		let currentActiveId = '';

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const id = entry.target.id;
					if (id) {
						setActiveSection(id);
					}
				}
			});
		}, options);

		sections.forEach((section) => {
			observer.observe(section);
		});

		function setActiveSection(id: string) {
			if (currentActiveId === id) return;
			currentActiveId = id;

			navLinks.forEach((link) => {
				const href = link.getAttribute('href');
				const targetId = id === 'header' ? 'home' : id;
				if (href && href.endsWith(`#${targetId}`)) {
					link.classList.add('active');
				} else {
					link.classList.remove('active');
				}
			});

			const targetHash = id === 'header' ? '#home' : `#${id}`;
			if (window.location.hash !== targetHash) {
				const newUrl = `${window.location.pathname}${targetHash}`;
				window.history.replaceState(null, '', newUrl);
			}
		}

		const currentHash = window.location.hash;
		if (currentHash) {
			const sectionId = currentHash === '#home' ? 'header' : currentHash.substring(1);
			const targetSection = document.getElementById(sectionId);
			if (targetSection) {
				setActiveSection(sectionId === 'header' ? 'header' : sectionId);
			}
		}
	}, []);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isOpen) {
				setIsOpen(false);
			}
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [isOpen]);

	return (
		<>
			<nav aria-label="Main Menu">
				<a
					class="hamburger"
					aria-hidden="true"
					tabIndex={0}
					onClick={() => setIsOpen(!isOpen)}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							setIsOpen(!isOpen);
						}
					}}
				>
					<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<title>{menuLabel}</title>
						<path
							d="M3 17h18a1 1 0 0 1 .117 1.993L21 19H3a1 1 0 0 1-.117-1.993L3 17h18H3Zm0-6 18-.002a1 1 0 0 1 .117 1.993l-.117.007L3 13a1 1 0 0 1-.117-1.993L3 11l18-.002L3 11Zm0-6h18a1 1 0 0 1 .117 1.993L21 7H3a1 1 0 0 1-.117-1.993L3 5h18H3Z"
							fill="currentcolor"
						/>
					</svg>
				</a>
				<ul class={isOpen ? 'open' : ''}>
					{navItems.map((item) => (
						<li>
							<a href={item.href} tabIndex={0}>
								{item.label}
							</a>
						</li>
					))}
					<li>
						<ThemeToggle />
					</li>
				</ul>
			</nav>
			<a
				class={`dismiss ${isOpen ? 'visible' : ''}`}
				aria-hidden="true"
				tabIndex={isOpen ? 0 : -1}
				onClick={() => setIsOpen(false)}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						setIsOpen(false);
					}
				}}
			>
				<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path
						d="m4.21 4.387.083-.094a1 1 0 0 1 1.32-.083l.094.083L12 10.585l6.293-6.292a1 1 0 1 1 1.414 1.414L13.415 12l6.292 6.293a1 1 0 0 1 .083 1.32l-.083.094a1 1 0 0 1-1.32.083l-.094-.083L12 13.415l-6.293 6.292a1 1 0 0 1-1.414-1.414L10.585 12 4.293 5.707a1 1 0 0 1-.083-1.32l.083-.094-.083.094Z"
						fill="currentcolor"
					/>
				</svg>
			</a>
		</>
	);
}
