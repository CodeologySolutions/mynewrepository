import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
import { Constants } from './constants';

// This function should set the data to the local storage
export const saveDataToLocalStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        // addLog("Session Set Key:::> ", key)
        // addLog("Session Set Value:::> ", value)
        return true;
    } catch (error) {
      //  addLog(error)
        return error;
    }
};

// This function should fetch the data from the local storage
export const retrieveDataFromLocalStorage = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
             console.log("Session Get Key:::> ", key)
             console.log("Session Get Value:::> ", value);
            return value;
        }
    } catch (error) {
        //addLog(error)
        return error;
    }
};

// This function should fetch the data from the local storage
export const clearDataFromLocalStorage = async () => {
    try {
        const asyncStorageKeys = await AsyncStorage.getAllKeys();
        if (asyncStorageKeys.length > 0) {
            if (Platform.OS === 'android') {
                await AsyncStorage.clear();
            }
            if (Platform.OS === 'ios') {
                await AsyncStorage.multiRemove(asyncStorageKeys);
            }
        }
    } catch (error) {
        addLog(error)
        return error;
    }
}

