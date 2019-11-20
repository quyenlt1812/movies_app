import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

class ProgressiveImage extends React.PureComponent {
	render() {
		const { thumbnailSource, source, style, ...props } = this.props;
		return (
			<View style={styles.container}>
				<Image
					blurRadius={10}
					{...props}
					source={thumbnailSource}
					style={style}
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
	container: {
		backgroundColor: '#e1e4e8',
	},
});

export default ProgressiveImage;
