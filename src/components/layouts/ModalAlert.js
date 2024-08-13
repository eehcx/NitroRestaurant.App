import {Modal, Text, View, TouchableWithoutFeedback} from 'react-native';
import { Divider, Button } from 'react-native-paper';

export default ModalAlert = ({ visible, message, title, onPress, button, close }) => {

    return (
        <>
            <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={close} >
                <TouchableWithoutFeedback onPress={close}>
                    <View style={{backgroundColor: 'rgba(245, 245, 244, 0.5)'}} className='flex-1 justify-end items-center'>
                        <TouchableWithoutFeedback>
                            <View className='bg-white p-5 mb-2 rounded-3xl items-center w-full h-2/6 top-5 shadow-2xl shadow-green-800'>
                                <Divider className='bg-neutral-200 h-1 w-1/5 bottom-3 rounded-full' />
                                <Text className='pt-1 text-black text-xl font-medium mb-3' >{title}</Text>
                                <Divider className='bg-neutral-200 w-11/12 h-px' />
                                <Text className='text-base mt-4 text-gray-400' >{message}</Text>
                                <View className='flex-row justify-between'>
                                    <Button className='w-2/5 h-2/5 my-8 mx-5 rounded-full items-center justify-center bg-neutral-100' textColor='#404040'  mode="contained" onPress={close}>REGRESAR</Button>
                                    <Button className='w-2/5 h-2/5 my-8 mx-5 rounded-full items-center justify-center bg-indigo-900' mode="contained"  onPress={onPress}>{button}</Button>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
};