import { AsyncStorage } from 'react-native';

export const getFavoriteMovies = async () => {
	const favorite = await AsyncStorage.getItem('favorite');
	if (favorite) return JSON.parse(favorite);
	return [];
};

export const addMovieToFavorite = async movie => {
	let favoriteList = [];
	const favorite = await AsyncStorage.getItem('favorite');
	if (favorite) {
		favoriteList = JSON.parse(favorite);
	}
	await AsyncStorage.setItem(
		'favorite',
		JSON.stringify([...favoriteList, movie]),
	);
};

export const removeMovieFromFavoriteList = async movieId => {
	const favorite = await AsyncStorage.getItem('favorite');
	const favoriteList = JSON.parse(favorite);
	const filteredList = favoriteList.filter(
		favoriteMovie => favoriteMovie.id !== movieId,
	);
	await AsyncStorage.setItem('favorite', JSON.stringify(filteredList));
};
