import { useEffect, useRef } from 'react';
import KeenSlider from 'keen-slider';

interface HeroImage {
	src: string;
	avif400: string;
	avif1920: string;
	webp400: string;
	webp1920: string;
	jpg400: string;
	jpg1920: string;
	width: number;
	height: number;
	objectClass: string;
}

interface Props {
	images: HeroImage[];
}

export default function HeroCarousel({ images }: Props) {
	const sliderRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!sliderRef.current) return;

		const sliderElement = sliderRef.current;
		let timeout: ReturnType<typeof setTimeout>;
		let mouseOver = false;

		function clearNextTimeout() {
			clearTimeout(timeout);
		}

		function nextTimeout(s: any) {
			clearNextTimeout();
			if (mouseOver) return;
			timeout = setTimeout(() => {
				s.next();
			}, 5000);
		}

		const slider = new KeenSlider(sliderElement, {
			loop: true,
			renderMode: 'performance',
			drag: true,
			created(s) {
				sliderElement.addEventListener('mouseover', () => {
					mouseOver = true;
					clearNextTimeout();
				});
				sliderElement.addEventListener('mouseout', () => {
					mouseOver = false;
					nextTimeout(s);
				});
				nextTimeout(s);
			},
			dragStarted() {
				clearNextTimeout();
			},
			animationEnded(s) {
				nextTimeout(s);
			},
			updated(s) {
				nextTimeout(s);
			}
		});

		return () => {
			clearNextTimeout();
			slider.destroy();
		};
	}, []);

	return (
		<div class="carousel keen-slider" ref={sliderRef}>
			{images.map((img) => (
				<picture class="hero keen-slider__slide" key={img.src}>
					<source srcset={`${img.avif400} 400w, ${img.avif1920} 1920w`} sizes="100vw" type="image/avif" />
					<source srcset={`${img.webp400} 400w, ${img.webp1920} 1920w`} sizes="100vw" type="image/webp" />
					<source srcset={`${img.jpg400} 400w, ${img.jpg1920} 1920w`} sizes="100vw" type="image/jpg" />
					<img
						src={img.jpg400}
						class={img.objectClass}
						width={img.width}
						height={img.height}
						fetchPriority="high"
						alt=""
					/>
				</picture>
			))}
		</div>
	);
}
