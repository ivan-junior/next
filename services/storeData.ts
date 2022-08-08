import AsyncStorage from "@react-native-async-storage/async-storage"

export const storeData = async (keyName: string, value: string) => {
    try {
        await AsyncStorage.setItem(keyName, value)
    } catch (error) {
        console.log(error)
    }
}