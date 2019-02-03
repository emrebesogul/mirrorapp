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
    }
});
