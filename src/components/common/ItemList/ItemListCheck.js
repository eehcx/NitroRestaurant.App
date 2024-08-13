import { Text, Image, StyleSheet } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

const ItemListCheck = ({status, table}) => {
    let background;
    let image;
    let opacity;
    let textColor;

    const check = () => {
        switch (status) {
            case true:
                background = 'bg-red-100';
                image = 'https://firebasestorage.googleapis.com/v0/b/nitro-restaurant.appspot.com/o/static%2FImages%2Ftable_red.png?alt=media&token=ba636f34-5a2f-4930-ae17-267a8e198e4f';
                opacity ='opacity-30';
                textColor = "text-red-900"
                break;
            case false:
                background = 'bg-emerald-100';
                image = 'https://firebasestorage.googleapis.com/v0/b/nitro-restaurant.appspot.com/o/static%2FImages%2Ftable_green.png?alt=media&token=6114f472-6b4b-4758-89c4-92ba3383f0d6';
                textColor = "text-teal-600"
                break;
            default:
                background = 'bg-slate-100';
                image = 'https://firebasestorage.googleapis.com/v0/b/nitro-restaurant.appspot.com/o/static%2FImages%2Ftable_red.png?alt=media&token=ba636f34-5a2f-4930-ae17-267a8e198e4f';
        }
    };

    check();

    return(
        <TouchableRipple 
            style={styles.box} 
            className={`relative rounded-3xl w-24 h-24 ${opacity} justify-center items-center mx-3.5 my-3 ${background}`}
            onPress={() => {}} 
            rippleColor='#cbd5e1'
            borderless={true}
        >
            <>
                <Image className="w-20 h-20" source={{ uri: image }} />
                <Text className={`absolute text-base font-semibold ${textColor}`}>{table}</Text>
            </>
        </TouchableRipple>
    );
};

export default ItemListCheck;

const styles = StyleSheet.create({
    box: {
        borderRadius: 10, 
        shadowColor: '#cbd5e1',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 20, 
        elevation: 10,
    },
});