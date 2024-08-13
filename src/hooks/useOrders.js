import { useState, useEffect } from 'react';
// Firebase
import { collection, query, where, onSnapshot, getDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
// Redux
import { useSelector, useDispatch } from 'react-redux';

const useOrders = () => {
    const dispatch = useDispatch();
    const uid = useSelector(state => state.business.BranchId);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const branchRef = doc(db, "sucursales", uid);
        const ordersQuery = query(
            collection(db, "pedidos"),
            where("sucursal_ref", "==", branchRef),
            where("estado", "==", true)
        );

        const unsubscribe = onSnapshot(ordersQuery, async (snapshot) => {
            const ordersList = [];

            for (const doc of snapshot.docs) {
                const orderId = doc.id;
                const orderData = doc.data();

                const tableSnapshot = await getDoc(orderData.mesa_ref);
                const tableData = tableSnapshot.data();
                delete tableData.sucursal_ref;

                /*
                const orderTypeSnapshot = await getDoc(orderData.tipo_pedido_ref);
                const orderTypeData = orderTypeSnapshot.data(); */

                delete orderData.mesa_ref;
                delete orderData.tipo_pedido_ref;
                delete orderData.sucursal_ref;

                const order = {
                    id: orderId,
                    ...orderData,
                    mesa: tableData
                };
                ordersList.push(order);
            }   
            setOrders(ordersList);
        });

        return () => unsubscribe();
    }, [uid]);

    return { orders, loading, error };
};

export default useOrders;