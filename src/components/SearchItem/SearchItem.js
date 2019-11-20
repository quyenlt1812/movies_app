import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ProgressiveImage from '../ProgressiveImage/ProgressiveImage';

const SearchItem = ({ movie }) => {
	const { poster_path: poster, title, release_date: release } = movie;
	return (
		<View style={styles.container}>
			<View style={styles.itemContainer}>
				<View style={styles.imageContainer}>
					<ProgressiveImage
						style={styles.poster}
						thumbnailSource={{
							uri: `https://image.tmdb.org/t/p/w500${poster}?w=50&buster=${Math.random()}`,
						}}
						source={{
							uri: `https://image.tmdb.org/t/p/w500${poster}`,
						}}
					/>
				</View>
				<View style={styles.contentContainer}>
					<Text style={styles.title}>
						{title}
						&nbsp;
						{release && (
							<Text style={styles.releaseDate}>
								- {release.substring(0, 4)}
							</Text>
						)}
					</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 12,
		marginHorizontal: 15,
		borderBottomColor: 'rgba(195, 210, 225, 0.65)',
		borderBottomWidth: 1,
	},
	itemContainer: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
	},
	imageContainer: {
		marginRight: 10,
	},
	contentContainer: {
		flex: 1,
	},
	poster: {
		width: 50,
		height: 50,
		borderRadius: 5,
	},
	title: {
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
});

export default SearchItem;
