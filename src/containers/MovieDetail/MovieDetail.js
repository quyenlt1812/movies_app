import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TouchableHighlight,
	ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getMovie } from '../../api/helpers';
import ProgressiveImage from '../../components/ProgressiveImage/ProgressiveImage';
import {
	getFavoriteMovies,
	removeMovieFromFavoriteList,
	addMovieToFavorite,
} from '../../utils';

class MovieDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			movieDetail: {},
			isFavorite: false,
			loading: true,
		};
	}

	async componentDidMount() {
		const { navigation } = this.props;
		const movieId = navigation.getParam('movieId', null);
		if (movieId) {
			const movieDetail = await getMovie(movieId);
			console.log(
				'TCL: MovieDetail -> componentDidMount -> movieDetail',
				movieDetail,
			);
			this.setState(
				{
					movieDetail,
					loading: false,
				},
				() => this._isFavorite(),
			);
		}
	}

	_isFavorite = async () => {
		const { movieDetail } = this.state;
		const myFavorite = await getFavoriteMovies();
		console.log('TCL: _isFavorite -> myFavorite', myFavorite);
		if (myFavorite && myFavorite.some(movie => movie.id === movieDetail.id)) {
			this.setState({ isFavorite: true });
		}
	};

	_toggleFavorite = async () => {
		try {
			const { movieDetail, isFavorite } = this.state;
			console.log('TCL: _toggleFavorite -> isFavorite', isFavorite);
			if (isFavorite) {
				await removeMovieFromFavoriteList(movieDetail.id);
				this.setState({ isFavorite: false });
			} else {
				await addMovieToFavorite(movieDetail);
				this.setState({ isFavorite: true });
			}
		} catch (error) {
			console.log('TCL: MovieDetail -> _addToFavorite -> error', error);
		}
	};

	render() {
		const { movieDetail, isFavorite, loading } = this.state;
		if (loading) {
			return (
				<View style={styles.loadingContainer}>
					<ActivityIndicator animating size="large" />
				</View>
			);
		}

		return (
			<View style={styles.container}>
				<ProgressiveImage
					style={styles.backdrop}
					thumbnailSource={{
						uri: `https://image.tmdb.org/t/p/w500${
							movieDetail.backdrop_path
						}?w=50&buster=${Math.random()}`,
					}}
					source={{
						uri: `https://image.tmdb.org/t/p/w500${movieDetail.backdrop_path}`,
					}}
				/>
				{/* <LinearGradient
					colors={['#00000000', '#f2f6fa', '#f2f6fa']}
					style={styles.linearGradient}
				/> */}
				<ScrollView style={{ flex: 1 }}>
					<View style={styles.contentWrapper}>
						<View style={styles.infoWrapper}>
							<ProgressiveImage
								style={styles.image}
								thumbnailSource={{
									uri: `https://image.tmdb.org/t/p/w500${
										movieDetail.poster_path
									}?w=50&buster=${Math.random()}`,
								}}
								source={{
									uri: `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`,
								}}
							/>
							<View style={{ marginLeft: 15, flex: 1 }}>
								<Text style={styles.title}>{movieDetail.title}</Text>
								<Text style={styles.releaseDate}>
									Release date: {movieDetail.release_date}
								</Text>
								<View style={styles.contentBlock}>
									<Text>Rating:</Text>
									<Text>{`${movieDetail.vote_average}/10 (${movieDetail.vote_count} votes total)`}</Text>
								</View>
							</View>
						</View>
						<TouchableHighlight onPress={this._toggleFavorite}>
							<View style={styles.addToFavBtn}>
								<Text style={{ color: 'white', fontSize: 16 }}>
									{isFavorite ? 'REMOVE FROM FAVORITE' : 'ADD TO FAVORITE'}
								</Text>
							</View>
						</TouchableHighlight>
					</View>
					<View style={styles.detailWrapper}>
						<View style={styles.contentBlock}>
							<Text>Overview:</Text>
							<Text>{movieDetail.overview}</Text>
						</View>
						<View style={styles.contentBlock}>
							<Text>Genres:</Text>
							<Text>
								{movieDetail.genres &&
									movieDetail.genres.map((genre, index) => (
										<Text>{`${genre.name}${
											index !== movieDetail.genres.length ? ', ' : ''
										}`}</Text>
									))}
							</Text>
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: {
		flex: 1,
		backgroundColor: '#f2f6fa',
		position: 'relative',
	},
	contentWrapper: {
		marginHorizontal: 15,
		paddingTop: 180,
		borderRadius: 10,
		overflow: 'hidden',
	},
	infoWrapper: {
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: '#ffffff',
		paddingHorizontal: 20,
		paddingVertical: 15,
	},
	addToFavBtn: {
		width: '100%',
		color: '#ffffff',
		backgroundColor: '#3c80ef',
		paddingVertical: 20,
		textAlign: 'center',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	backdrop: {
		width: '100%',
		height: 220,
		position: 'absolute',
		top: 0,
		left: 0,
	},
	image: {
		width: 130,
		height: 200,
		borderRadius: 10,
		marginTop: -50,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 4,
		color: '#273d57',
	},
	releaseDate: {
		fontSize: 12,
		marginBottom: 10,
		color: '#8093a7',
	},
	shortDes: {
		fontSize: 14,
		color: '#8093a7',
	},
	linearGradient: {
		width: '100%',
		height: 400,
		position: 'absolute',
		left: 0,
		top: 0,
	},
	detailWrapper: {
		paddingHorizontal: 20,
		paddingTop: 30,
		backgroundColor: '#f2f6fa',
	},
	contentBlock: {
		paddingVertical: 10,
	},
});

export default MovieDetail;
