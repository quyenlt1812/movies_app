import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

class MovieList extends React.Component {
	render() {
		return (
			<SafeAreaView style={styles.container}>
				<View>
					<Text>This is a movie list page</Text>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default MovieList;
