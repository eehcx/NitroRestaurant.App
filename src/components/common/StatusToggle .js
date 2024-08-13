import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StatusToggle = ({active}) =>{

    const handleStatus = () => {
        let textColor;
        let activeColor;
        let state;

        switch (active) {
            case true:
                textColor = 'text-red-500';
                activeColor = '#ef4444';
                state = 'Ocupado';
                break;
            case false:
                textColor = 'text-emerald-500';
                activeColor = '#10b981';
                state = 'Disponible';
                break;
            default:
                textColor = 'text-emerald-500';
                activeColor = '#10b981';
                state = 'Disponible';
        }
        return {textColor, activeColor, state};
    }

    const {textColor, activeColor, state} = handleStatus();

    return(
        <>
            <View className="flex-row items-center justify-center">
                <Icon name="checkbox-blank-circle" size={11} color={activeColor}/>
                <Text className={` text-sm ml-2 font-medium ${textColor}`}>{state}</Text>
            </View>
        </>
    );
};

export default StatusToggle;