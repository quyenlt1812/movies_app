import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
	Modal,
	SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressiveImage from '../ProgressiveImage/ProgressiveImage';

const ConfirmModal = ({
	showConfirmModal,
	setShowConfirmModal,
	removeFromFavorite,
	movieId,
}) => (
	<Modal
		animationType="fade"
		transparent
		visible={showConfirmModal}
		onRequestClose={() => {
			console.log('Modal has been closed!');
		}}
	>
		<SafeAreaView style={styles.modalWrapper}>
			<View style={styles.modalContainer}>
				<Text>
					Are you sure want to remove this movie from the favorite list?
				</Text>
				<View style={styles.btnContainer}>
					<TouchableHighlight
						underlayColor="transparent"
						onPress={async () => {
							await removeFromFavorite(movieId);
							setShowConfirmModal(false);
						}}
					>
						<Text style={styles.btnDelete}>Remove</Text>
					</TouchableHighlight>
					<TouchableHighlight
						underlayColor="transparent"
						onPress={() => {
							setShowConfirmModal(false);
						}}
					>
						<Text style={styles.btnCancel}>Cancel</Text>
					</TouchableHighlight>
				</View>
			</View>
		</SafeAreaView>
	</Modal>
);

const MovieCard = ({ movie, navigation, inFavorite, removeFromFavorite }) => {
	console.log('TCL: MovieCard -> navigation', navigation);
	const {
		id,
		title,
		release_date: repeaseDate,
		overview,
		poster_path: image,
	} = movie;

	const [showConfirmModal, setShowConfirmModal] = useState(false);

	return (
		<React.Fragment>
			<TouchableHighlight
				underlayColor="transparent"
				style={styles.touch}
				onPress={() => navigation.navigate('MovieDetail', { movieId: id })}
			>
				<View style={styles.container}>
					<View style={styles.imageContainer}>
						<ProgressiveImage
							style={styles.image}
							thumbnailSource={{
								uri: `https://image.tmdb.org/t/p/w500${image}?w=50&buster=${Math.random()}`,
							}}
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
						{inFavorite && (
							<TouchableHighlight
								underlayColor="transparent"
								onPress={() => setShowConfirmModal(true)}
							>
								<View style={styles.btnRemove}>
									<Icon name="trash-can-outline" size={18} color="white" />
									<Text style={styles.btnRemoveText}>Remove</Text>
								</View>
							</TouchableHighlight>
						)}
					</View>
				</View>
			</TouchableHighlight>
			<ConfirmModal
				showConfirmModal={showConfirmModal}
				setShowConfirmModal={setShowConfirmModal}
				removeFromFavorite={removeFromFavorite}
				movieId={id}
			/>
		</React.Fragment>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 15,
		backgroundColor: '#ffffff',
		borderRadius: 10,
		display: 'flex',
		flexDirection: 'row',
		marginHorizontal: 10,
		marginVertical: 10,
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
		display: 'flex',
		flexDirection: 'column',
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
		flex: 1,
	},
	touch: {
		backgroundColor: 'transparent',
	},
	btnRemove: {
		backgroundColor: '#f3383d',
		paddingVertical: 10,
		paddingHorizontal: 20,
		display: 'flex',
		alignItems: 'center',
		marginTop: 20,
		alignSelf: 'flex-end',
		borderRadius: 10,
		flexDirection: 'row',
	},
	btnRemoveText: {
		color: '#ffffff',
		marginLeft: 8,
	},
	modalWrapper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		backgroundColor: 'rgba(27,42,60,0.72)',
	},
	modalContainer: {
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 15,
		maxWidth: '80%',
	},
	btnContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginTop: 20,
	},
	btnDelete: {
		color: '#f3383d',
	},
	btnCancel: {
		color: '#ffffff',
		backgroundColor: '#3c80ef',
		paddingVertical: 8,
		paddingHorizontal: 12,
		marginLeft: 14,
		borderRadius: 10,
	},
});

export default MovieCard;
