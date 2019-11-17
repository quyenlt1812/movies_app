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
