import React, { useEffect, useState } from 'react';
import { View, StatusBar, Text} from 'react-native';
import { Appbar } from 'react-native-paper';
// React Navigation
import { useNavigation } from '@react-navigation/native';

const PaymentsView = () => {
    const navigation = useNavigation();

    return(
        <View className="bg-slate-50 w-full h-full">
            <Appbar.Header className="mt-1 mb-5 bg-slate-50" mode='small'>
                <Appbar.Action icon='chevron-left' size={28} color='#09090b' onPress={() => navigation.goBack()} />
                <Appbar.Content color='#09090b' title="Avisos internos" />
            </Appbar.Header>
            <View className="mx-7">
                <Text>Hola</Text>
            </View>
        </View>
    );
};

export default PaymentsView;