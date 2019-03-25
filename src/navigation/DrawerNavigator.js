import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import Settings from '../Settings';
import Wunderlist from '../Wunderlist';
import DragDropApp from '../DragDropApp';
import Weather from '../Weather';
import Login from '../Login';
import Register from '../Register';
import InitializingQR from '../InitializingQR';

import MenuDrawer from '../components/MenuDrawer';

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
	drawerWidth: WIDTH*0.63,
	contentComponent: ({ navigation }) => {
		return(<MenuDrawer navigation={navigation} />)
	}
}

const DrawerNavigator = createDrawerNavigator(
	{
		DragDropApp: {screen: DragDropApp},
	    Settings: {screen: Settings},
	    Wunderlist: {screen: Wunderlist},
		Weather: {screen: Weather},
		InitializingQR: {screen: InitializingQR},
		Login: {screen: Login},
		Register: {screen: Register}
	},
	DrawerConfig,
	{
		initialRouteName: 'DragDropApp'
    }
);

export default createAppContainer(DrawerNavigator);
