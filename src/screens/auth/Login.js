import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Image, View, ScrollView, SafeAreaView } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Firebase dependencias e importaciones
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../config/firebase';
// Componentes
import PasswordInput from '../../components/interface/PasswordInput';
// Redux
import { useDispatch } from 'react-redux';
import { addUser } from '../../app/user/userSlice';

export default LoginScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handlePasswordChange = (text) => { setPassword(text); };

    const [isExtended, setIsExtended] = React.useState(false);
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; 
        setIsExtended(currentScrollPosition <= 0); 
    };

    const handleLogin = async () => {
        const isEmpty = !Email?.trim() || !password?.trim(); 
        if (isEmpty) {
            console.error("Error: Campos de correo electrónico o contraseña vacíos");
            return;
        }
        try {
            const userCredential = await signInWithEmailAndPassword(auth, Email, password);
            const user = userCredential.user;

            const idTokenResult = await user.getIdTokenResult(true); 
            const claims = idTokenResult.claims;
            const isEmployee = claims && claims.rol === "empleado";
            const rol = claims.rol;
            const displayName = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;
            const uid = user.uid;
            const userData = {status: true, displayName: displayName, rol: rol, email: email, photoURL: photoURL, uid: uid}

            dispatch(addUser(userData));

            setEmail('');
            setPassword('');
            navigation.navigate('main');

            if (isEmployee) {
                //console.log("Usuario empleado: ", user);
            } else {
                console.log("Usuario no es empleado");
            }
        } catch (error) {
            console.error('Error al loggear usuario:', error);
        }
    };

    return (
        <>
            <View className="flex-1 bg-gray-100">
                <Image className='h-1/3 w-screen rounded-b-3xl' source={{uri:'https://firebasestorage.googleapis.com/v0/b/nitro-restaurant.appspot.com/o/static%2FImages%2Fcafeteria-gente.jpeg?alt=media&token=2e97cd48-8b4d-4165-bf64-bb5ea890d099'}} />
                <SafeAreaView>
                    <ScrollView onScroll={onScroll} showsVerticalScrollIndicator={false}>
                        <View className="w-screen h-screen py-10">
                            <View className="items-center">
                                <Text className="text-3xl font-semibold mb-5 text-zinc-800">Iniciar sesión</Text>
                                <Divider className="h-1 w-14 rounded-full bg-indigo-700" />
                            </View>
                            <View className="mx-4 my-4 items-center">
                                <View className="my-5 mx-10">
                                    <View className="flex-row items-center justify-center">
                                        <View className="px-2 py-1 mb-5">
                                            <Icon name='at' size={23} color="#bababa" />
                                        </View>
                                        <TextInput className="w-11/12 h-12 bg-gray-100 text-base rounded-xl px-5 mb-3" placeholder="Correo electrónico" keyboardType="email-address" maxLength={100} value={Email} onChangeText={setEmail} />
                                    </View>
                                    <Divider className="h-px w-80 bg-gray-300" />
                                </View>
                                <PasswordInput placeholder="Ingresar contraseña" onPasswordChange={handlePasswordChange} passwordValue={password} />
                                <TouchableOpacity className="w-full px-11">
                                    <Text className="text-sm font-bold text-indigo-400 text-right">¿Olvidaste la contraseña?</Text>
                                </TouchableOpacity>
                            </View>
                            <View className="items-center justify-center my-12">
                                <TouchableOpacity className="bg-indigo-800 mt-2 w-72 h-14 justify-center items-center rounded-full" onPress={handleLogin}>
                                    <Text className="font-bold text-slate-200">INGRESAR</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View> 
        </>   
    );
}