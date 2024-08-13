import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { Divider } from 'react-native-paper';
import StatusToggle from '../StatusToggle ';

export default ItemListOrder = ({ content, items, price, status, urlImage, onPress }) => {
    return (
        <>
            <TouchableOpacity className="flex-row items-center justify-between pb-3 pt-1 px-6" onPress={onPress}>
            <Image style={[{ borderRadius: 10, width: 70, height: 70 }]} source={{uri: urlImage }} />
                <View className="flex-col items-start my-5 mr-5" >
                    <Text className="text-lg font-semibold text-slate-500">{items}</Text>
                    <Text className="text-base font-semibold text-slate-400 my-1">{content}</Text>
                    <StatusToggle active={status} />
                </View>
                <Text className="text-lg font-bold text-slate-500">${price}</Text>
            </TouchableOpacity>
            <Divider className="my-1 bg-slate-200" />
        </>
    );
};


const styles = StyleSheet.create({
    txtLabels: { marginLeft: 10, color: '#67757d', fontSize: 15 },
});