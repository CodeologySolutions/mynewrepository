import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Constants } from './appUtils/constants';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import DetailsScreen from './screens/DetailsScreen';
import TempleListScreen from './screens/TempleListScreen';
import FavouriteTempleListScreen from './screens/FavouriteTempleListScreen';
import TempleDetailScreen from './screens/TempleDetailScreen';
import TempleMapScreen from './screens/TempleMapScreen';
import BottomNavigation from './components/BottomNavigation';
 
import StotraListScreen from './screens/StotraListScreen';
 
import StotraDetailScreen from './screens/StotraDetailScreen';
import LoginScreen from './screens/LoginScreen';
 
import VerifyPhoneScreen from './screens/VerifyPhoneScreen';
 
import VerifyCodeScreen from './screens/VerifyCodeScreen';
 
import UserProfileScreen from './screens/UserProfileScreen';
import PackageTourScreen from './screens/PackageTourScreen';
import PanchangamScreen from './screens/PanchangamScreen';
import EventScreen from './screens/EventScreen';
import MoreScreen from './screens/MoreScreen';
import CalendarScreen from './screens/CalendarScreen'
import UpgradeScreen from './screens/UpgradeScreen'
import CustomHeader from './components/customHeader';
import AlarmScreen from './screens/AlarmScreen';
import AddAlarms from './components/Alarm/Home/AddAlarms';
const Stack = createStackNavigator();

export const RootNavigation = (props) => {

    return (   
        <NavigationContainer ref={navigationRef} >
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
        <Stack.Screen name={Constants.nav_login} component={LoginScreen} />
        <Stack.Screen name={Constants.nav_verify_phone} component={VerifyPhoneScreen} />
        <Stack.Screen name={Constants.nav_verify_code} component={VerifyCodeScreen} />
        <Stack.Screen name={Constants.nav_create_profile} component={UserProfileScreen} />
        <Stack.Screen name={Constants.nav_bottom_navigation} component={BottomNavigation} />
        <Stack.Screen name={Constants.nav_package_tour_list} component={PackageTourScreen} />
        <Stack.Screen name={Constants.nav_panchangam_list} component={PanchangamScreen} />
        <Stack.Screen name={Constants.nav_event_list} component={EventScreen} />
        <Stack.Screen name={Constants.nav_calendar} component={CalendarScreen} />
        <Stack.Screen name={Constants.nav_alarm} component={AlarmScreen} />
        <Stack.Screen name={Constants.nav_user_upgrade} component={UpgradeScreen} />
        <Stack.Screen name={Constants.nav_add_alarm} component={AddAlarms} />
        <Stack.Screen name={Constants.nav_edit_alarm} component={AddAlarms} />
     
            <Stack.Screen name={Constants.nav_home} component={HomeScreen} />
            <Stack.Screen name={Constants.nav_profile} component={ProfileScreen} />
            <Stack.Screen name={Constants.nav_temple_list} component={TempleListScreen} />
            <Stack.Screen name={Constants.nav_favourite_temple_list} component={FavouriteTempleListScreen} />
            <Stack.Screen name={Constants.nav_temple_detail} component={TempleDetailScreen} />
            <Stack.Screen name={Constants.nav_temple_map_detail} component={TempleMapScreen} />
            <Stack.Screen name={Constants.nav_settings} component={SettingsScreen} />
            <Stack.Screen name={Constants.nav_stotra_list} component={StotraListScreen} />
            <Stack.Screen name={Constants.nav_stotra_detail} component={StotraDetailScreen} />
            <Stack.Screen name={Constants.nav_header} component={CustomHeader} />
            
            </Stack.Navigator>
            </NavigationContainer>
        );
    }
    
    export const navigationRef = React.createRef();
    
    export function navigate(name, params) {
        navigationRef.current?.navigate(name, params);
    }
    
    export function goBack() {
        navigationRef.current?.goBack()
    }
    
    export function pushScreen(name, params) {
        add
        navigationRef.current?.push(name);
    }
    
    export function popScreen() {
        navigationRef.current?.pop()
    }