import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from '../components/BottomTabNavigator';

const Stack = createStackNavigator();

export default function BottomNavigation({ navigation }) {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="TabNavigator"
                component={BottomTabNavigator}
                options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}