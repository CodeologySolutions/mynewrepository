import React from 'react';
import { StyleSheet, Dimensions, Image } from 'react-native';
import { Constants } from '../appUtils/constants';
 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

 

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DetailsScreen from '../screens/DetailsScreen';
import MoreScreen from '../screens/MoreScreen';
import SearchScreen from '../screens/SearchScreen';
import CustomHeader from './customHeader';

const Tab = createBottomTabNavigator();
 

const BottomTabNavigator = () => {

    const insets = useSafeAreaInsets();

  
    return (
        <Tab.Navigator
      initialRouteName="Feed"      
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#F4A40E',
        tabBarInactiveTintColor:"#fff",
        headerTintColor: '#fff',
        tabBarStyle: { backgroundColor: '#7e1615', height:62},
       
      }}
     
      
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Image style={{ width: 25, height: 25, resizeMode: 'contain' }} color={color} source={require('../assets/images/icons/home-icon.png')}></Image>
            
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Image style={{ width: 25, height: 25, resizeMode: 'contain' }} source={require('../assets/images/icons/search-icon.png')}></Image>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Image style={{ width: 25, height: 25, resizeMode: 'contain' }} source={require('../assets/images/icons/user-icon.png')}></Image>
          ),
        }}
      />
      <Tab.Screen
      name="More"
      component={MoreScreen}
      options={{
        tabBarLabel: 'More',
        tabBarIcon: ({ color, size }) => (
          <Image style={{ width: 25, height: 25, resizeMode: 'contain' }} source={require('../assets/images/icons/more-icon.png')}></Image>
        ),
      }}
    />
    </Tab.Navigator>
    );
};

 
export default BottomTabNavigator;