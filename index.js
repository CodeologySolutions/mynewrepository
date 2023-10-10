/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
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

import { RootNavigation , navigationRef, navigate} from './rootNavigation';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import {cancelAlarmById} from 'react-native-simple-alarm';
import { Constants } from './appUtils/constants';

AppRegistry.registerComponent(appName, () => App);
