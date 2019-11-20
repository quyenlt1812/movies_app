import React from 'react';
import { SearchBar } from './node_modules/react-native-elements';

class SearchBox extends React.Component {
	render() {
		return (
			<SearchBar
				placeholder="Type Here..."
				onChangeText={this.updateSearch}
				value={search}
			/>
		);
	}
}

export default SearchBox;
