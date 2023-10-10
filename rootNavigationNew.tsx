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
import CustomHeader from './components/customHeader';

const Stack = createStackNavigator();

export const RootNavigationNew = (props) => {

    return (   
       
        <Stack.Navigator  headerShown={false}>
        <Stack.Screen name={Constants.nav_home} component={HomeScreen}  headerShown={false} />
             
            <Stack.Screen name={Constants.nav_package_tour_list} component={PackageTourScreen} />
            <Stack.Screen name={Constants.nav_panchangam_list} component={PanchangamScreen} />
            <Stack.Screen name={Constants.nav_event_list} component={EventScreen} />        
           
            <Stack.Screen name={Constants.nav_profile} component={ProfileScreen} />
            <Stack.Screen name={Constants.nav_temple_list} component={TempleListScreen} />
            <Stack.Screen name={Constants.nav_temple_detail} component={TempleDetailScreen} />
            <Stack.Screen name={Constants.nav_temple_map_detail} component={TempleMapScreen} />
            <Stack.Screen name={Constants.nav_settings} component={SettingsScreen} />
            <Stack.Screen name={Constants.nav_stotra_list} component={StotraListScreen} />
            <Stack.Screen name={Constants.nav_stotra_detail} component={StotraDetailScreen} />
        </Stack.Navigator>
            
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