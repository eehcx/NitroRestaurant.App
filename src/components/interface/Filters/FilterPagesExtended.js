//React Native
import { View, Text, TouchableOpacity } from 'react-native';

export default FilterPagesExtended = ({ text, onPress, isSelected, isDisabled }) => (
    <>
        <TouchableOpacity className={`w-5/12 h-11 rounded-2xl mx-1 items-center justify-center ${isSelected ? "bg-zinc-700" : "bg-slate-200"}`} disabled={isDisabled} onPress={onPress} >
            <Text className={`text-center text-base font-bold  ${isSelected ? "text-slate-100" : "text-zinc-700"}`} >
                {text}
            </Text>
        </TouchableOpacity>
    </>
);