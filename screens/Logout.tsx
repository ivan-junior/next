import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "@rneui/themed";
import React, { useState } from "react";
import { View } from "react-native";
import { RootStackParamList } from "../types";

type LogoutScreenProps = NativeStackScreenProps<RootStackParamList, 'Logout'>

export const LogoutScreen: React.FC<LogoutScreenProps> = (props) => {
    const [isLoading, setLoading] = useState(false)
    const logout = () => {
        setLoading(true)
        AsyncStorage.removeItem('TOKEN').then(() => {
            setLoading(false)
            props.navigation.navigate('Login')
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Button
                title="SAIR"
                loading={isLoading}
                loadingProps={{ color: '#054E7D' }}
                
                buttonStyle={{
                    backgroundColor: '#f9b51b',
                    borderRadius: 5,
                }}
                titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
                containerStyle={{
                    marginHorizontal: 50,
                    height: 50,
                    width: 200,
                    marginVertical: 10,
                    marginTop: 50
                }}
                onPress={() => logout()}
            />
        </View>
    )
}