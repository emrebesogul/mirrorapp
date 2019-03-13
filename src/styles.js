import {Platform, StyleSheet, StatusBar, Dimensions} from 'react-native';

const WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginTop: 40
    },
    ballContainer: {
        height: 200
    },
    row: {
        flexDirection: "row",
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    boxText: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        borderWidth: 2,
        borderColor: 'white',
        margin: 5
    },
    draggableContent: {
        height: 80,
        width: 80,
    },
    dropZoneContent: {
        width: 80,
        height: 80
    },
    welcome: {
        fontSize: 28
    },
    stretch: {
        width: 200,
        height: 200
    },
    input: {
        width: 350,
        height: 55,
        backgroundColor: 'black',
        margin: 10,
        padding: 8,
        color: 'white',
        borderRadius: 14,
        fontSize: 18,
        fontWeight: '500',
    },
    qrCodeText: {
        color: 'white'
    },
    initializing: {
        fontSize: 28,
        paddingTop: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    initializingText: {
        fontSize: 18,
    },
    lrScreen: {
        paddingTop: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lrtext: {
        fontSize: 28,
        bottom: 50
    },
    toolbarButton:{
        width: 50,            //Step 2
        color:'#fff',
        textAlign:'center'
    },
    headerBar: {
        height: 60,
        alignItems: 'center',
        flexDirection: 'row'
    },
    headerButton:{
        color:'#fff',
        textAlign:'center'
    },
    headerTitle: {
        fontSize: 28,
        color: 'black',
        textAlign:'center',
        fontWeight:'bold',
        flex: 1,
        justifyContent: 'center'
    },
    contentText: {
        fontSize: 16,
        color: 'black',
        textAlign:'center',
        justifyContent: 'center'
    },
    content: {
        marginTop: 40
    }
});
