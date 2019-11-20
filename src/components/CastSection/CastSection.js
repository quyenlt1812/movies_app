import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressiveImage from '../ProgressiveImage/ProgressiveImage';

const CastItem = ({ actor, isLastItem }) => {
	const { profile_path: profileImage, name, character } = actor;
	console.log('TCL: CastItem -> isLastItem', isLastItem);
	return (
		<View
			style={{
				...styles.itemContainer,
				borderBottomColor: isLastItem ? 'transparent' : '#e9ebee',
			}}
		>
			<ProgressiveImage
				rounded
				style={styles.profileImage}
				thumbnailSource={{
					uri: `https://image.tmdb.org/t/p/w500${profileImage}?w=50&buster=${Math.random()}`,
				}}
				source={{
					uri: `https://image.tmdb.org/t/p/w500${profileImage}`,
				}}
			/>
			<View style={{ marginLeft: 10 }}>
				<Text style={styles.actorName}>{name}</Text>
				<Text style={styles.character}>{character}</Text>
			</View>
		</View>
	);
};

const CastSection = ({ cast }) => {
	return (
		<View>
			{cast.map((actor, index) => (
				<CastItem
					key={actor.id}
					actor={actor}
					isLastItem={index + 1 === cast.length}
				/>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	profileImage: {
		width: 50,
		height: 50,
		borderRadius: 100,
	},
	itemContainer: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row',
		paddingVertical: 8,
		justifyContent: 'space-between',
		borderBottomColor: '#e9ebee',
		borderBottomWidth: 1,
	},
	actorName: {
		fontSize: 15,
		fontWeight: 'bold',
		marginBottom: 4,
		color: '#273d57',
		textAlign: 'right',
	},
	character: {
		fontSize: 13,
		color: '#8093a7',
		fontWeight: 'normal',
		textAlign: 'right',
	},
});

export default CastSection;
