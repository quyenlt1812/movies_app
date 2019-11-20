import React from 'react';
import { ActivityIndicator } from 'react-native-paper';

const Loading = ({ color = '#8093a7', size = 'large' }) => (
	<ActivityIndicator color={color} size={size} />
);

export default Loading;
