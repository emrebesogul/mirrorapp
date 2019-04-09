import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import Settings from '../Settings';
import Wunderlist from '../Wunderlist';
import DragDropApp from '../DragDropApp';
import Weather from '../Weather';
import MenuDrawer from '../components/MenuDrawer';
import NewsFeedSettings from "../settings/NewsFeedSettings";
import Calendar from '../Calendar';
import DjangoConfig from '../DjangoConfig';


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
		NewsFeedSettings: {screen: NewsFeedSettings},
		Calendar: {screen: Calendar},
		DjangoConfig: {screen: DjangoConfig}
	},
	DrawerConfig,
	{
		initialRouteName: 'DragDropApp'
    },
	{
		drawerOpenRoute: 'DrawerOpen',
		drawerCloseRoute: 'DrawerClose',
		drawerToggleRoute: 'DrawerToggle'
	}
);

export default createAppContainer(DrawerNavigator);
