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
    userWidgetBox: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        margin: 2,
        flex: 1,
        marginTop: '25%',
        marginBottom: '25%'
    },
    allWidgetBox: {
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
        width: '100%',
        height: 55,
        backgroundColor: 'black',
        margin: 5,
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
    toolbarButton: {
        width: 50,            //Step 2
        color: '#fff',
        textAlign: 'center'
    },
    headerBar: {
        marginTop: 40,
        height: 60,
        alignItems: 'center',
        flexDirection: 'row'
    },
    headerButton: {
        color: '#fff',
        textAlign: 'center'
    },
    headerTitle: {
        fontSize: 28,
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 1,
        justifyContent: 'center',
        color: 'white'
    },
    contentText: {
        fontSize: 18,
        textAlign: 'left',
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
    dragDropBottomMidContainer: {
        flex: 1
    },
    dragDropMidContainerText: {
        flex: 1,
        fontSize: 18,
        textAlign: 'left',
        justifyContent: 'center',
        color: 'white',
        padding: 5
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    widgetScrollView: {
        flex: 2
    },
    deleteZone: {
        flex: 1,
        backgroundColor: 'black',
        borderWidth: 2,
        borderColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    deleteZoneText: {
        color: 'red',
        fontWeight: '500',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 18
    },
    button: {
        color: 'black',
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 14,
        width: '100%',
        height: 55,
        margin: 5,
        display: 'flex',
        justifyContent: 'center'
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 18
    },
    faceIdText: {
        backgroundColor: 'white',
        color: 'black'
    },
    newsLinkContainer: {
        width: '100%',
        margin: 5,
        borderWidth: 1,
        borderColor: 'white',
        bottom: 0,
        height: '50%'
    },
    newsLinkItem: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'white',
        flex: 1,
        padding: 2,
        height: 55
    }
});
