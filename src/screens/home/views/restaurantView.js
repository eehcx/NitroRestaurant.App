import React, { useEffect, useState } from 'react';
import { View, StatusBar, Text, ScrollView, SafeAreaView, Image } from 'react-native';

const RestaurantView = () => {

    return(
        <>
            <View className=" flex-1 justify-center items-center bg-indigo-200 h-screen w-screen" >
                <Text className="text-sm">Vistas en desarrollo</Text>
                <View className="flex-row mx-4">
                    <View className=" rounded-3xl mx-2 my-5 w-28 items-center">
                        <Image className="w-20 h-20" source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/nitro-restaurant.appspot.com/o/static%2FImages%2FMesas%20-%20Copy%401-1366x617%20(1).png?alt=media&token=8bb54961-3141-49a5-bac5-6b1525e5d654' }} />
                    </View>
                </View>
            </View>
        </>
    );
};

export default RestaurantView;