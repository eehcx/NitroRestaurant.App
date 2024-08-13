import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Octicons';

// Authentication
import LoadingScreen from './screens/auth/redirect';
import InputScreen from './screens/entrace';
import LoginScreen from './screens/auth/Login';

// Main
import ProfileScreen from './screens/home/Profile';
import HomeScreen from './screens/home/Home';
import OrdersScreen from './screens/home/Orders';
import NewOrderScreen from './screens/home/views/OrdersView/NewOrder';
import CheckoutScreen from './screens/home/views/OrdersView/Checkout';
import PaymentsView from './screens/home/views/PaymentsView';
import BillingView from './screens/home/views/PaymentsView/BillingView';

const AuthStack = createStackNavigator();
const Stack = createStackNavigator();
const navigationRef = React.createRef();
const Tab = createBottomTabNavigator();

// Autentificación 
const AuthScreens = () => (
    <AuthStack.Navigator>
        <AuthStack.Screen name="entrace" component={InputScreen} options={{ headerShown: false }} />
        <AuthStack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
    </AuthStack.Navigator>
);

// Barra de navegación 
const MainBarScreen=()=>{
    return (
        <Tab.Navigator 
            initialRouteName="home" 
            screenOptions={{ 
                headerShown: false, 
                tabBarActiveTintColor: '#1e293b', 
                tabBarInactiveTintColor: '#cbd5e1', 
                tabBarStyle: { 
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 75,  
                    backgroundColor: '#f8fafc', 
                    borderColor: '#fafafa',
                    elevation: 0,
                    paddingVertical: 15,
                } 
            }} 
        >
            <Tab.Screen name="home" component={HomeScreen} options={{ tabBarLabel: '', tabBarIcon: ({ color }) => <Icon name="home" size={26} color={color} /> }}/>
            <Tab.Screen name="orders" component={OrdersScreen} options={{ tabBarLabel: '', tabBarIcon: ({ color }) => <Icon name="inbox" size={26} color={color} /> }}/>
            <Tab.Screen name="profile" component={ProfileScreen} options={{ tabBarLabel: '', tabBarIcon: ({ color }) => <Icon name="person" size={26} color={color} /> }}/>
        </Tab.Navigator>
    );
};

// Funcion principal de la aplicación
export default function Navigation() {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
                <Stack.Screen name="loading" component={LoadingScreen} options={{ headerShown: false }} />
                <Stack.Screen name="auth" component={AuthScreens} options={{ headerShown: false }} />
                <Stack.Screen name="main" component={MainBarScreen} options={{ headerShown: false }} />
                <Stack.Screen name="newOrder" component={NewOrderScreen} options={{ headerShown: false }} />
                <Stack.Screen name="checkout" component={CheckoutScreen} options={{ headerShown: false }} />
                <Stack.Screen name="announcements" component={PaymentsView} options={{ headerShown: false }} />
                <Stack.Screen name="billing" component={BillingView} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};