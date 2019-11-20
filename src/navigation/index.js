import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Main from '../containers/Main';
import MovieDetail from '../containers/MovieDetail';
import SearchBox from '../components/SearchBox';

const AppNavigator = createStackNavigator({
	Main: {
		screen: Main,
		navigationOptions: {
			header: <SearchBox />,
		},
	},
	MovieDetail: {
		screen: MovieDetail,
	},
});

export default createAppContainer(AppNavigator);
