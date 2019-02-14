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