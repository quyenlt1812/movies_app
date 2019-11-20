import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TouchableHighlight,
	StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { getMovie } from '../../api/helpers';
import ProgressiveImage from '../../components/ProgressiveImage/ProgressiveImage';
import {
	getFavoriteMovies,
	removeMovieFromFavoriteList,
	addMovieToFavorite,
} from '../../utils';
import Card from '../../components/Card/Card';
import CastSection from '../../components/CastSection';
import Loading from '../../components/Loading';

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
					<Loading />
				</View>
			);
		}

		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />
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
									<Text style={styles.sectionTitle}>
										Rating:{' '}
										<Text
											style={styles.shortDes}
										>{`${movieDetail.vote_average}/10 (${movieDetail.vote_count} votes)`}</Text>
									</Text>
								</View>
								<View style={styles.contentBlock}>
									<Text style={styles.sectionTitle}>
										Popularity:{' '}
										<Text style={styles.shortDes}>
											{movieDetail.popularity}
										</Text>
									</Text>
								</View>
							</View>
						</View>
						<TouchableHighlight onPress={this._toggleFavorite}>
							<View
								style={[
									{
										...styles.addToFavBtn,
										backgroundColor: isFavorite ? '#ed3d48' : '#ffffff',
									},
								]}
							>
								<Icon
									name={isFavorite ? 'heart' : 'heart-outline'}
									size={30}
									color={isFavorite ? '#ffffff' : '#ed3d48'}
								/>
							</View>
						</TouchableHighlight>
					</View>
					<View style={styles.detailWrapper}>
						<Card>
							<View style={styles.contentBlock}>
								<Text style={styles.sectionTitle}>Overview:</Text>
								<Text style={styles.shortDes}>{movieDetail.overview}</Text>
							</View>
							<View style={styles.contentBlock}>
								<Text style={styles.sectionTitle}>Genres:</Text>
								<Text style={styles.shortDes}>
									{movieDetail.genres &&
										movieDetail.genres.map((genre, index) => (
											<Text key={index}>
												{`${genre.name}${
													index !== movieDetail.genres.length ? ', ' : ''
												}`}
											</Text>
										))}
								</Text>
							</View>
						</Card>
						<Card>
							<Text style={styles.sectionTitle}>Cast</Text>
							<CastSection cast={movieDetail.cast} />
						</Card>
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
		paddingBottom: 20,
	},
	contentWrapper: {
		marginHorizontal: 15,
		paddingTop: 130,
		borderRadius: 10,
	},
	infoWrapper: {
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: '#ffffff',
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 10,
		shadowColor: 'rgba(195, 210, 225, 0.65)',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.8,
		shadowRadius: 5,
		elevation: 5,
	},
	addToFavBtn: {
		width: 60,
		height: 60,
		borderRadius: 1000,
		color: '#ffffff',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		bottom: -30,
		right: 20,
		shadowColor: 'rgba(195, 210, 225, 0.65)',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.8,
		shadowRadius: 5,
		elevation: 5,
	},
	backdrop: {
		width: '100%',
		height: 258,
		position: 'absolute',
		top: -88,
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
	sectionTitle: {
		fontSize: 14,
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
		fontWeight: 'normal',
	},
	linearGradient: {
		width: '100%',
		height: 400,
		position: 'absolute',
		left: 0,
		top: 0,
	},
	detailWrapper: {
		backgroundColor: '#f2f6fa',
		marginTop: 50,
	},
	contentBlock: {
		paddingVertical: 8,
	},
});

MovieDetail.navigationOptions = {
	headerStyle: {
		backgroundColor: '#00000000',
		shadowColor: 'transparent',
		borderBottomColor: 'transparent',
	},
	headerTintColor: '#ffffff',
	headerTitleStyle: {
		fontWeight: 'bold',
	},
};

export default MovieDetail;
