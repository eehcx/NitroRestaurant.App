import React, { useState, useEffect } from 'react';
import {Text, View, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, StyleSheet, Image} from 'react-native';
import { Divider, Appbar, PaperProvider, RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// Componentes
import ItemOrder from '../../../../components/common/ItemList/ItemOrder';
import ArrowNavigator from '../../../../components/interface/Filters/ArrowNavigator';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Firebase
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../../../config/firebase';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectOrderTotal, clear } from '../../../../app/business/OrderSlice';
import { CurrentTable, CurrentTableId } from '../../../../app/business/BusinessSlice';

const RadioList = ({title, value, status, onPress}) => {
    return (
        <>
            <View className="flex-row mx-4 my-3">
                <RadioButton
                    color='#818cf8'
                    value={value}
                    status={status}
                    onPress={onPress}
                />
                <Text className="text-lg font-normal text-black mx-2">{title}</Text>
            </View>
            <Divider className="mb-1 bg-slate-200 mx-14" />
        </>
    );
};

const ItemDetail = () => {
    const List = useSelector(state => state.orders.order_detail);
    return (
        <View style={styles.box} className="bg-indigo-200 w-full rounded-3xl p-1 mt-4">
            <ArrowNavigator />
            <Divider className="my-1 bg-indigo-300 mx-5" />
            <View className="mx-4 my-4"> 
                <View className="flex-row ">
                    <View className="w-10 h-10 items-center justify-center rounded-lg bg-indigo-300 bg-opacity-25">
                        <Icon name="clock-fast" size={24} color='#3730a3' />
                    </View>
                    <Text className="px-6 py-1 font-medium text-lg text-indigo-900">30 mins</Text>
                    <View className="w-10 h-10 items-center justify-center rounded-lg bg-indigo-300 bg-opacity-25">
                        <Icon name="food-outline" size={24} color='#3730a3' />
                    </View>
                    <Text className="px-6 py-1 font-medium text-lg text-indigo-900">{List.length + " platos"}</Text>
                </View>
            </View>
        </View>
    );
};

const CheckoutScreen = () => {
    const [orderTypes, setOrderTypes] = useState([]);
    // Estate
    const [current, setCurrent] = useState(1);
    const [label, setLabel] = useState('SIGUIENTE');
    //
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const List = useSelector(state => state.orders.order_detail);
    const BranchId = useSelector((state) => state.business.BranchId);
    const handleNext = () => { 
        setCurrent(current + 1);
        setLabel("ENVIAR");
    };
    const [checked, setChecked] = React.useState('EDWISXhBpiSlabKBVRCA');
    const order = List.length;
    const total = useSelector(selectOrderTotal);
    const Table = useSelector(CurrentTable).replace(/\D+/g, "");
    const TableId = useSelector(CurrentTableId); 
    // Hooks para el estado del scroll
    const [isExtended, setIsExtended] = React.useState(false);
    const onScroll = ({ nativeEvent }) => { 
        const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; 
        setIsExtended(currentScrollPosition <= 0); 
    };

    const handleSave = async () => {
        const OrderTotal = parseInt(total, 2);
        const detalle_pedido = List.map(item => ({
            cantidad: item.cantidad,
            modificaciones: item.modificaciones || [],
            precio: item.precio,
            id_producto: item.id
        }));
        //console.log('DETALLE: ', detalle_pedido);
    
        const data = {
            detalle_pedido,
            estado: true,
            id_mesa: TableId,
            id_sucursal: BranchId,
            total: OrderTotal,
            id_tipo_pedido: checked
        };

        try {
            const response = await fetch('https://us-central1-nitro-restaurant.cloudfunctions.net/api/pedido', { 
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const responseData = await response.json();
            //console.log('RESPONSE: ' ,responseData);

            dispatch(clear());

            navigation.navigate("main");
        } catch (error) {
            console.error('Error en la solicitud:', error.message || error);
        }
    };

    const [isAnyItemSwiped, setIsAnyItemSwiped] = useState(false);

    const handleSwipeStart = () => {
        setIsAnyItemSwiped(true);
    };

    const handleSwipeEnd = () => {
        setIsAnyItemSwiped(false);
    };

    useEffect(() => {
        const Query = query(collection(db, 'tipo_pedidos'), orderBy('nombre'));

        const unsubscribe = onSnapshot(Query, (snapshot) => {
            const List = snapshot.docs.map(doc => {
                const data = doc.data();

                return {
                    id: doc.id,
                    ...data
                };
            });
            setOrderTypes(List);
        }, (error) => {
            console.error('Error al escuchar los tipos de pedidos:', error);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <View className="flex-1 bg-slate-100 h-screen w-screen">
            <StatusBar backgroundColor='#f1f5f9' barStyle="dark-content" />
            <Appbar.Header className="bg-slate-100" mode='center-aligned'>
                <Appbar.Action icon='chevron-left' size={28} color='#09090b' onPress={() => navigation.goBack()} />
                <Appbar.Content color='#09090b' title="Carrito" />
            </Appbar.Header>
            {order === 0 && (
                <>
                    <View className="flex-1 justify-center items-center mb-6">
                        <Icon name="basket-off-outline" size={100} color='#cbd5e1' />
                        <Text className="font-normal my-5 text-lg text-slate-300 text-center mx-11">
                            Parece que aún no has añadido nada al carrito.
                        </Text>
                    </View>
                </>
            )}
            {order !== 0  && (
                <PaperProvider>
                    <SafeAreaView className="flex-grow">
                        <ScrollView showsVerticalScrollIndicator={false} onScroll={onScroll}>
                            {current === 1 && (
                                <>
                                    <View className="flex-row justify-center mt-8">
                                        <Icon name="cursor-pointer" size={22} color='#94a3b8' />
                                        <Text className="mx-4 text-sm font-semibold text-slate-400">Desliza para editar</Text>
                                    </View>
                                    {List.map((item, index) => (
                                        <ItemOrder 
                                            key={index}
                                            title={item.nombre} 
                                            price={item.precio_total.toFixed(1)} 
                                            url={item.imagen} 
                                            amount={item.cantidad} 
                                            id={item.id} 
                                            onSwipeStart={handleSwipeStart}
                                            onSwipeEnd={handleSwipeEnd}
                                            allowSwipe={!isAnyItemSwiped}
                                        />
                                    ))}
                                </>
                            )}
                            {current === 2 && (
                                <View className="mx-6 ">
                                    <View className="flex-row items-center mt-10">
                                        <Text className="mx-4 text-xl font-semibold text-black">Detalle de pedido</Text>
                                    </View>
                                    <ItemDetail/>
                                    <View className="flex-row items-center mt-10">
                                        <Text className="mx-4 text-xl font-semibold text-black">Tipo de pedido</Text>
                                    </View>
                                    <View style={styles.box} className="bg-white h-48 my-5 justify-center w-full rounded-3xl">
                                        {orderTypes.map((item, index) => (
                                            <RadioList 
                                                key={index}
                                                title={item.nombre}
                                                value={item.id}
                                                status={ checked === item.id ? 'checked' : 'unchecked' } onPress={() => setChecked(item.id)} 
                                            />
                                        ))}
                                    </View>
                                    <View className="flex-row mx-5 my-8 justify-between">
                                        <Text className="text-slate-800 text-2xl font-semibold">Total </Text>
                                        <Text className="text-indigo-500 text-2xl font-semibold">
                                            $ {total.toFixed(2)}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        </ScrollView>
                    </SafeAreaView>
                </PaperProvider>
            )}
            <View className="items-center mb-4 mx-8 bg-transparent">
                <TouchableOpacity 
                    onPress={()=>{
                        if (label === "SIGUIENTE") {
                            return handleNext();
                        } else if (label === "ENVIAR") {
                            return handleSave();
                        }
                    }} 
                    className="bg-indigo-900 h-14 w-full items-center justify-center rounded-full"
                >
                    <Text className="font-medium text-white">{label}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
    box: {
        shadowOffset: { width: 0, height: 5 },
        shadowColor: '#cbd5e1',
        shadowOpacity: 0.5,
        shadowRadius: 10, 
        elevation: 10
    },
});