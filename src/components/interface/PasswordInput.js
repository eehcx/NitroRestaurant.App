import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default PasswordInput = ({ placeholder, onPasswordChange, passwordValue }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handlePasswordChange = (text) => {
        onPasswordChange(text);
    };

    return (
        <>
            <View className="my-5 mx-10">
                <View className="flex-row items-center justify-center">
                    <View className="px-2 py-1 mb-5">
                        <Icon name='lock-outline' size={23} color="#bababa" />
                    </View>
                    <TextInput className="w-10/12 h-12 text-base bg-gray-100 rounded-xl px-5 mb-3" placeholder={placeholder} value={passwordValue} onChangeText={handlePasswordChange} secureTextEntry={!isPasswordVisible} />
                    <TouchableOpacity  className="px-2 py-1 mb-5" onPress={togglePasswordVisibility}>
                        <Icon name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} size={23} color="#bababa" />
                    </TouchableOpacity>
                </View>
                <Divider className="h-px w-80 bg-gray-300" />
            </View>
        </>
    );
};