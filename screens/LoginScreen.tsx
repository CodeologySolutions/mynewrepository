// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import React, {useRef, useState, useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
  ImageBackground
} from 'react-native';
import { Constants } from '../appUtils/constants';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import { retrieveDataFromLocalStorage,clearDataFromLocalStorage } from '../appUtils/sessionManager';
const LoginScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const moveToVerifyPhoneScreen = () => {
    props.navigation.navigate(Constants.nav_verify_phone, {    })
  }
  useEffect(async () => {
   // clearDataFromLocalStorage();
   var token  = await retrieveDataFromLocalStorage(Constants.key_token);
   if(token){
    global.mobile = await retrieveDataFromLocalStorage(Constants.key_username);
    global.token =JSON.parse(token);

    console.log("  global.token==>", JSON.parse(token) );
    if(global.token){
      props.navigation.navigate(Constants.nav_bottom_navigation, {    })
    }else{
      setIsLoading(false);
    }
   }
   
    setTimeout(() => {
      setIsLoading(false);
    },2000);

  }, []);
  return  isLoading ? <CustomActivityIndicator />: (
   
    <SafeAreaView style={styles.main}>
 
    <ScrollView >
    
    <ImageBackground source={{uri:"https://codeologyforall.in/templeapi/uploads/main-bg.jpg"}} resizeMode="cover" style={{
         
        position: 'absolute', left: 0, top:0,
        justifyContent: 'center',
        height:"100%",
        width:"100%"
      }}>
     
    </ImageBackground>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            
            alignItems: 'center',
            marginTop:60,
            marginBottom:60
          }}>
          <Image
                style={{
                  width: 292,
                  height: 50,
                   
                  
                  resizeMode: 'center',
                  
                  left:0,
                  top:6
                }}
                source={require('../assets/images/logo.png')}
              />
              </View>
              <View
              style={{
                
                alignItems: 'center',
               
              }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16,
              color:"#fff"
            }}>
            Login
          </Text>
        </View>
        <View
          style={{
            
            alignItems: 'center',
            marginTop:60,
            marginBottom:60
          }}>
        <TouchableOpacity   style={{pending:10, width:320, margin:3,backgroundColor: '#570d13',borderRadius:8,justifyContent: "center", zIndex:8 }}  activeOpacity={0.9}  onPress={() => moveToVerifyPhoneScreen()}  >
        <Text
            style={{
              fontSize: 14,
              textAlign: 'center',
              marginBottom: 10,
              marginTop: 10,
              
              color:"#fff"
            }}>
            Devotee
          </Text>
          </TouchableOpacity>
          <TouchableOpacity  style={{ pending:10, width:320, margin:3,marginTop:20,backgroundColor: '#570d13',borderRadius:8,  justifyContent: "center" , zIndex:8 }}  activeOpacity={0.9}  >
        <Text
            style={{
              fontSize: 14,
              textAlign: 'center',
             
              marginBottom: 10,
              marginTop: 10,
              color:"#fff"
            }}>
            Temple Member
          </Text>
          </TouchableOpacity>
        </View>
        <View
        style={{
          height:200
       
        }}>
        <Text
            style={{
              fontSize: 14,
              textAlign: 'center',
              pending:10,
              marginBottom: 10,
              marginTop: 10,
              color:"#fff"
            }}>
            
          </Text>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  main:{
    flex: 1,
    backgroundColor: '#f4a40e',
    height:"100%"

  }
});
export default LoginScreen;