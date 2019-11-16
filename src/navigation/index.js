import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MovieList from '../containers/MovieList';

const AppNavigator = createStackNavigator({
	MovieList: {
		screen: MovieList,
	},
});

export default createAppContainer(AppNavigator);
