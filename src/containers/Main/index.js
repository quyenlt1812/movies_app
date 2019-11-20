import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MovieList from '../MovieList';
import TopRated from '../TopRated';
import Favorite from '../Favorite';

export default createMaterialBottomTabNavigator(
	{
		NowPlaying: {
			screen: MovieList,
			navigationOptions: {
				title: 'Now Playing',
				tabBarIcon: ({ tintColor }) => (
					<Icon name="access-point" size={27} color={tintColor} />
				),
			},
		},
		TopRated: {
			screen: TopRated,
			navigationOptions: {
				title: 'Top Rated',
				tabBarIcon: ({ tintColor }) => (
					<Icon name="star" size={24} color={tintColor} />
				),
			},
		},
		Favorite: {
			screen: Favorite,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<Icon name="heart" size={22} color={tintColor} />
				),
			},
		},
	},
	{
		shifting: true,
		initialRouteName: 'NowPlaying',
		activeColor: '#3c80ef',
		inactiveColor: '#8093a7',
		barStyle: { backgroundColor: '#ffffff' },
		labeled: true,
		visible: false,
	},
);
