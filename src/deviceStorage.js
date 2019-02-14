import {AsyncStorage} from 'react-native';

const deviceStorage = {

    async saveItem(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
        }
    },

    async getItem(key) {
        try {
            let item = await AsyncStorage.getItem(key);
            return item;
        } catch (error) {
            console.log(error.message);
        }
    }

};

export default deviceStorage;
