import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import Settings from '../Settings';
import Wunderlist from '../Wunderlist';
import DragDropApp from '../DragDropApp';
import Weather from '../Weather';
import Login from '../Login';

import MenuDrawer from '../components/MenuDrawer';

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
	drawerWidth: WIDTH*0.5,
	contentComponent: ({ navigation }) => {
		return(<MenuDrawer navigation={navigation} />)
	}
}

const DrawerNavigator =  createDrawerNavigator(
	{
		DragDropApp: {screen: DragDropApp},
	    Settings: {screen: Settings},
	    Wunderlist: {screen: Wunderlist},
		Weather: {screen: Weather},
		Login: {screen: Login}
	},
	DrawerConfig,
	{
		initialRouteName: 'DragDropApp',
		header: {
			visible: false,
		},
		navigationOptions: {
			headerMode: 'float'
		}
    }
);

export default createAppContainer(DrawerNavigator);
