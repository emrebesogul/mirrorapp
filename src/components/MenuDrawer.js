import React from 'react';
import {
	View,
	Text,
	Image,
	ScrollView,
	Platform,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

import {getUserData} from "../../api/get";

export default class MenuDrawer extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
            currentUser: "",
        };
    }

	async componentDidMount() {
        let response = await getUserData();
        if (response.status === true) {
            this.setState({
                currentUser: response.username
            });
        }
    }

	navLink(nav, text) {
		return(
			<TouchableOpacity style={{height: 50}} onPress={() => this.props.navigation.navigate(nav)}>
				<Text style={styles.link}>{text}</Text>
			</TouchableOpacity>
		)
	}

	render() {
		return(
			<View style={styles.container}>
				<ScrollView style={styles.scroller}>
					<View style={styles.topLinks}>
						<Text style={styles.name}>{this.state.currentUser}</Text>
					</View>
					<View style={styles.bottomLinks}>
						{this.navLink('DragDropApp', 'Home')}
						{this.navLink('Settings', 'Settings')}
						{this.navLink('Wunderlist', 'To Do List')}
						{this.navLink('Weather', 'Weather')}
					</View>
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'lightgray',
	},
	scroller: {
		flex: 1,
	},
	name: {
		fontSize: 20,
		paddingBottom: 5,
		color: 'white',
		textAlign: 'left',
	},
	imgView: {
		flex: 1,
		paddingLeft: 20,
		paddingRight: 20,
	},
	img: {
		height: 70,
		width: 70,
		borderRadius: 50,
	},
	topLinks:{
		alignItems: 'center',
		height: 80,
		backgroundColor: 'black',
		flexDirection: 'column',
		justifyContent: 'center',
	},
	bottomLinks: {
		flex: 1,
		backgroundColor: 'white',
		paddingTop: 10,
		paddingBottom: 450,
	},
	link: {
		flex: 1,
		fontSize: 20,
		padding: 6,
		paddingLeft: 14,
		margin: 5,
		textAlign: 'left',
	},
	footer: {
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
		borderTopWidth: 1,
		borderTopColor: 'lightgray'
	},
	version: {
		flex: 1,
		textAlign: 'right',
		marginRight: 20,
		color: 'gray'
	},
	description: {
		flex: 1,
		marginLeft: 20,
		fontSize: 16,
	}
})
