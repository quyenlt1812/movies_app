import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import InfoTab from './InfoTab';
import CastTab from './CastTab';

const ROUTES = [
	{ key: 'info', title: 'Info' },
	{ key: 'case', title: 'Cast' },
];

const FirstRoute = () => (
	<View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);

const SecondRoute = () => (
	<View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

const Tabs = () => {
	const [selectedTab, setSelectedTab] = useState(0);
	return (
		<TabView
			navigationState={{
				index: selectedTab,
				routes: ROUTES,
			}}
			renderScene={SceneMap({
				info: FirstRoute,
				casts: SecondRoute,
			})}
			onIndexChange={index => setSelectedTab(index)}
			initialLayout={{ width: Dimensions.get('window').width }}
		/>
	);
};

const styles = StyleSheet.create({
	scene: {
		flex: 1,
	},
});

export default Tabs;
