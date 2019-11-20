import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	FlatList,
	ActivityIndicator,
} from 'react-native';
import { getTopRatedMovies } from '../../api/helpers';
import MovieCard from '../../components/MovieCard/MovieCard';

class MovieList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			movies: [],
			page: 1,
			loading: true,
			loadingMore: false,
			refreshing: false,
			error: null,
		};
	}

	componentDidMount() {
		this._fetchMovies();
	}

	_fetchMovies = async (getPage = 1) => {
		const response = await getTopRatedMovies(getPage);
		console.log('TCL: MovieList -> _fetchMovies -> response', response);
		this.setState(({ movies, page }) => ({
			movies: page === 1 ? response.results : [...movies, ...response.results],
			loading: false,
			refreshing: false,
		}));
	};

	_handleLoadMore = () => {
		this.setState(
			(prevProps, nextProps) => ({
				page: prevProps.page + 1,
				loadingMore: true,
			}),
			() => this._fetchMovies(this.state.page),
		);
	};

	_handleRefresh = () => {
		this.setState(
			{
				page: 1,
				refreshing: true,
			},
			() => {
				this._fetchMovies();
			},
		);
	};

	_renderFooter = () => {
		const { loadingMore } = this.state;
		if (!loadingMore) return null;

		return (
			<View
				style={{
					position: 'relative',
					paddingVertical: 20,
					marginTop: 10,
					marginBottom: 10,
				}}
			>
				<ActivityIndicator animating size="large" />
			</View>
		);
	};

	render() {
		const { movies, refreshing } = this.state;
		const { navigation } = this.props;
		console.log('TCL: render -> movies', movies);
		return (
			<SafeAreaView style={styles.container}>
				<FlatList
					contentContainerStyle={{
						flexDirection: 'column',
						width: '100%',
					}}
					data={movies}
					keyExtractor={item => item.id.toString()}
					renderItem={({ item }) => (
						<MovieCard movie={item} navigation={navigation} />
					)}
					onEndReached={this._handleLoadMore}
					onEndReachedThreshold={0.5}
					initialNumToRender={10}
					ListFooterComponent={this._renderFooter}
					onRefresh={this._handleRefresh}
					refreshing={refreshing}
				/>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f2f6fa',
	},
});

export default MovieList;
