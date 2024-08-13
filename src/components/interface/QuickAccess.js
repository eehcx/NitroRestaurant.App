import { View, Text, StyleSheet } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Octicons';

const QuickAccess = ({icon, iconColor, background, title, description, shadowColor, onPress}) => {
    return (
        <TouchableRipple 
            className="h-44 w-40 bg-slate-100 rounded-3xl items-center justify-center mr-7" 
            onPress={onPress} 
            rippleColor='#e2e8f0'
            borderless={true}
        >
            <>
                <View style={[styles.box,{ shadowColor: shadowColor}]} className={`h-14 w-14 items-center justify-center rounded-xl ${background}`}> 
                    <Icon name={icon} color={iconColor} size={35} />
                </View>
                <Text className="font-semibold text-base text-slate-700 my-2">{title}</Text>
                <Text className="text-xs font-medium text-slate-400">{description}</Text>
            </>
        </TouchableRipple>
    );
};//<QuickAccess icon='gift' iconColor='#10b981' background='bg-emerald-100' title='Descuentos' />

export default QuickAccess;

const styles = StyleSheet.create({
    box: {
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 10, 
        elevation: 9,
    },
});