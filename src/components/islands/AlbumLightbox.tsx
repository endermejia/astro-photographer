import { useEffect, useRef, useState } from 'react';
import KeenSlider from 'keen-slider';

interface Photo {
	path: string;
	name: string;
	width: number;
	height: number;
	orientation: string;
}

interface Props {
	photos: Photo[];
	lang: string;
	translations: {
		title: string;
		climbing: string;
		people: string;
		events: string;
		business: string;
		travel: string;
	};
	albumName: string;
}

export default function AlbumLightbox({ photos, translations, albumName }: Props) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const sliderRef = useRef<HTMLDivElement>(null);
	const [slider, setSlider] = useState<any>(null);

	useEffect(() => {
		if (!sliderRef.current || !dialogRef.current) return;

		const s = new KeenSlider(sliderRef.current, {
			loop: true,
			renderMode: 'performance',
			drag: true
		});
		setSlider(s);

		return () => s.destroy();
	}, []);

	const openDialog = (index: number) => {
		dialogRef.current?.showModal();
		if (slider) {
			slider.update();
			slider.moveToIdx(index, true, { duration: 0 });
		}
	};

	const closeDialog = () => {
		dialogRef.current?.close();
	};

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft') {
				slider?.prev();
			} else if (e.key === 'ArrowRight') {
				slider?.next();
			} else if (e.key === 'Escape') {
				closeDialog();
			}
		};

		const handleClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (
				target === dialog ||
				target.classList.contains('keen-slider__slide') ||
				target.id === 'dialog-slider' ||
				target.closest('#close-dialog')
			) {
				closeDialog();
			}
		};

		dialog.addEventListener('keydown', handleKeyDown);
		dialog.addEventListener('click', handleClick);

		return () => {
			dialog.removeEventListener('keydown', handleKeyDown);
			dialog.removeEventListener('click', handleClick);
		};
	}, [slider]);

	return (
		<>
			<dialog id="photo-dialog" ref={dialogRef}>
				<button id="close-dialog" type="reset" title="Press Esc to close" aria-label="Close" onClick={closeDialog}>
					<svg xmlns="http://www.w3.org/2000/svg" id="mdi-close" viewBox="0 0 24 24">
						<path
							d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
							fill="currentColor"
						/>
					</svg>
				</button>

				<div id="dialog-slider" class="keen-slider" ref={sliderRef}>
					{photos.map((pic) => (
						<div class="keen-slider__slide" key={pic.name}>
							<picture>
								<source srcset={`${pic.path}${pic.name}-1920.avif`} type="image/avif" />
								<source srcset={`${pic.path}${pic.name}-1920.webp`} type="image/webp" />
								<source srcset={`${pic.path}${pic.name}-1920.jpg`} type="image/jpg" />
								<img src={`${pic.path}${pic.name}-1920.jpg`} loading="lazy" alt={pic.name} />
							</picture>
						</div>
					))}
				</div>

				<a id="previous-photo" title="Previous photo" aria-label="Previous photo" onClick={() => slider?.prev()}>
					<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M5.75 3a.75.75 0 0 0-.743.648L5 3.75v16.5a.75.75 0 0 0 1.493.102l.007-.102V3.75A.75.75 0 0 0 5.75 3Zm13.03.22a.75.75 0 0 0-.976-.073l-.084.073-8.25 8.25a.75.75 0 0 0-.073.976l.073.084 8.25 8.25a.75.75 0 0 0 1.133-.976l-.073-.084L11.06 12l7.72-7.72a.75.75 0 0 0 0-1.06Z"
							fill="currentColor"
						/>
					</svg>
				</a>
				<a id="next-photo" title="Next photo" aria-label="Next photo" onClick={() => slider?.next()}>
					<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M18.25 3a.75.75 0 0 1 .743.648L19 3.75v16.5a.75.75 0 0 1-1.493.102l-.007-.102V3.75a.75.75 0 0 1 .75-.75Zm-13.03.22a.75.75 0 0 1 .976-.073l.084.073 8.25 8.25a.75.75 0 0 1 .073.976l-.073.084-8.25 8.25a.75.75 0 0 1-1.133-.976l.073-.084L12.94 12 5.22 4.28a.75.75 0 0 1 0-1.06Z"
							fill="currentColor"
						/>
					</svg>
				</a>
			</dialog>

			<h1>{translations[albumName as keyof typeof translations] || albumName}</h1>
			{photos.map((pic, index) => (
				<a
					class={pic.orientation}
					href={`${pic.path}${pic.name}-1920.jpg`}
					data-index={index}
					aria-label={pic.name}
					key={pic.name}
					onClick={(e) => {
						e.preventDefault();
						openDialog(index);
					}}
				>
					<picture>
						<source
							srcset={`${pic.path}${pic.name}-100.avif 100w, ${pic.path}${pic.name}-400.avif`}
							type="image/avif"
						/>
						<source
							srcset={`${pic.path}${pic.name}-100.webp 100w, ${pic.path}${pic.name}-400.webp`}
							type="image/webp"
						/>
						<source
							srcset={`${pic.path}${pic.name}-100.jpg 100w, ${pic.path}${pic.name}-400.jpg`}
							type="image/jpg"
						/>
						<img src={`${pic.path}${pic.name}-100.jpg`} width={pic.width} height={pic.height} loading="lazy" alt="" />
					</picture>
				</a>
			))}
		</>
	);
}
