/**
 * scripts/album.js
 */

let dialog;
let dragStartX = 0;
let dragEndX = 0;
let isDragging = false;
let minDragDistance = 50; // Minimum distance to consider a drag
let currentTranslateX = 0;
let maxTranslate = 100; // Maximum pixels to translate during drag

const setPicture = function (url) {
	const picture = dialog?.getElementsByTagName('picture')[0];

	// Reset any existing translation
	picture.style.transition = 'none';
	picture.style.transform = 'translateX(0)';
	currentTranslateX = 0;

	const avif = document.createElement('source');
	avif.srcset = url.replace('.jpg', '.avif');
	avif.type = 'image/avif';

	const webp = document.createElement('source');
	webp.srcset = url.replace('.jpg', '.webp');
	webp.type = 'image/webp';

	const jpg = document.createElement('source');
	jpg.srcset = url;
	jpg.type = 'image/webp';

	const img = document.createElement('img');
	img.src = url;

	picture.appendChild(avif);
	picture.appendChild(webp);
	picture.appendChild(jpg);
	picture.appendChild(img);
};

const resetPicture = function () {
	const picture = dialog?.getElementsByTagName('picture')[0];

	while (picture.lastChild) {
		picture.removeChild(picture.lastChild);
	}
};

const setNavigation = function (currentUrl) {
	const previousBtn = document.getElementById('previous-photo');
	const nextBtn = document.getElementById('next-photo');
	const path = new URL(currentUrl).pathname;

	const element = document.querySelector(`[href="${path}"]`);
	const allPhotos = Array.from(document.querySelectorAll('main a:not([id])'));

	// Implement circular navigation
	if (element?.previousElementSibling?.href) {
		previousBtn.href = element.previousElementSibling.href;
	} else if (allPhotos.length > 0) {
		// If no previous element, go to the last photo
		previousBtn.href = allPhotos[allPhotos.length - 1].href;
	}

	if (element?.nextElementSibling?.href) {
		nextBtn.href = element.nextElementSibling.href;
	} else if (allPhotos.length > 0) {
		// If no next element, go to the first photo
		nextBtn.href = allPhotos[0].href;
	}
};

const closeDialog = function () {
	resetPicture();
	dialog.close();
};

const updateImageTranslation = function() {
	if (!isDragging) return;

	const picture = dialog?.getElementsByTagName('picture')[0];
	if (!picture) return;

	// Calculate translation based on drag distance, but limit to maxTranslate
	const dragDistance = dragEndX - dragStartX;
	currentTranslateX = Math.max(-maxTranslate, Math.min(maxTranslate, dragDistance));

	// Apply translation with smooth transition
	picture.style.transition = 'transform 0.1s ease-out';
	picture.style.transform = `translateX(${currentTranslateX}px)`;
};

const resetImageTranslation = function(bounceDirection = 0) {
	const picture = dialog?.getElementsByTagName('picture')[0];
	if (!picture) return;

	// If bounceDirection is provided, add a small bounce effect
	if (bounceDirection !== 0) {
		// First bounce in the opposite direction of the drag
		const bounceDistance = bounceDirection * 20; // 20px bounce
		picture.style.transition = 'transform 0.15s ease-out';
		picture.style.transform = `translateX(${bounceDistance}px)`;

		// Then return to center after a short delay
		setTimeout(() => {
			picture.style.transition = 'transform 0.3s ease-out';
			picture.style.transform = 'translateX(0)';
			currentTranslateX = 0;
		}, 150);
	} else {
		// Standard reset without bounce
		picture.style.transition = 'transform 0.3s ease-out';
		picture.style.transform = 'translateX(0)';
		currentTranslateX = 0;
	}
};

const handleDragEnd = function (previousBtn, nextBtn) {
	const dragDistance = dragEndX - dragStartX;

	// Check if drag distance exceeds minimum threshold
	if (Math.abs(dragDistance) >= minDragDistance) {
		if (dragDistance > 0) {
			// Dragged right, go to previous photo
			// With circular navigation, previousBtn.href should always be set
			previousBtn.click();
		} else {
			// Dragged left, go to next photo
			// With circular navigation, nextBtn.href should always be set
			nextBtn.click();
		}
	} else {
		// Drag distance too small, reset translation without bounce
		resetImageTranslation(0);
	}

	// Reset drag values
	dragStartX = 0;
	dragEndX = 0;
};

const gotToPhoto = function (event) {
	resetPicture();
	setPicture(event.currentTarget.href);
	setNavigation(event.currentTarget.href);
	event.preventDefault();
};

const openDialog = function (event) {
	setPicture(event.currentTarget.href);
	setNavigation(event.currentTarget.href);

	dialog?.showModal();
	event.preventDefault();
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
	previousBtn?.addEventListener('click', gotToPhoto);
	nextBtn?.addEventListener('click', gotToPhoto);

	// Close the dialog when clicking on the backdrop
	dialog.addEventListener('click', (event) => {
		let rect = dialog.getBoundingClientRect();
		const isInDialog =
			rect.top <= event.clientY &&
			event.clientY <= rect.top + rect.height &&
			rect.left <= event.clientX &&
			event.clientX <= rect.left + rect.width;

		rect = previousBtn.getBoundingClientRect();
		const isInPreviousBtn =
			rect.top <= event.clientY &&
			event.clientY <= rect.top + rect.height &&
			rect.left <= event.clientX &&
			event.clientX <= rect.left + rect.width;

		rect = nextBtn.getBoundingClientRect();
		const isInNextBtn =
			rect.top <= event.clientY &&
			event.clientY <= rect.top + rect.height &&
			rect.left <= event.clientX &&
			event.clientX <= rect.left + rect.width;

		if (!(isInDialog || isInPreviousBtn || isInNextBtn)) {
			closeDialog();
		}
	});

	dialog.addEventListener('keydown', (event) => {
		if (event.key === 'ArrowLeft') {
			// With circular navigation, previousBtn.href should always be set
			previousBtn.click();
		} else if (event.key === 'ArrowRight') {
			// With circular navigation, nextBtn.href should always be set
			nextBtn.click();
		}
	});

	// Add touch event listeners for drag navigation
	dialog.addEventListener('touchstart', (event) => {
		// Do not start dragging when touching navigation buttons
		const target = event.target;
		if (target && target.closest && target.closest('#previous-photo, #next-photo')) {
			isDragging = false;
			return;
		}
		dragStartX = event.touches[0].clientX;
		isDragging = true;
	});

	dialog.addEventListener('touchmove', (event) => {
		if (isDragging) {
			dragEndX = event.touches[0].clientX;
			updateImageTranslation();
		}
	});

	dialog.addEventListener('touchend', (event) => {
		// If the touch ends on navigation buttons, do not treat it as a drag
		const target = event.target;
		if (target && target.closest && target.closest('#previous-photo, #next-photo')) {
			isDragging = false;
			return;
		}
		if (isDragging) {
			handleDragEnd(previousBtn, nextBtn);
			isDragging = false;
		}
	});

	// Add mouse event listeners for drag navigation
	dialog.addEventListener('mousedown', (event) => {
		// Do not start dragging when clicking navigation buttons
		const target = event.target;
		if (target && target.closest && target.closest('#previous-photo, #next-photo')) {
			isDragging = false;
			return;
		}
		dragStartX = event.clientX;
		isDragging = true;
	});

	dialog.addEventListener('mousemove', (event) => {
		if (isDragging) {
			dragEndX = event.clientX;
			updateImageTranslation();
		}
	});

	dialog.addEventListener('mouseup', (event) => {
		// If the mouseup occurs on navigation buttons, do not treat it as a drag
		const target = event.target;
		if (target && target.closest && target.closest('#previous-photo, #next-photo')) {
			isDragging = false;
			return;
		}
		if (isDragging) {
			handleDragEnd(previousBtn, nextBtn);
			isDragging = false;
		}
	});

	// Cancel dragging if mouse leaves the dialog
	dialog.addEventListener('mouseleave', () => {
		isDragging = false;
	});

	const photos = album.getElementsByTagName('a');
	Array.from(photos).forEach((element) => {
		if (!element.id) {
			element.addEventListener('click', openDialog);
		}
	});
};

init();
