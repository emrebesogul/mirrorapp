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
                currentUser: response.user_data.username
            });
        }
    }

	render() {
		return(
			<View style={styles.container}>
				<ScrollView style={styles.scroller}>
					<View style={styles.topLinks}>
						<Text style={styles.name}>{this.state.currentUser}</Text>
					</View>
					<View style={styles.bottomLinks}>
						<TouchableOpacity style={{height: 50}} onPress={() => this.props.navigation.navigate('DragDropApp')}>
							<Text style={styles.link}>Home</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{height: 50}} onPress={() => this.props.navigation.navigate('Settings')}>
							<Text style={styles.link}>Settings</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{height: 50}} onPress={() => this.props.navigation.navigate('Calendar')}>
							<Text style={styles.link}>Calendar</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{height: 50}} onPress={() => this.props.navigation.navigate('NewsFeedSettings')}>
							<Text style={styles.link}>News Feed</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{height: 50}} onPress={() => this.props.navigation.navigate('Weather')}>
							<Text style={styles.link}>Weather</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{height: 50}} onPress={() => this.props.navigation.navigate('Wunderlist')}>
							<Text style={styles.link}>Wunderlist</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
				<View style={styles.footer}>
					<Text style={styles.description}>Smart Mirror App</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
	},
	scroller: {
		flex: 1,
		paddingTop: 50
	},
	name: {
		fontSize: 20,
		color: 'white',
		textAlign: 'center',
	},
	topLinks:{
		alignItems: 'center',
		height: 60,
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
		alignItems: 'center',
		backgroundColor: 'white',
		borderTopWidth: 1,
		borderTopColor: 'black'
	},
	description: {
		flex: 1,
		paddingTop: 10,
		fontSize: 16,
	}
})
