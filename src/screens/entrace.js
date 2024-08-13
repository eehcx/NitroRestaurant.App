import React from "react";
//REACT NATIVE Y TAILWIND CSS
import { View, ImageBackground, Text, TouchableOpacity, StatusBar } from 'react-native';
// React Navigation
import { useNavigation } from '@react-navigation/native';

export default InputScreen = () => {
    const navigation = useNavigation();
    
    return (
        <>
            <ImageBackground 
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/nitro-restaurant.appspot.com/o/static%2FImages%2Ffondo-nitro.png?alt=media&token=d07ba22f-6481-47a9-8996-f4c856b7b13e' }} 
                className="flex-1 bg-cover justify-center"
            >
                <StatusBar backgroundColor='#fafafa' barStyle="dark-content" />
                <View className="flex-1 justify-center">

                    <View className="absolute items-center">
                        <View className="flex-1 justify-center">
                            <View className="relative w-11/12 h-full top-2/3" >
                                <View className="w-full h-72">
                                    <Text className="text-5xl font-bold text-zinc-50 mb-5">Mastering the Kitchen Symphony</Text>
                                    <Text className="text-2xl text-zinc-50">Fluimos, simplificamos y agilizamos tu flujo.</Text>
                                </View>
                                <View className="flex-row justify-center h-12 mx-auto">
                                    <View className="w-2 h-2 rounded-full bg-zinc-50 mx-2" />
                                    <View className="w-2 h-2 rounded-full bg-zinc-50 mx-2" />
                                    <View className="w-2 h-2 rounded-full bg-zinc-50 mx-2" />
                                </View>
                            </View>
                        </View>
                        <View className="mt-56">
                            <View className="justify-center mx-10 my-8">
                                <TouchableOpacity className="bg-slate-200 px-24 py-4 rounded-full mx-4" onPress={()=> navigation.navigate('login')}>
                                    <Text className="font-bold text-indigo-800">DESBLOQUEAR</Text>
                                </TouchableOpacity>
                            </View>
                            <View className="items-center mb-2">
                                <Text className="text-zinc-50">Desarrollado por
                                    <Text className="font-bold tracking-widest" > NITRO™</Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </>
    );
};