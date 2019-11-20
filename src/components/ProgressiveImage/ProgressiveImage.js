import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class ProgressiveImage extends React.PureComponent {
	render() {
		const {
			thumbnailSource,
			source,
			style,
			rounded = false,
			...props
		} = this.props;
		return (
			<View style={{ ...styles.container, borderRadius: rounded ? 100 : 10 }}>
				<View style={[styles.thumb, style]}>
					<Icon name="image-off" size={rounded ? 25 : 60} color="#8093a7" />
				</View>

				<Image
					blurRadius={10}
					{...props}
					source={thumbnailSource}
					style={[styles.imageOverlay, style]}
				/>
				<Image
					{...props}
					source={source}
					style={[styles.imageOverlay, style]}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	imageOverlay: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		top: 0,
	},
	thumb: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: {
		backgroundColor: '#e1e4e8',
	},
});

export default ProgressiveImage;
