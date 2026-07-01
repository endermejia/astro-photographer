import KeenSlider from 'keen-slider';

let dialog;
let slider;

const closeDialog = function () {
	dialog.close();
};

const openDialog = function (event) {
	event.preventDefault();
	const target = event.currentTarget;
	const index = parseInt(target.getAttribute('data-index'), 10);

	dialog?.showModal();
	if (slider) {
		slider.update(); // Recalculate dimensions since dialog was display: none
		slider.moveToIdx(index, true, { duration: 0 }); // Move instantly to the selected photo
	}
};

const init = function () {
	dialog = document.getElementById('photo-dialog');
	const album = document.getElementsByTagName('main')[0];

	if (!(dialog && album)) {
		return;
	}

	const closeBtn = document.getElementById('close-dialog');
	closeBtn?.addEventListener('click', closeDialog);

	const previousBtn = document.getElementById('previous-photo');
	const nextBtn = document.getElementById('next-photo');

	previousBtn?.addEventListener('click', (e) => {
		e.preventDefault();
		slider?.prev();
	});

	nextBtn?.addEventListener('click', (e) => {
		e.preventDefault();
		slider?.next();
	});

	// Close the dialog when clicking on the backdrop or outside the image
	dialog.addEventListener('click', (event) => {
		if (
			event.target === dialog ||
			event.target.classList.contains('keen-slider__slide') ||
			event.target.id === 'dialog-slider' ||
			event.target.closest('#close-dialog')
		) {
			closeDialog();
		}
	});

	dialog.addEventListener('keydown', (event) => {
		if (event.key === 'ArrowLeft') {
			slider?.prev();
		} else if (event.key === 'ArrowRight') {
			slider?.next();
		} else if (event.key === 'Escape') {
			closeDialog();
		}
	});

	const photos = album.querySelectorAll('a[data-index]');
	photos.forEach((element) => {
		element.addEventListener('click', openDialog);
	});

	// Initialize KeenSlider for the dialog
	const sliderElement = document.getElementById('dialog-slider');
	if (sliderElement) {
		slider = new KeenSlider(sliderElement, {
			loop: true,
			renderMode: 'performance',
			drag: true
		});
	}
};

document.addEventListener('DOMContentLoaded', init);
