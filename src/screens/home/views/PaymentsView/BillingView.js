import React, { useEffect, useState } from 'react';
import { View, StatusBar, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Appbar, RadioButton, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Payments
// Firebase
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../../../config/firebase';
// Utils
import { capitalLetter } from '../../../../utils/helpers/capitalLetter';
import { CalcPercentage } from '../../../../utils/helpers/summaryCalc';
// Redux 
import { useSelector, useDispatch } from 'react-redux';
import { setPaymentMethod, setPaymentMethods } from '../../../../app/business/OrderSlice';

const RadioList = () => {
    const dispatch = useDispatch();
    const methods = useSelector(state => state.orders.PaymentMethods);
    const [checked, setChecked] = React.useState('PDaosgA00YrCtwg1cDml');

    const getIcon = (methods) => {

        switch (methods) {
            case 'tarjeta':
                return <Icon name="credit-card" size={24} color="#818cf8" />;
            case 'efectivo':
                return <Icon name="cash" size={24} color="#818cf8" />;
            default:
                return <Icon name="question" size={24} color="#818cf8" />;
        }
    };

    useEffect(() => {
        if (methods.length === 0) {
            const Query = query(collection(db, 'tipo_pagos'), orderBy('nombre'));

            const unsubscribe = onSnapshot(Query, (snapshot) => {
                const List = snapshot.docs.map(doc => {
                    const data = doc.data();
    
                    return {
                        id: doc.id,
                        ...data
                    };
                });
    
                dispatch(setPaymentMethods(List));
                console.log(methods);
            }, (error) => {
                console.error('Error al escuchar los tipos de pago:', error);
            });
    
            return () => {
                unsubscribe();
            };
        }
    }, []);

    return (
        <View className="bg-white w-5/6 h-32 rounded-3xl py-4">
            {methods.map((item, index) => (
                <View key={index}>
                    <View className="flex-row items-center mx-4 mb-2">
                        <View className="mr-2">
                            <RadioButton
                                color='#818cf8'
                                value={item.id}
                                status={ checked === item.id ? 'checked' : 'unchecked' } 
                                onPress={() => {
                                    setChecked(item.id);
                                    dispatch(setPaymentMethod(item.nombre));
                                }}
                            />
                        </View>
                        <View className="bg-indigo-100 p-2 rounded-xl mr-2">
                            {getIcon(item.nombre)}
                        </View>
                        <Text className="text-lg font-normal text-black mx-2">{capitalLetter(item.nombre)}</Text>
                    </View>
                    <Divider className="mb-2 bg-slate-100 mx-10" />
                </View>
            ))}
        </View>
    );
};

const BillingView = () => {
    // Navegación
    const navigation = useNavigation();
    // Detalles de las ordenes
    const order = useSelector(state => state.orders.receipt);
    const PaymentMethod = useSelector(state => state.orders.PaymentMethod);
    // useState
    const [TipPercentage, setTipPercentage] = useState(0);
    const [Percentage, setPercentage] = useState([10, 15, 20]);
    const [Tips, setTips] = useState(0);
    const [Fees, setFees] = useState(0);
    const [Total, setTotal] = useState(0);
    // Scroll
    const [isExtended, setIsExtended] = React.useState(false);
    const onScroll = ({ nativeEvent }) => { 
        const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; 
        setIsExtended(currentScrollPosition <= 0); 
    };

    const OrderSummary = (amount, percentage) => {
        const tipPercentage = percentage;
        const feePercentage = PaymentMethod === 'tarjeta' ? 0.80 : 0;
    
        const tipAmount = CalcPercentage(amount, tipPercentage);
        const feeAmount = CalcPercentage(amount, feePercentage);
    
        setTips(tipAmount);
        setFees(feeAmount);
    
        const totalAmount = (tipAmount + feeAmount + amount).toFixed(2);
        setTotal(totalAmount);
    };

    useEffect(() => {
        if (order && order.total) {
            OrderSummary(order.total, TipPercentage);
        }
    }, [order, TipPercentage, PaymentMethod]);

    return(
        <View className="bg-slate-100 w-full h-full">
            <StatusBar backgroundColor='#f1f5f9' barStyle="dark-content" />
            <Appbar.Header className="bg-slate-100" mode='small'>
                <Appbar.Action icon='chevron-left' size={28} color='#09090b' onPress={() => navigation.goBack()} />
                <Appbar.Content color='#09090b' title="Facturación" />
            </Appbar.Header>
            <SafeAreaView className="flex-grow">
                <ScrollView showsVerticalScrollIndicator={false} onScroll={onScroll}>
                    <View className="flex-row items-center mt-5 mx-10 mb-3">
                        <Text className="mx-4 text-lg font-semibold text-black">Métodos de pago</Text>
                    </View>
                    <View className="items-center">
                        <RadioList/>
                    </View>
                    <View className="mt-10 mx-10">
                        <Text className="mx-4 mb-4 text-lg font-semibold text-black">Resumen del Pedido</Text>
                    </View>
                    <View className="flex-1  items-center">
                        <View className="w-5/6 h-52 bg-white rounded-3xl">
                            <View className="flex-row justify-between px-10 mt-4 mb-3">
                                <Text className="font-semibold text-xl text-black">Subtotal</Text>
                                <Text className="font-semibold text-xl text-black">${order.total}</Text>
                            </View>
                            <View className="flex-row justify-between px-10">
                                <Text className="font-normal text-base text-black">Propina</Text>
                                <Text className="font-semibold text-base text-black">
                                    ${Tips === 0 ? '0.0' : Tips}
                                </Text>
                            </View>
                            <View className="flex-row justify-between px-10 mt-2 mb-3">
                                <Text className="font-normal text-base text-black">Tarifa de Servicio
                                </Text>
                                <Text className="font-semibold text-base text-black">
                                    ${Fees  === 0 ? '0.0' : Fees}
                                </Text>
                            </View>
                            <Divider className="bg-slate-200 mx-10" />
                            <View className="flex-row justify-between px-10 mt-5 mb-3">
                                <Text className="font-semibold text-2xl text-black">Total</Text>
                                <Text className="font-semibold text-2xl text-black">${Total}</Text>
                            </View>
                        </View>
                    </View>
                    <View className="flex-row mx-14 my-3 items-center">
                        <Text className="font-semibold text-xs text-black mr-5">Propina:</Text>
                        {Percentage.map((item, index) => (
                            <TouchableOpacity 
                                key={index} 
                                className="bg-indigo-200 mr-4 w-9 h-9 items-center justify-center rounded-full  shadow-md shadow-indigo-400"
                                onPress={() => {
                                    setTipPercentage(item);
                                }}
                            >
                                <Text className="text-xs font-bold text-indigo-500">{item}%</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
            <View className="items-center mb-4 mx-10 bg-transparent">
                <TouchableOpacity 
                    className="bg-indigo-900 h-14 w-full items-center justify-center rounded-full"
                >
                    <Text className="font-medium text-white">PROCEDER</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BillingView;