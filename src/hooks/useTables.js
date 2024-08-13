import { useState, useEffect } from 'react';
// Firebase
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
// Redux
import { useDispatch } from 'react-redux';
import { setTablesList } from '../app/business/BusinessSlice';

const useTables = () => {
    const dispatch = useDispatch();
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const tablesQuery = query(collection(db, 'mesas'), orderBy('numero'));

        const unsubscribe = onSnapshot(tablesQuery, (snapshot) => {
            const tableList = snapshot.docs.map(doc => {
                const data = doc.data();
                delete data.sucursal_ref;

                return {
                    id: doc.id,
                    ...data
                };
            });
            setTables(tableList);
            dispatch(setTablesList(tableList));
            setLoading(false);
        }, (error) => {
            console.error('Error listening to mesas:', error);
            setError(error);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return { tables, loading, error };
};

export default useTables;