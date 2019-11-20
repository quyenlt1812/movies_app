import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = ({ children }) => <View style={styles.container}>{children}</View>;

const styles = StyleSheet.create({
	container: {
		padding: 20,
		marginVertical: 10,
		marginHorizontal: 15,
		backgroundColor: '#ffffff',
		borderRadius: 10,
		shadowColor: 'rgba(195, 210, 225, 0.65)',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.8,
		shadowRadius: 5,
		elevation: 5,
	},
});

export default Card;
