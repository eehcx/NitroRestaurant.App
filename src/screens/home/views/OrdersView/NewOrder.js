import React, { useEffect, useState } from 'react';
import {View, SafeAreaView, ScrollView} from 'react-native';
import { PaperProvider, Appbar, ActivityIndicator } from 'react-native-paper';
// Components
import TabsGroup from '../../../../components/common/groups/TabsGroup';
import ItemListProduct from '../../../../components/common/ItemList/ItemListProduct';
// Redux
import { useSelector, useDispatch  } from 'react-redux';
import { updateProducts, selectFilteredProducts } from '../../../../app/business/ProductSlice';
import { toggleOrder, toggleSelectedProduct, removeSelectedProduct } from '../../../../app/business/OrderSlice';
// React Navigation
import { useNavigation } from '@react-navigation/native';

const fetchAllProducts = async () => {
    try {
        const response = await fetch('https://us-central1-nitro-restaurant.cloudfunctions.net/api/producto');

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const Data = await response.json();

        return Data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const NewOrderScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const categoryId = useSelector((state) => state.products.currentCategory);
    const filteredProducts = useSelector(selectFilteredProducts);

    const selectedProducts = useSelector(state => state.orders.selectedProducts || {});

    const onScroll = ({ nativeEvent }) => { 
        const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; 
        setIsExtended(currentScrollPosition <= 0); 
    };

    const [isExtended, setIsExtended] = React.useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleCheck = (item) => {
        dispatch(toggleOrder({
            id: item.id,
            nombre: item.nombre,
            precio: item.precio,
            imagen: item.imagen,
            cantidad: 1, 
            precio_total: item.precio
        }));

        if (selectedProducts[item.id]) {
            dispatch(removeSelectedProduct({ id: item.id }));
        } else {
            dispatch(toggleSelectedProduct({ id: item.id }));
        }
    };

    const isProductSelected = (id) => {
        return selectedProducts[id] || false;
    };

    useEffect(() => {
        const loadInitialData = async () => {
            try {

                const ProductsData = await fetchAllProducts();
                dispatch(updateProducts(ProductsData));

                setIsLoading(false);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
                setIsLoading(false);
            }
        };

        loadInitialData();
    }, [categoryId]);

    return (
        <>
            <View className="flex-1 bg-slate-50 h-full">
                <Appbar.Header className="mt-1 mb-5" style={{ backgroundColor: '#fafafa'}} mode='small'>
                    <Appbar.Action icon='chevron-left' size={28} color='#09090b' onPress={() => navigation.goBack()} />
                    <Appbar.Content color='#09090b' title="Nuevo pedido" />
                    <Appbar.Action icon="cart-outline" size={33} color='#cbd5e1' onPress={()=> navigation.navigate("checkout")}/>
                </Appbar.Header>

                <PaperProvider>
                    <SafeAreaView> 
                        <ScrollView onScroll={onScroll} showsVerticalScrollIndicator={false}>
                            <View className="mx-5">
                                <TabsGroup />
                            </View>
                            <View className='mx-6'>
                                {isLoading ? (
                                    <View className="flex-1 justify-center items-center py-56">
                                        <ActivityIndicator  size="large" color='#E2E8F0' />
                                    </View>
                                ) : (
                                    <>
                                        {filteredProducts.map((item, index) => (
                                            <View key={index} >
                                                <ItemListProduct 
                                                    items={item.nombre} 
                                                    price={"$ " + item.precio} 
                                                    urlImage={item.imagen} 
                                                    status={isProductSelected(item.id)}
                                                    content={item.nutricion.contenido.valor + item.nutricion.contenido.unidad.charAt(0)}
                                                    calories={item.nutricion.calorias+'kcal'}
                                                    onPress={() => handleCheck(item)}
                                                />
                                            </View>
                                        ))}
                                    </>
                                )}
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </PaperProvider>
            </View>
        </>
    );
};

export default NewOrderScreen;