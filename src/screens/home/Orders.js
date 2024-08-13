import React, { useState, useEffect } from 'react';
//React Native
import { SafeAreaView, ScrollView, View, TouchableOpacity, Text, Image } from 'react-native';
import {PaperProvider, Divider, Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// Componentes
import ItemListOrder from '../../components/common/ItemList/ItemListOrder';
import ReceiptModal from '../../components/interface/ReceiptModal';
import StatusToggle from '../../components/common/StatusToggle ';
import { formatDateToString } from '../../utils/helpers/dateHelpers';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { SelectedOrderId, setReceipt } from '../../app/business/OrderSlice';
// Hooks
import useOrders from '../../hooks/useOrders';
// Firebase
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

export default OrdersScreen = () => {
    const { orders, loading, error } = useOrders();
    const [orderData, setOrderData] = useState(null);
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    // Redux
    const dispatch = useDispatch();
    const tables = useSelector(state => state.business.tables);
    const availableTables = tables.filter(table => !table.estado);
    // Hooks para el estado del componente
    const [isExtended, setIsExtended] = React.useState(false);
    const onScroll = ({ nativeEvent }) => { 
        const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; 
        setIsExtended(currentScrollPosition <= 0); 
    };

    const handleModal = async (id) => {
        const docRef = doc(db, 'pedidos', id);
        try {
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const orderData = docSnap.data();
                delete orderData.mesa_ref;
                delete orderData.tipo_pedido_ref;
                delete orderData.sucursal_ref;
                const detailedProducts = await Promise.all(orderData.detalle_pedido.map(async (item) => {
                    const productRef = item.producto_ref;
                    const productDoc = await getDoc(productRef);
                    delete item.producto_ref;
                    return { ...item, producto: productDoc.exists() ? productDoc.data().nombre : 'No encontrado' };
                }));
    
                dispatch(SelectedOrderId(id));
                dispatch(setReceipt({ ...orderData, detalle_pedido: detailedProducts }));
                setOrderData(detailedProducts);
                setModalVisible(true);
                console.log({ ...orderData, detalle_pedido: detailedProducts });
            } else {
                console.log('Documento no existe');
            }
        } catch (error) {
            console.log('Error al abir el modal', error);
        }
    };

    const handleClose = async () => {
        setModalVisible(false);
    };

    const handleNavigate = async () => {
        navigation.navigate('billing');
        setModalVisible(false);
    };

    return (
        <>
            <View className='flex-1 bg-gray-50' >
                <PaperProvider>
                    {isModalVisible && <ReceiptModal visible={isModalVisible} products_detail={orderData} onPress={handleNavigate} close={handleClose} />}
                    <SafeAreaView className='flex-grow'>
                        <ScrollView onScroll={onScroll} showsVerticalScrollIndicator={false}>
                            <Appbar.Header style={{ backgroundColor: '#fafafa'}} mode='center-aligned'>
                                <Appbar.Action icon='chevron-left' size={28} color='#09090b' onPress={() => navigation.goBack()} />
                                <Appbar.Content color='#09090b' title="Lista de pedidos" />
                            </Appbar.Header>
                            <Text className="pt-1 pb-2 px-7 font-medium text-sm text-slate-500">Pedidos activos</Text>
                            <Divider className="my-1 bg-slate-200" />
                            {orders.map((item, index) => (
                                <View key={index}>
                                    <ItemListOrder content={formatDateToString(item.fecha_creacion)} items={"Mesa No."+item.mesa.numero} status={item.estado} price={item.total.toFixed(2)} urlImage={'https://firebasestorage.googleapis.com/v0/b/nitro-restaurant.appspot.com/o/static%2FImages%2Ftable_red.png?alt=media&token=ba636f34-5a2f-4930-ae17-267a8e198e4f'} onPress={()=>handleModal(item.id)} />
                                </View>
                            ))}
                            <Text className="pt-5 pb-2 px-7 font-medium text-sm text-slate-500">Mesas disponibles</Text>
                            <Divider className="my-1 bg-slate-200" />
                            {availableTables.map((item, index) => (
                                <View key={index}>
                                    <TouchableOpacity className="flex-row items-center justify-start py-3 px-6">
                                        <Image className="w-20 h-20" source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/nitro-restaurant.appspot.com/o/static%2FImages%2Ftable_green.png?alt=media&token=6114f472-6b4b-4758-89c4-92ba3383f0d6' }} />
                                        <View className="flex-col items-start my-3 ml-7" >
                                            <Text className="text-lg font-semibold text-slate-500">Mesa No.{item.numero}</Text>
                                            <Text className="text-base font-medium text-slate-400 my-1">Para {item.capacidad} persona(s)</Text>
                                            <StatusToggle active={item.estado} />
                                        </View>
                                    </TouchableOpacity>
                                    <Divider className="my-1 bg-slate-200" />
                                </View>
                            ))}
                        </ScrollView>
                    </SafeAreaView>
                </PaperProvider>
                <View className='mb-20 bg-transparent'>
                    <TouchableOpacity className='flex-row items-center justify-center py-3 bg-indigo-800 mx-10 my-2 rounded-full' onPress={()=> navigation.navigate('newOrder')}>
                        <Icon color='#f1f5f9' name="cart-plus" size={24} />
                        <Text className='ml-4 text-indigo-100 font-medium text-lg'>Crear pedido</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};