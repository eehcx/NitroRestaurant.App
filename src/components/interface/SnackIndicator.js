import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

const SnackIndicator = () => {
    return(
        <>
            <View className="flex-row h-10 w-5/12 px-2 justify-center items-center bg-emerald-100 rounded-xl">
                <Icon name="check-circle-fill" color='#15803d' size={17} />
                <Text className="text-sm font-semibold mx-2 text-emerald-700">Para entrega</Text>
            </View>
        </>
    );
};

export default SnackIndicator;