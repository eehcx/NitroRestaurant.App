import { View, TouchableOpacity, Text, Image } from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CheckProduct = ({ status, onPress }) => {
    let activeIcon;
    let background;

    const check = () => {
        switch (status) {
            case true:
                activeIcon = 'check';
                background = 'bg-indigo-100';
                break;
            case false:
                activeIcon = 'plus';
                background = 'bg-slate-200';
                break;
            default:
                activeIcon = 'plus';
                background = 'bg-slate-200';
        }
    };

    check(); 

    return (
        <TouchableOpacity style={{elevation:1}} className={`rounded-full p-2 ${background}`} onPress={onPress}>
            <Icon color='#64748b' name={activeIcon} size={22} />
        </TouchableOpacity>
    )
}

export default ItemListProduct = ({ items, price, urlImage, status, content, calories, onPress }) => {
    return (
        <>
            <View className="flex-row items-center bg-slate-50 my-5 mx-1 rounded-2xl h-28 w-full">
                <View className="rounded-xl">
                    <Image className="w-24 h-24 rounded-xl" source={{uri: urlImage }} />
                </View>
                <View className='flex-col mx-6'>
                    <Text className="text-xl font-semibold text-slate-500">{items}</Text>
                    <View className="flex-row">
                        <View className="flex-row mr-2">
                            <Icon color='#cbd5e1' name="fire" size={19} />
                            <Text className="text-sm font-semibold text-slate-300 mx-1">{calories}</Text>
                        </View>
                        <View className="flex-row mx-2">
                            <Icon color='#cbd5e1' name="scale-unbalanced" size={19} />
                            <Text className="text-sm font-semibold text-slate-300 mx-1">{content}</Text>
                        </View>
                    </View>
                    <View className="flex-row justify-between items-center w-52">
                        <Text className="text-base font-bold text-slate-500">{price}</Text>
                        <CheckProduct status={status} onPress={onPress} />
                    </View>
                </View>
            </View>
            <Divider className="h-px bg-slate-200 mx-5 rounded-full" />
        </>
    );
};//style={{elevation:10, shadowColor: '#64748b', shadowOpacity: 0.3, shadowOffset: { width: 0, height: 4 }, borderRadius: 15}}