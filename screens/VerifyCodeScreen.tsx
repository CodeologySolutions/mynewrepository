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
  ImageBackground,
  TextInput
} from 'react-native';
import ToastManager, { Toast } from 'toastify-react-native'
import { signIn ,getUserProfile} from '../webServices/apis';
import { saveDataToLocalStorage } from '../appUtils/sessionManager';
import { Constants } from '../appUtils/constants';
const VerifyCodeScreen = (props) => {
  const [otp, setOTP] = useState('');

  const confimOTP =async ( )=>{
    let data = {
      type: "validateOTP",
      username: props.route.params.username,
      otp:otp
      
    };
    console.log("data=OUT=>",data);
    let response = await signIn(data);
    
    if (response) {
      // Adjust.trackEvent({
      //   eventToken: 'nxuhll'
      // })
    console.log("response=OUT=>",response);

      if(response.token){
        saveDataToLocalStorage(Constants.key_is_login, JSON.stringify(true))
        console.log("response.token==>",response.token);
        global.token = response.token;
        global.mobile = props.route.params.username;
        saveDataToLocalStorage(Constants.key_token, JSON.stringify(global.token))
        saveDataToLocalStorage(Constants.key_username, global.mobile)
        console.log("JSON.stringify(global.token)",JSON.stringify(global.token));
      //  localStorage.setItem('token', response.token);
      saveDataToLocalStorage(Constants.key_user_data, JSON.stringify(response?.item?.userdata))

        if(response?.item?.userdata?.isDetailFilled===false){

          props.navigation.navigate(Constants.nav_create_profile, {    })
          // let res1 = await getUserProfile();
          // console.log("res1==>",res1);
          // if (res1) {
          //   saveDataToLocalStorage(Constants.key_user_data, JSON.stringify(res1?.item))

          //  // localStorage.setItem('userdata', JSON.stringify(res1?.item));
           
          // }
          //props.navigation.navigate(Constants.nav_create_profile, {    })
        //    window.location.href = '/user-detail';
        }else{
         props.navigation.navigate(Constants.nav_bottom_navigation, {    })
       //     window.location.href = '/home';
          //   let res1 = await getUserProfile();
          //   console.log("res1==>",res1);
          //   if (res1) {
          //  //   localStorage.setItem('userdata', JSON.stringify(res1?.item));
          //  saveDataToLocalStorage(Constants.key_user_data, JSON.stringify(res1?.item))
             
          //   }
        }
        

      }else{
        Toast.error(response?.data?.errors ? response?.data?.errors?.[0]?.msg : "Something Went Wrong! Please try again ...");
      }
      
    } else {
      Toast.error(response?.data?.errors ? response?.data?.errors?.[0]?.msg : "Something Went Wrong! Please try again ...");
    }
    return true;
  }

  return (
   
    <SafeAreaView style={styles.main}>
    <ToastManager />
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
            marginTop:30,
            marginBottom:60
          }}>
          <Image
                style={{
                  
                  height: 80,
                   
                  
                  resizeMode: 'center',
                  
                  left:0,
                  top:6
                }}
                source={require('../assets/images/verify-code.png')}
              />
              </View>
              <View
              style={{
                marginTop: 80,
                alignItems: 'center',
               
              }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16,
              color:"#000",
              borderBottomColor: '#000',
              borderBottomWidth: 1,

            }}>
            Verification Code
          </Text>
          <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            marginBottom: 5,
            color:"#000",
            fontWeight:"bold"
          }}>
          {props.route.params.username}
 
        </Text>
          <Text
          style={{
            fontSize: 14,
            textAlign: 'center',
            marginBottom: 5,
            color:"#000"
          }}>
          OTP has sent to your registered
 
        </Text>
        <Text
          style={{
            fontSize: 14,
            textAlign: 'center',
            marginBottom: 10,
            color:"#000"
          }}>
          
          mobile number, Please verify
        </Text>
        </View>
        <View
          style={{
            
            alignItems: 'center',
            marginTop:60,
            marginBottom:60
          }}>
          <TextInput
          style={{
            height: 40,
            marginTop:10,
            marginLeft:5,
            marginRight:5,
            width:320,
            padding: 10,
            borderRadius:10,
            backgroundColor:"#fff"
    
          }}
          maxLength={6}
          keyboardType="number-pad"
          
          onChangeText={(value) => setOTP(value)}
          value={otp}
          placeholder='Enter Your Verification Code'
        />
          <TouchableOpacity  style={{ pending:10, width:320, margin:3,marginTop:20,backgroundColor: '#570d13',borderRadius:8,  justifyContent: "center", }}  activeOpacity={0.9} onPress={() => confimOTP()}   >
        <Text
            style={{
              fontSize: 14,
              textAlign: 'center',
              pending:10,
              marginBottom: 10,
              marginTop: 10,
              color:"#fff"
            }}>
            Verify
          </Text>
          </TouchableOpacity>
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
export default VerifyCodeScreen;