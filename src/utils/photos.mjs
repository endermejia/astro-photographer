const albumNumbers = {
	climbing: [1, 2, 3, 4, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51],
	people: Array.from({ length: 37 }, (_, index) => {
		return index + 1;
	}),
	events: Array.from({ length: 93 }, (_, index) => {
		return index + 1;
	}).filter((number) => number !== 83),
	business: [1, 2, 3, 4, 5, 6, 7, 8, 9, ...Array.from({ length: 47 }, (_, index) => {
		return index + 11;
	})],
	travel: Array.from({ length: 39 }, (_, index) => {
		return index + 1;
	})
};

export const photos = () => {
	return Object.fromEntries(Object.entries(albumNumbers).map(([album, numbers]) => {
		return [album, {
			images: numbers.map((number) => {
				const name = String(number).padStart(2, '0');
				return { name, path: `/assets/img/albums/${album}/`, width: 1600, height: 1067, orientation: 'landscape' };
			})
		}];
	}));
};
