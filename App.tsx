/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef, useState, useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import { RootNavigation , navigationRef, navigate} from './rootNavigation';
 
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ImageBackground,
  PermissionsAndroid,
   AppState, 
   Alert, 
   Platform
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import CustomHeader from './components/customHeader';

 
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Constants } from './appUtils/constants';
type SectionProps = PropsWithChildren<{
  title: string;
}>;
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Splash from './Splash';
import Geolocation from 'react-native-geolocation-service';

import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {ActionConst, Router, Scene} from 'react-native-router-flux';
import PushNotification from 'react-native-push-notification';
import {cancelAlarmById} from 'react-native-simple-alarm';
import {Actions} from 'react-native-router-flux';
 
import AlarmScreen from './screens/AlarmScreen';
import AddAlarms from './components/Alarm/Home/AddAlarms';
 
import notifee from '@notifee/react-native';

const requestLocationPermission = async () => {
  try {
   
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};



//const Tab = createBottomTabNavigator();

function MyTabs(): JSX.Element  {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#F4A40E',
        tabBarInactiveTintColor:"#fff",
        headerTintColor: '#fff',
        tabBarStyle: { backgroundColor: '#7e1615', height:62 },
      
      }}
     
      
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Image style={{ width: 25, height: 25, resizeMode: 'contain' }} color={color} source={require('./assets/images/icons/home-icon.png')}></Image>
            
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Image style={{ width: 25, height: 25, resizeMode: 'contain' }} source={require('./assets/images/icons/search-icon.png')}></Image>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Image style={{ width: 25, height: 25, resizeMode: 'contain' }} source={require('./assets/images/icons/user-icon.png')}></Image>
          ),
        }}
      />
      <Tab.Screen
      name="More"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'More',
        tabBarIcon: ({ color, size }) => (
          <Image style={{ width: 25, height: 25, resizeMode: 'contain' }} source={require('./assets/images/icons/more-icon.png')}></Image>
        ),
      }}
    />
    </Tab.Navigator>
  );
}

 

function App(): JSX.Element {

  useEffect(() => {
    createChannels();
   
}, []);

const createChannels = () => {
    PushNotification.createChannel({
        channelId: "test-channel",
        channelName: "Test Channel",
        channelDescription: "A channel to categorise your notifications",
    });
};
  const [isLoading, setIsLoading] = useState(true);
  //console.log("PermissionsAndroid.PERMISSIONS==>",PermissionsAndroid.PERMISSIONS);
   // state to hold location
   const [location, setLocation] = useState(false);
   // function to check permissions and get Location
   const getLocation = () => {
  //  console.log('getLocation');
    // const resultOne = requestAlarmPermission();
    // console.log('resultOne',resultOne);

     const result = requestLocationPermission();
    
     result.then(res => {
      global.locationPermission =res;
      // console.log('res is:', res);
       if (res) {
         Geolocation.getCurrentPosition(
           position => {
            // console.log("position", position.coords);
            global.userLocation =position.coords;
            //  global.userLocation =  {
            //   accuracy :5, 
            //   altitude:5,
            //   altitudeAccuracy: 0.5,
            //   heading:   0,
            //   latitude: 17.361719,
            //   longitude : 78.475166,
            //   speed: 0
            // };
             setLocation(position.coords);
           },
           error => {
             // See error code charts below.
             global.locationPermission =true;
             global.userLocation =  {
              accuracy :5, 
              altitude:5,
              altitudeAccuracy: 0.5,
              heading:   0,
              latitude: 17.361719,
              longitude : 78.475166,
              speed: 0
            };
             console.log(error.code, error.message);
             setLocation(false);
           },
           {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
         );
       }
     });
    // console.log(location);
   };

   if(location){
    
   }


 



 //  useEffect(async () => {
//   if (Platform.OS === 'android') {
//     await PermissionsAndroid.requestMultiple([
//       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//       PermissionsAndroid.PERMISSIONS.ACTION_REQUEST_SCHEDULE_EXACT_ALARM,
      
//     ]);
//   }
// }, []);
// PushNotification.configure({
//   onNotification: async function (notification) {
//     console.log("notification==>",notification);
    
//     notifee.displayNotification({
//       title: 'Notification Title',
//       body: 'Main body content of the notification',
//       android: {
//         channelId,
//         //smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
//         // pressAction is needed if you want the notification to open the app when pressed
//         pressAction: {
//           id: 'default',
//         },
//       },
//     });
//     const {message, data, userInteraction} = notification;
//       console.log("notification==>",notification);
//     if (userInteraction) {
//       await cancelAlarmById(
//         Platform.select({ios: data && data.id, android: notification.id}),
//       );
//       navigate(Constants.nav_alarm, {  })
//      // Actions.AlarmScreen();
//     }

//     if (notification && !userInteraction) {
//       Alert.alert(message, '', [
//         {
//           text: 'OK',
//           onPress: async () => {
//             await cancelAlarmById(
//               Platform.select({
//                 ios: data && data.id,
//                 android: notification.id,
//               }),
//             );
//            // Actions.AlarmScreen();
//            navigate(Constants.nav_alarm, {  })
//           },
//         },
//       ]);
//     }
//     notification.finish(PushNotificationIOS.FetchResult.NoData);
//   },
//   permissions: {
//     alert: true,
//     badge: true,
//     sound: true,
//   },

//   popInitialNotification: true,
//   requestPermissions: true,
// });

//AppState.addEventListener('change', _handleAppStateChange);

  useEffect(async () => {
  // if (Platform.OS === 'android') {
  //   await PermissionsAndroid.requestMultiple([
  //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //     PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //     PermissionsAndroid.PERMISSIONS.ACTION_REQUEST_SCHEDULE_EXACT_ALARM,
      
  //   ]);
  // }
  
 
  
  // PushNotification.getScheduledLocalNotifications(rn=>{
  //   console.log("SN==>",rn);
  // });
  // AppState.addEventListener('change', _handleAppStateChange);
  // PushNotification.getScheduledLocalNotifications(rn=>{
  //   console.log("SN==>",rn);
  // });


 }, []);  

 _handleAppStateChange = async (appState) => {
  console.log("appState==>",appState);
  if (appState === 'active') {
  }

  if (appState === 'background' || appState === 'inactive') {
  }
};
const createLocalNotificationListeners = async () => {
  try {
 //   console.log("PushNotification configure==>" );
    PushNotification.configure({
      onNotification: async function (notification) {
     //   console.log("notification==>",notification);
        
        // notifee.displayNotification({
        //   title: 'Notification Title',
        //   body: 'Main body content of the notification',
        //   android: {
        //     channelId,
        //     //smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        //     // pressAction is needed if you want the notification to open the app when pressed
        //     pressAction: {
        //       id: 'default',
        //     },
        //   },
        // });
        const {message, data, userInteraction} = notification;
      //    console.log("notification==>",notification);
        if (userInteraction) {
          await cancelAlarmById(
            Platform.select({ios: data && data.id, android: notification.id}),
          );
          navigate(Constants.nav_alarm, {  })
         // Actions.AlarmScreen();
        }
  
        if (notification && !userInteraction) {
          Alert.alert(message, '', [
            {
              text: 'OK',
              onPress: async () => {
                await cancelAlarmById(
                  Platform.select({
                    ios: data && data.id,
                    android: notification.id,
                  }),
                );
               // Actions.AlarmScreen();
               navigate(Constants.nav_alarm, {  })
              },
            },
          ]);
        }
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
  
      popInitialNotification: false,
      requestPermissions: true,
    });
    // PushNotification.popInitialNotification((notification) =>{
    //   console.log('InitialNotication:', notification)
    // } );
     

  } catch (e) {
    // alert(e)
    //Toast.show(e)
  }
}

useEffect(() => {
  createLocalNotificationListeners();
 // const unsubscribe  = async () => createLocalNotificationListeners().then(r => console.log("local push notification listeners created"));
  //return unsubscribe;
}, []);
  useEffect(() => {   
    // Wait for 3 seconds
    getLocation();
    
    setTimeout(() => {
       setIsLoading(false);
    }, 3000);
  }, []);

  return  isLoading  ? <Splash imageURL={"https://codeologyforall.in/templeapi/uploads/splash1.jpeg"}></Splash>: (
    <>
     
    <CustomHeader  />
  <RootNavigation /> 
    {/*  <Router>
        <Scene hideNavBar={true} key={'ROOT_SCENE'} panHandlers={null} passProps>
        <Scene
        key={'RootNavigation'}
        component={RootNavigation}
        hideNavBar
        initial={false}
        type={ActionConst.RESET}
      />
        <Scene
            key={'AlarmScreen'}
            component={AlarmScreen}
            hideNavBar
            initial={false}
            type={ActionConst.RESET}
          />

          <Scene
            key={'AddAlarms'}
            component={AddAlarms}
            hideNavBar 
            initial={false}
            type={ActionConst.RESET}
          />

          <Scene
            key={'EditAlarm'}
            component={AddAlarms}
            hideNavBar 
            initial={false}
            type={ActionConst.RESET}
          />
        </Scene>
      </Router>
      */}
   {/* 
<NavigationContainer>
    <MyTabs />
   </NavigationContainer> */}
   </>
 
  );
}

const styles = StyleSheet.create({
  tabBar: {
      backgroundColor: "#7e1615",
      borderTopWidth: 0,
      // paddingBottom: 5
  },
});

export default App;
