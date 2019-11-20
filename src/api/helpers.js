import axios from 'axios';

const axiosService = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const getMovies = async page => {
	try {
		const res = await axiosService.get(
			`/movie/now_playing?api_key=d7c40654d95940990da63cd4110311e5&page=${page}`,
		);
		return res.data;
	} catch (error) {
		console.log('TCL: getMovies -> error', error);
	}
};

export const getTopRatedMovies = async page => {
	try {
		const res = await axiosService.get(
			`/movie/top_rated?api_key=d7c40654d95940990da63cd4110311e5&page=${page}`,
		);
		return res.data;
	} catch (error) {
		console.log('TCL: getMovies -> error', error);
	}
};

export const getMovie = async movieId => {
	try {
		const res = await axiosService.get(
			`/movie/${movieId}?api_key=d7c40654d95940990da63cd4110311e5`,
		);
		const credits = await getCredits(movieId);
		console.log('TCL: credits', credits);
		return { ...res.data, cast: credits.cast };
	} catch (error) {
		console.log('TCL: error', error);
	}
};

export const getCredits = async movieId => {
	try {
		const res = await axiosService.get(
			`/movie/${movieId}/credits?api_key=d7c40654d95940990da63cd4110311e5`,
		);
		return res.data;
	} catch (error) {
		console.log('TCL: error', error);
	}
};

export const searchMovies = async keyword => {
	const res = await axiosService.get(
		`/search/movie?api_key=d7c40654d95940990da63cd4110311e5&query=${keyword}`,
	);
	return res.data;
};
