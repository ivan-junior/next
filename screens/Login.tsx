import { ActivityIndicator, Alert, Image, StyleSheet, View } from "react-native";
import { Button, Icon, Input, Text } from "@rneui/themed";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeData } from "../services/storeData";
import authenticate from "../apis/authenticate";
import { RootStackParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IAuthenticateResponse } from "../interfaces/authenticateResponse";
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold } from "@expo-google-fonts/montserrat";

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>


//Avoiding the "Can't perform a React state update on an unmounted component"
//For more information about this, please visit https://github.com/facebook/react/pull/22114#issuecomment-900721521
//Huges thanks to 
const KNOWN_VIOLATIONS = [
    `Warning: Can't perform a React state update on an unmounted`
]
const configureConsoleError = (silenceKnownErrors = true): void => {
    if (silenceKnownErrors) {
        const oldError = console.error
        console.error = (...args) => {
            const firstArg = args[0]
            if (typeof firstArg === 'string' && KNOWN_VIOLATIONS.some((v) => firstArg.includes(v))) {
                return
            }
            oldError(...args)
        }
    }
}
configureConsoleError()

export default function Login({navigation}: LoginScreenProps) {
    const [isLoading, setLoading] = useState(true)
    const [login, setLogin] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [company, setCompany] = useState<string>()
    const [isLoadingBtn, setLoadingBtn] = useState(false)
    const [showPassword, setShowPassword] = useState(true)
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_500Medium, 
        Montserrat_600SemiBold,
        Montserrat_700Bold
    })
    const entrar = async () => {
        setLoadingBtn(true)
        const credentials: IAuthenticateResponse = await authenticate({login,password, company})
        if (credentials.accessToken != null && credentials.accessToken != undefined) {
            await storeData('TOKEN', credentials.accessToken)
            setLoadingBtn(false)
            navigation.reset({
                index: 0,
                routes:[{name: 'Home'}]
            })
        } else {
            Alert.alert('Não foi possível autenticar')
            setLoadingBtn(false)
        }
    }
    useEffect(() => {
        async function getToken() {
            try {
                let token = await AsyncStorage.getItem('TOKEN')
                if (token != null && token != undefined) {
                    navigation.reset({
                        index: 0,
                        routes:[{name: 'Home'}]
                    })
                }
            } catch(e) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        }
        getToken()
    }, [])
    if (!fontsLoaded) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size={'large'} color='white' />
            </View>
        )
    }
    return (
        <>
            {
                isLoading
                    ?
                        <View style={styles.container}>
                            <ActivityIndicator size={'large'} color='white' />
                        </View>
                    :
                        <View style={styles.container}>
                            <Image
                                source={require('../assets/bluesol-logo.png')}
                                style={styles.imgLogo}
                            />
                            <Text
                                style={{marginBottom: 35, color: 'white', fontFamily: 'Montserrat_700Bold', fontSize: 30}}
                            >
                                Bem vindo à NEXT
                            </Text>
                            <Input
                                placeholder='Seu login'
                                rightIcon={
                                    <Icon
                                        name='user'
                                        size={30}
                                        color='white'
                                        type='font-awesome-5'
                                        style={{paddingRight: 15}}
                                    />
                                }
                                onChangeText={value => setLogin(value)}
                                inputStyle={{color: 'white', fontFamily: 'Montserrat_600SemiBold'}}
                                inputContainerStyle={styles.inputContainerStyle}
                                placeholderTextColor='white'
                            />
                            <Input
                                placeholder='Sua senha'
                                rightIcon={
                                    <Icon
                                        name='eye'
                                        size={30}
                                        color='white'
                                        type='font-awesome'
                                        style={{paddingRight: 15}}
                                        onPress={() => setShowPassword(!showPassword)}
                                    />
                                }
                                onChangeText={value => setPassword(value)}
                                inputStyle={{color: 'white', fontFamily: 'Montserrat_600SemiBold'}}
                                inputContainerStyle={styles.inputContainerStyle}
                                placeholderTextColor='white'
                                secureTextEntry={showPassword}
                                
                            />
                            <Input
                                placeholder='Código da empresa'
                                rightIcon={
                                    <Icon
                                        name='building-o'
                                        size={30}
                                        color='white'
                                        type='font-awesome'
                                        style={{paddingRight: 15}}
                                    />
                                }
                                onChangeText={value => setCompany(value)}
                                inputStyle={{color: 'white', fontFamily: 'Montserrat_600SemiBold'}}
                                inputContainerStyle={styles.inputContainerStyle}
                                keyboardType='email-address'
                                placeholderTextColor='white'
                            />
                            <Button
                                title="ENTRAR"
                                loading={isLoadingBtn}
                                loadingProps={{ color: '#054E7D' }}
                                
                                buttonStyle={{
                                    backgroundColor: '#f9b51b',
                                    borderRadius: 7,
                                    height: 70,
                                }}
                                titleStyle={{ fontSize: 24, fontFamily: 'Montserrat_700Bold' }}
                                containerStyle={{
                                    marginTop: 10,
                                    width: '100%',
                                    paddingLeft: 10,
                                    paddingRight: 10
                                }}
                                onPress={() => entrar() }
                            />
                        </View>
            }
        </>
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
        marginBottom: 35
    },
    inputContainerStyle: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 7, 
        marginTop: 5,
        paddingLeft: 10,
        height: 80,
        borderColor: 'white'
    },
});
