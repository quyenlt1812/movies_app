import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { searchMovies } from '../../api/helpers';
import SearchItem from '../SearchItem';

class SearchBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			results: [],
			loading: false,
		};
	}

	_updateSearch = search => {
		this.setState(
			{
				search,
				loading: search.length > 0 ? true : false,
			},
			() => {
				if (this.state.search.length > 0) {
					setTimeout(this._fetchResult, 1000);
				}
			},
		);
	};

	_fetchResult = async () => {
		try {
			const { search } = this.state;
			const data = await searchMovies(search);
			console.log('TCL: _fetchResult -> data', data);
			if (data.results.length) {
				this.setState({ results: data.results, loading: false });
			}
		} catch (error) {
			this.setState({ results: 'Nothing founds', loading: false });
		}
	};

	render() {
		const { search, results, loading } = this.state;
		console.log('TCL: render -> results', results);
		return (
			<View style={styles.searchContainer}>
				<SearchBar
					round
					lightTheme
					showCancel
					showLoading={loading}
					placeholder="Type Here..."
					onChangeText={this._updateSearch}
					value={search}
					containerStyle={styles.container}
					inputContainerStyle={styles.input}
				/>
				{search.length > 0 && (
					<View style={styles.resultsContainer}>
						{typeof results === 'string' ? (
							<Text>Nothing founds</Text>
						) : (
							<FlatList
								contentContainerStyle={{
									flexDirection: 'column',
									width: '100%',
								}}
								data={results}
								keyExtractor={item => item.id.toString()}
								renderItem={({ item }) => <SearchItem movie={item} />}
							/>
						)}
					</View>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#ffffff',
		borderColor: '#ffffff',
		paddingTop: 50,
		paddingHorizontal: 10,
	},
	input: {
		backgroundColor: '#f2f6fa',
	},
	searchContainer: {
		position: 'relative',
	},
	resultsContainer: {
		position: 'absolute',
		top: '100%',
		left: 0,
		height: 300,
		backgroundColor: '#ffffff',
		width: '100%',
		shadowColor: 'rgba(195, 210, 225, 0.65)',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.8,
		shadowRadius: 5,
		elevation: 5,
		borderBottomEndRadius: 10,
		borderBottomStartRadius: 10,
	},
});

export default SearchBox;
