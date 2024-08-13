import { View, Text, TouchableOpacity } from 'react-native';
import { TouchableRipple, Divider } from 'react-native-paper';

const FilterPagesIcon = ({ icon, text, onPress, isSelected }) => (
    <TouchableOpacity className='flex-col items-center px-2' onPress={onPress} >
        <View className="items-center justify-center">
            <Text className={`font-medium text-lg mb-2 ${isSelected ? "text-indigo-300" : "text-gray-300"}`}>{text}</Text>
            <Divider className={`h-1 w-24 rounded-full ${isSelected ? "bg-indigo-300" : "bg-slate-50"}`} />
        </View>
    </TouchableOpacity>
);

export default FilterPagesIcon;