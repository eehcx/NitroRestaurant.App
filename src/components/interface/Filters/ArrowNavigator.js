import { View, Text, TouchableOpacity } from 'react-native';
// Icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { CurrentTable, incrementCurrent, decrementCurrent } from '../../../app/business/BusinessSlice';

const ArrowNavigator = () => {
    // Redux
    const dispatch = useDispatch();
    const Table = useSelector(CurrentTable);

    const handlePrev = () =>{
        dispatch(decrementCurrent());
    }

    const handleNext = () =>{
        dispatch(incrementCurrent());
    }

    return (
        <View className="flex-row justify-between my-2 mx-3 rounded-2xl p-1">
            <TouchableOpacity className="rounded-full p-1 bg-indigo-300" onPress={handlePrev}>
                <Icon name="arrow-left" size={24} color='#1e1b4b' />
            </TouchableOpacity>
            <Text className="font-bold px-2 text-base text-indigo-950">{Table}</Text>
            <TouchableOpacity onPress={handleNext} className="mx-3 rounded-full p-1 bg-indigo-300">
                <Icon name="arrow-right" size={24} color='#1e1b4b' />
            </TouchableOpacity>
        </View>
    );
};

export default ArrowNavigator;