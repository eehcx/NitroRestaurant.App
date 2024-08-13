import React, { useEffect, useState } from 'react';
import {Modal, Text, View, TouchableWithoutFeedback, ScrollView} from 'react-native';
import { Divider, Button } from 'react-native-paper';
// React Navigation
import { useNavigation } from '@react-navigation/native';

export default ReceiptModal = ({ visible, products_detail, onPress, close }) => {
    const navigation = useNavigation();

    const [isExtended, setIsExtended] = React.useState(false);
    const onScroll = ({ nativeEvent }) => { 
        const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; 
        setIsExtended(currentScrollPosition <= 0); 
    };

    return (
        <>
            <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={close} >
                <TouchableWithoutFeedback onPress={close}>
                    <View style={{backgroundColor: 'rgba(245, 245, 245, 0.5)'}} className='flex-1 justify-center items-center'>
                        <TouchableWithoutFeedback>
                            <View className='bg-white mx-5 rounded-3xl  w-3/4 h-2/5 shadow-2xl shadow-slate-300'>
                                <View className="bg-indigo-100 rounded-tl-3xl rounded-tr-3xl w-full h-12 pl-7 place-items-start justify-center">
                                    <Text className="text-indigo-950 font-medium text-base">Recibo</Text>
                                </View>
                                <View className="flex-row justify-between mx-5 mt-3 mb-1">
                                    <Text className="text-xs">NOMBRE</Text>
                                    <Text className="text-xs">CANTIDAD</Text>
                                    <Text className="text-xs">PRECIO</Text>
                                </View>
                                <ScrollView className="flex-1 w-full h-full" onScroll={onScroll} showsVerticalScrollIndicator={false}>
                                    {products_detail.map((item, index) => (
                                        <View key={index}>
                                            <View className="flex-row mx-5 my-1 justify-between">
                                                <Text className="flex-1 text-black text-base">{item.producto}</Text>
                                                <Text className="w-32 text-center text-black text-base">{item.cantidad}</Text>
                                                <Text className="w-16 text-right text-black text-base">{item.precio}</Text>
                                            </View>
                                            <Divider className="h-px mx-5 bg-slate-200" />
                                        </View>
                                    ))}
                                </ScrollView>
                                <View className='flex-row mb-5 items-center justify-center'>
                                    <Button className='w-2/5 h-11 rounded-full items-center justify-center bg-white' textColor='#404040'  mode="contained" onPress={close}>Cancelar</Button>
                                    <Button className='w-2/5 h-11 rounded-full items-center justify-center bg-indigo-900' mode="contained"  onPress={onPress}>Pagar</Button>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
};