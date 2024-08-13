// utils/dateHelpers.js

function firestoreTimestampToDate(timestamp) {
    return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
}

export function formatDateToString(timestamp) {
    const date = firestoreTimestampToDate(timestamp);

    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure two digits for minutes
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    //${dayOfMonth} ${month}

    return `${dayOfWeek}, ${hours}:${minutes} ${ampm}`;
}

/* HOW TO USE:
##############
import React from 'react';
import { Text } from 'react-native';
import { formatDateToString } from './ruta-hacia-tu-helper/dateHelpers'; // Ajusta la ruta

const YourComponent = () => {
    const currentDate = new Date();
    const formattedDate = formatDateToString(currentDate);

    return (
        <Text>{formattedDate}</Text>
    );
};

export default YourComponent;
##############
*/