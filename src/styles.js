import {Platform, StyleSheet, StatusBar, Dimensions} from 'react-native';

const WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        backgroundColor: 'black',
        height: '100%'
    },
    boxText: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold"
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        margin: 2,
        flex: 1
    },
    draggableContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
        width: '100%',
        height: '100%'
    },
    draggableContentDragging: {
        justifyContent: 'center',
        alignItems: 'center'
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
        borderColor: 'white',
        borderWidth: 1
    },
    qrCodeText: {
        color: 'white'
    },
    initializing: {
        backgroundColor: 'black',
        fontSize: 28,
        height: '100%',
        paddingTop: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    initializingText: {
        fontSize: 18,
        color: 'white'
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
        backgroundColor: 'black',
        marginTop: 40,
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
        justifyContent: 'center',
        color: 'white'
    },
    contentText: {
        fontSize: 16,
        color: 'black',
        textAlign:'center',
        justifyContent: 'center',
        color: 'white',
        padding: 5
    },
    content: {
        marginTop: 40,
        color: 'white',
        padding: 10,
        alignItems: 'center'
    },
    contentQR: {
        alignItems: 'center',
        marginTop: 40,
        color: 'white',
        padding: 10
    },
    dragDropContent: {
        marginTop: 40,
        flex: 1
    },
    dragDropContainer: {
        flex: 1,
        flexDirection: "column",
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    dragDropMidContainer: {
        flex: 2
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    widgetScrollView: {
        flex: 1
    },
    deleteZone: {
        flex: 1,
        backgroundColor: 'red'
    }
});
