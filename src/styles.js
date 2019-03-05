import {Platform, StyleSheet, StatusBar} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        ...Platform.select({
            ios: {paddingTop: 20},
            android: {paddingTop: StatusBar.currentHeight}
        })
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
        backgroundColor: '#42A5F5',
        margin: 10,
        padding: 8,
        color: 'white',
        borderRadius: 14,
        fontSize: 18,
        fontWeight: '500',
    },
    qrCodeText: {
        color: 'white'
    }
});
