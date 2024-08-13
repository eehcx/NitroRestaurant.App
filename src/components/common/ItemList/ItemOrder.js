import React, {useRef} from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Swipeable } from 'react-native-gesture-handler';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, removeFromOrders, removeSelectedProduct } from '../../../app/business/OrderSlice';

const ItemOrder = ({ title, amount, price, url, id, onSwipeStart, onSwipeEnd, allowSwipe }) => {
    const swipeableRef = useRef(null);
    const dispatch = useDispatch();
    const selectedProducts = useSelector(state => state.orders.selectedProducts || {});
    const order_detail = useSelector(state => state.orders.order_detail);

    const handleIncrement = (id) => {
        dispatch(increment(id));
    };

    const handleDecrement = (id) => {
        dispatch(decrement(id));
    };

    const handleEdit = () => {
        console.log(`Editar ${id}`);
    };

    const handleDelete = () => {
        dispatch(removeSelectedProduct({ id: id }));
        dispatch(removeFromOrders(id));
        console.log(selectedProducts, order_detail);
        if (swipeableRef.current) {
            swipeableRef.current.close();
        }
    };

    const renderRightActions = (progress, dragX) => {

        return (
            <View className="flex-row w-2/5 items-center">
                <TouchableRipple 
                    className="h-11 w-11 rounded-full items-center justify-center bg-indigo-200 mx-3" 
                    onPress={handleEdit}
                    rippleColor='#f1f5f9'
                    borderless={true}
                >
                    <Icon name="pencil-outline" size={20} color='#4338ca' />
                </TouchableRipple>
                <TouchableRipple 
                    className="h-11 w-11 rounded-full items-center justify-center bg-indigo-200 mx-3" 
                    onPress={handleDelete}
                    rippleColor='#f1f5f9'
                    borderless={true}
                >
                    <Icon name="trash-can-outline" size={20} color='#4338ca' />
                </TouchableRipple>
            </View>
        );
    };

    return (
        <Swipeable 
            ref={swipeableRef}
            renderRightActions={renderRightActions}
            onSwipeableWillOpen={onSwipeStart}
            onSwipeableClose={onSwipeEnd}
            enabled={allowSwipe}
        >
            <View style={styles.box} className="flex-row items-center justify-between my-3 mx-5 py-4 px-5 rounded-3xl bg-white">
                <Image className="rounded-2xl w-20 h-20" source={{uri: url }} />
                <View className='flex-col mx-4'>
                    <View className="flex-row items-start">
                        <Text className="font-semibold text-lg my-2 text-slate-700">{title}</Text>
                    </View>
                    <View className="flex-row justify-between items-center w-60">
                        <Text className="font-medium text-lg text-slate-500">${price}</Text>
                        <View className="flex-row items-center justify-between bg-indigo-200 rounded-xl mr-2 mb-2">
                            <TouchableOpacity className="px-3 py-2" onPress={()=> handleDecrement(id)}> 
                                <Icon name="minus" size={20} color='#312e81' />
                            </TouchableOpacity>
                            <Text className="text-sm font-medium text-indigo-900" >{amount}</Text>
                            <TouchableOpacity className="px-3 py-2" onPress={()=>handleIncrement(id)}>
                                <Icon name='plus' size={20} color='#312e81'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Swipeable>
    );
};

export default ItemOrder;

const styles = StyleSheet.create({
    box: {
        borderRadius: 20,
        shadowOffset: { width: 2, height: 5 },
        shadowColor: '#e2e8f0',
        shadowOpacity: 0.5,
        shadowRadius: 10, 
        elevation: 10,
    },
});