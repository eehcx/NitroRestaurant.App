// redirect.js
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
// Redux
import { useSelector } from 'react-redux';
// Firebase
import { auth } from '../../config/firebase';

export default LoadingScreen = () => {
    const navigation = useNavigation();
    const [isCheckingLogin, setIsCheckingLogin] = useState(true);
    const status = useSelector(state => state.user.status);

    const checkLoginState = async () => {
        try {
            if (!status) {
                navigation.replace('auth');
            } else {
                navigation.replace('main');
            }
        } catch (error) {
            console.log('Error al verificar el estado de inicio de sesión:', error);
            navigation.replace('entrace');
        } finally {
            setIsCheckingLogin(false);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                //console.log("Usuario autenticado:", user.uid);
                navigation.navigate('main');
            } else {
                //console.log("Usuario no autenticado o sesión expirada");
                navigation.navigate('auth');
            }
        });

        return () => unsubscribe();
    }, [navigation]);

    return (
        <>
            <View className="bg-slate-50 flex-1 justify-center items-center">
                {isCheckingLogin && <ActivityIndicator size="large" color='#E2E8F0' />}
            </View>
        </>
    );
};