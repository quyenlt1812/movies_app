import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import MovieList from '../MovieList';
import TopRated from '../TopRated';
import Favorite from '../Favorite';

export default createMaterialBottomTabNavigator(
	{
		NowPlaying: {
			screen: MovieList,
			navigationOptions: {
				title: 'Now Playing',
			},
		},
		TopRated: {
			screen: TopRated,
			navigationOptions: {
				title: 'Top Rated',
			},
		},
		Favorite: {
			screen: Favorite,
			navigationOptions: {},
		},
	},
	{
		initialRouteName: 'NowPlaying',
		activeColor: '#3c80ef',
		inactiveColor: '#8093a7',
		barStyle: { backgroundColor: '#ffffff' },
		labeled: true,
		visible: false,
	},
);
