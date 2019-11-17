import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({ movie }) => {
	const {
		title,
		release_date: repeaseDate,
		overview,
		poster_path: image,
	} = movie;

	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<Image
					style={styles.image}
					source={{
						uri: `https://image.tmdb.org/t/p/w500${image}`,
					}}
				/>
			</View>
			<View style={styles.content}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.releaseDate}>Release date: {repeaseDate}</Text>
				<Text style={styles.shortDes} numberOfLines={5}>
					{overview}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 10,
		marginVertical: 10,
		padding: 15,
		backgroundColor: '#ffffff',
		borderRadius: 10,
		display: 'flex',
		flexDirection: 'row',
		shadowColor: 'rgba(195, 210, 225, 0.65)',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.8,
		shadowRadius: 5,
		elevation: 5,
	},
	imageContainer: {
		marginRight: 10,
	},
	image: {
		width: 130,
		height: 200,
		borderRadius: 10,
	},
	content: {
		flex: 1,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 4,
		color: '#273d57',
	},
	releaseDate: {
		color: 'gray',
		fontSize: 12,
		marginBottom: 10,
		color: '#8093a7',
	},
	shortDes: {
		fontSize: 14,
		color: '#8093a7',
	},
});

export default MovieCard;
