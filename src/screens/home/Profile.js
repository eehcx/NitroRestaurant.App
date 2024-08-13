import React, { useState, useEffect } from 'react';
import { Card, Button, Divider, Appbar  } from 'react-native-paper';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
// Firebase Auth
import { app } from '../../config/firebase';
import { signOut, getAuth } from "firebase/auth";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Componentes
import ModalAlert from '../../components/layouts/ModalAlert';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/actions';
import { persistor } from '../../store/store';

const CardInfo = () => {
    dispatch = useDispatch();
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);

    const handleModal = async () => {
        try {
            setModalVisible(true);
        } catch (error) {
            console.log('Error al abir el modal', error);
        }
    };

    const handleClose = async () => {
        setModalVisible(false);
    };

    const handleLogout = async () => {
        const auth = getAuth(app);
        try {
            await signOut(auth);
            dispatch(logout());
            persistor.purge();
            navigation.navigate('auth');
        } catch (error) {
        console.log('Error al cerrar sesión:', error);
        }
    };

    return(
        <SafeAreaView>
            {isModalVisible && <ModalAlert visible={isModalVisible} title='Cerrar sesión' message="¿Seguro que desea cerrar sesión?" button='LOGOUT' onPress={()=> handleLogout()} close={handleClose} />}
            <ScrollView>
                <View className=" pb-14">
                    <Card.Content>
                        <TouchableOpacity style={styles.box} className="flex-row items-center justify-between p-5 bg-slate-100 mt-8 mb-8 mx-5 rounded-2xl">
                            <View className="flex-row items-center" >
                                <Text className="font-semibold text-lg text-black">Configuración</Text>
                            </View>
                            <Icon name="chevron-right" size={30} color='#000000' />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.box} className="flex-row items-center justify-between p-5 bg-slate-100 mb-8 mx-5 rounded-2xl">
                            <View className="flex-row items-center" >
                                <Text className="font-semibold text-lg text-black">FAQ'S</Text>
                            </View>
                            <Icon name="chevron-right" size={30} color='#000000' />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.box} className="flex-row items-center justify-between p-5 bg-slate-100 mb-8 mx-5 rounded-2xl">
                            <View className="flex-row items-center" >
                                <Text className="font-semibold text-lg text-black">Ayuda</Text>
                            </View>
                            <Icon name="chevron-right" size={30} color='#000000' />
                        </TouchableOpacity>
                    </Card.Content>
                    <TouchableOpacity className="bg-indigo-800 flex-row items-center justify-center h-14 mx-10 mt-5 rounded-full" onPress={()=> handleModal()}>
                        <Text className="text-indigo-100 font-medium text-base">LOGOUT</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileScreen = () => {
    const user = useSelector(state => state.user);
    const navigation = useNavigation();

    function capitalLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    return (
        <View className="flex-1 bg-slate-50">
            <StatusBar backgroundColor='#f8fafc' barStyle="dark-content" />
            <Appbar.Header style={{ backgroundColor: '#f8fafc'}} mode='center-aligned'>
                <Appbar.Action icon='chevron-left' size={28} color='#09090b' onPress={() => navigation.goBack()} />
                <Appbar.Content color='#000' title="Perfil" />
            </Appbar.Header>

            <View className="flex-row justify-between mx-12 my-3">
                <Text className="font-bold text-lg text-black">Datos</Text>
                <TouchableOpacity>
                    <Text className="font-normal text-base text-indigo-500">Cambiar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.box} className="flex-row justify-center h-1/5 w-4/5 mx-10 rounded-2xl bg-slate-100">
                <Image className="h-24 w-24 rounded-xl my-5" source={{uri: user.photoURL || 'https://i.pinimg.com/280x280_RS/ed/d5/56/edd5560fdc7e7dd87756f75b70b469f5.jpg'}} />
                <View className="mt-3 mx-1">
                    <Text className="text-xl m-3 font-medium text-gray-800">{user.displayName}</Text>
                    <Text className="text-sm mx-4 mb-1 font-medium text-gray-400">{user.email}</Text>
                    <Divider className="h-px bg-slate-200 mx-3 rounded-full" />
                    <Text className="text-sm mx-4 mt-1 font-medium text-gray-400">
                        {'Rol: ' + capitalLetter(user.rol)}
                    </Text>
                </View>
            </View>
            <CardInfo />
        </View>
    );
};

const styles = StyleSheet.create({
    box: {
        borderRadius: 10, 
        shadowColor: '#a3a3a3',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 2, 
        elevation: 6,
    },
});