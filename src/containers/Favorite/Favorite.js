import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	FlatList,
	ActivityIndicator,
} from 'react-native';
import MovieCard from '../../components/MovieCard/MovieCard';
import { getFavoriteMovies, removeMovieFromFavoriteList } from '../../utils';

class Favorite extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			favoriteMovies: [],
			loading: true,
		};
	}

	componentDidMount() {
		this._getFavoriteList();
	}

	async componentDidUpdate() {
		const favoriteList = await getFavoriteMovies();
		if (favoriteList.length !== this.state.favoriteMovies.length) {
			this.setState({
				favoriteMovies: favoriteList,
			});
		}
	}

	_getFavoriteList = async () => {
		this.setState({ loading: true });
		const favoriteList = await getFavoriteMovies();
		console.log(
			'TCL: Favorite -> _getFavoriteList -> favoriteList',
			favoriteList,
		);

		if (favoriteList) {
			this.setState(
				{
					favoriteMovies: favoriteList,
					loading: false,
				},
				() => console.log('=======', this.state.favoriteMovies),
			);
		}
	};

	_removeFromFavorite = async movieId => {
		await removeMovieFromFavoriteList(movieId);
		await this._getFavoriteList();
	};

	render() {
		const { navigation } = this.props;
		const { favoriteMovies, loading } = this.state;
		console.log('TCL: Favorite -> render -> favoriteMovies', favoriteMovies);
		return (
			<SafeAreaView style={styles.container}>
				{loading ? (
					<ActivityIndicator animating size="large" />
				) : (
					<React.Fragment>
						{favoriteMovies.length ? (
							<FlatList
								contentContainerStyle={{
									flexDirection: 'column',
									width: '100%',
								}}
								data={favoriteMovies}
								keyExtractor={item => item.id.toString()}
								renderItem={({ item }) => (
									<MovieCard
										movie={item}
										navigation={navigation}
										inFavorite
										removeFromFavorite={this._removeFromFavorite}
									/>
								)}
							/>
						) : (
							<View style={styles.blankContainer}>
								<Text>You have no favorite movie</Text>
							</View>
						)}
					</React.Fragment>
				)}
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f2f6fa',
	},
	blankContainer: {
		flex: 1,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default Favorite;
