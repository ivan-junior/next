import { Image, StyleSheet, View } from "react-native";
import { Button, Icon, Input, Text } from "@rneui/themed";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeData } from "../services/storeData";
import authenticate from "../apis/authenticate";
import { RootStackParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IAuthenticateResponse } from "../interfaces/authenticateResponse";

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>

export default function Login({navigation}: LoginScreenProps) {
    const [login, setLogin] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [company, setCompany] = useState<string>()
    const [isLoading, setLoading] = useState(false)
    const entrar = async () => {
        setLoading(true)
        const credentials: IAuthenticateResponse = await authenticate({login,password, company})
        if (credentials.accessToken != null && credentials.accessToken != undefined) {
            await storeData('TOKEN', credentials.accessToken)
            setLoading(false)
            navigation.navigate('Proposal')
        } else {
            alert('Não foi possível autenticar')
            setLoading(false)
        }
    }
    AsyncStorage.getItem('TOKEN').then((token) => {
        if (token !== null) {
            navigation.navigate('Proposal')
        }
    })
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/bluesol-logo.png')}
                style={styles.imgLogo}
            />
            <Text
                h2 
                style={{marginBottom: 50, color: 'white', fontWeight: '700'}}
            >
                NEXT
            </Text>
            <Input
                placeholder='Seu login'
                rightIcon={
                    <Icon
                        name='user'
                        size={24}
                        color='white'
                        type='font-awesome-5'
                    />
                }
                onChangeText={value => setLogin(value)}
                inputStyle={{color: 'white'}}
                inputContainerStyle={{borderColor: 'white'}}
                placeholderTextColor='white'
            />
            <Input
                placeholder='Sua senha'
                rightIcon={
                    <Icon
                        name='eye'
                        size={24}
                        color='white'
                        type='font-awesome'
                    />
                }
                onChangeText={value => setPassword(value)}
                inputStyle={{color: 'white'}}
                inputContainerStyle={{borderColor: 'white'}}
                placeholderTextColor='white'
                secureTextEntry={true}
            />
            <Input
                placeholder='Código da empresa'
                rightIcon={
                    <Icon
                        name='building-o'
                        size={24}
                        color='white'
                        type='font-awesome'
                    />
                }
                onChangeText={value => setCompany(value)}
                inputStyle={{color: 'white'}}
                inputContainerStyle={{borderColor: 'white'}}
                keyboardType='email-address'
                placeholderTextColor='white'
            />
            <Button
                title="ENTRAR"
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
                onPress={() => entrar() }
            />
        </View>
    )
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#2265db',
    alignItems: 'center',
    justifyContent: 'center'
},
imgLogo: {
    width: 200,
    height: 42,
    marginBottom: 50
}
});
