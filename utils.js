import deviceStorage from "./src/deviceStorage";
import {Alert} from "react-native";

export const showAlert = (type, message) => {
    Alert.alert(
        type,
        message,
        [
            {
                text: 'OK'
            }
        ],
        {cancelable: false}
    )
}

export const isURL = (str) => {
    var pattern = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi)
    return pattern.test(str);
}