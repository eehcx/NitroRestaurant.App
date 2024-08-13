import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView } from "react-native";
// Components
import FilterPagesIcon from '../../interface/Filters/FilterPagesIcon';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, updateCategories } from '../../../app/business/ProductSlice';
// Firebase
import { collection, query, where, getDocs, doc } from 'firebase/firestore';
import { db } from '../../../config/firebase';

const TabsGroup = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state)=> state.products.categories);
    const BranchId = useSelector((state) => state.business.BranchId);

    const [isExtended, setIsExtended] = React.useState(false);
    const onScroll = ({ nativeEvent }) => { 
        const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; 
        setIsExtended(currentScrollPosition <= 0); 
    };

    const [selectedOption, setSelectedOption] = useState('Todos');

    const filterContent = (option) => { 
        setSelectedOption(option); 
        dispatch(setCategory(option));
    };

    useEffect(() => {
        if (categories.length === 0) {
            const fetchCategories = async () => {
                try {
                    const branchRef = doc(db, 'sucursales', BranchId);
                    const categoriesQuery = query(
                        collection(db, 'categorias'),
                        where('sucursal_ref', '==', branchRef)
                    );
    
                    const querySnapshot = await getDocs(categoriesQuery);
        
                    const fetchedCategories = querySnapshot.docs.map(doc => {
                        const data = doc.data();
                        delete data.sucursal_ref;  
                        return { id: doc.id, ...data };
                    });
    
                dispatch(updateCategories(fetchedCategories));
                } catch (error) {
                    console.error('Error fetching categories:', error);
                }
            };

            fetchCategories();
        }
    }, []);

    return(
        <>
            <SafeAreaView className='flex-row'>
                <ScrollView  horizontal={true} onScroll={onScroll} showsHorizontalScrollIndicator={false}>
                    <FilterPagesIcon 
                        text='Todos' 
                        icon='view-list-outline' 
                        isSelected={selectedOption === 'Todos'} 
                        onPress={() => filterContent('Todos')}  
                    />
                    {categories.map((item, index) => (
                        <FilterPagesIcon 
                            key={index} 
                            text={item.nombre} 
                            icon={item.image} 
                            isSelected={selectedOption === item.nombre} 
                            onPress={() => filterContent(item.nombre)} 
                        />
                    ))}
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default TabsGroup;