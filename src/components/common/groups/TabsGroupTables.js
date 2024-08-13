import React from 'react';
import { View, ScrollView } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg'; 
import ItemListCheck from '../ItemList/ItemListCheck';

const TabsTables = ({data}) => {
    const [isExtended, setIsExtended] = React.useState(false);

    const onScroll = ({ nativeEvent }) => { 
        const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; 
        setIsExtended(currentScrollPosition <= 0); 
    };

    return(
        <View className="flex-1 flex-row relative">
            <ScrollView className="mx-5" horizontal={true} onScroll={onScroll} showsHorizontalScrollIndicator={false}>
                {data.map((item, index) => (
                    <View  key={index}>
                        <ItemListCheck status={item.estado} table={item.numero.toString()} />
                    </View>
                ))}
            </ScrollView>
            <View className="absolute justify-center items-center">
                <Svg height="120" width="40">
                <Defs>
                    <LinearGradient id="gradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                    <Stop offset="50%" stopColor="#f1f5f9" stopOpacity="1" />
                    <Stop offset="100%" stopColor="#f1f5f9" stopOpacity="0" />
                    </LinearGradient>
                </Defs>
                <Rect x="0" y="0" width="40" height="120" fill="url(#gradLeft)" />
                </Svg>
            </View>
            <View className='flex-1 justify-center items-end'>
                <Svg height="120" width="40">
                    <Defs>
                    <LinearGradient id="grad" x1="100%" y1="0%" x2="0%" y2="0%">
                        <Stop offset="50%" stopColor="#f8fafc" stopOpacity="1" />
                        <Stop offset="100%" stopColor="#f8fafc" stopOpacity="0" />
                    </LinearGradient>
                    </Defs>
                    <Rect x="0" y="0" width="40" height="120" fill="url(#grad)" />
                </Svg>
            </View>
        </View>
    );
};

export default TabsTables;