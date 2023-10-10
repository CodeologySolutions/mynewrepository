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
import { Constants } from '../appUtils/constants';
import { signIn ,getUserProfile} from '../webServices/apis';
const VerifyPhoneScreen = (props) => {
  const [text, onChangeText] = useState('');
  const [phonenumber, setPhonenumber] = useState("");
  const onChangePhone = (val) => {
    const result = val.replace(/\D/g, '');

    
    result.length <= 10 && setPhonenumber(result);
  };
  const onSignIn = async () => {
    let data = {
      type: "otpRequest",
      username: phonenumber
      
    };
    
    console.log("data==>",data);
  
    if (phonenumber === "") {
      Toast.error("Please enter valid mobile number");
      
    } else if (phonenumber?.length < 10) {
      Toast.error("Please enter valid mobile number" );
      
    } else {
      let response = await signIn(data);
      console.log('response::', response)
      if (response && response?.success === true) {
        props.navigation.navigate(Constants.nav_verify_code,{
          username: phonenumber
        });
       
      } else {
        console.log('err::', response)
        Toast.error(response?.data?.errors ? response?.data?.errors?.[0]?.msg : "Something Went Wrong! Please try again ..." );
        
      }
  }
  }
  const moveToVerifyCodeScreen = () => {
    props.navigation.navigate(Constants.nav_verify_code, {    })
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
            marginTop:50,
            marginBottom:60
          }}>
          <Image
                style={{
                  
                  height: 60,
                   
                  
                  resizeMode: 'center',
                  
                  left:0,
                  top:6
                }}
                source={require('../assets/images/mobile.png')}
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
            Verify Phone Number
          </Text>
          <Text
          style={{
            fontSize: 14,
            textAlign: 'center',
            marginBottom: 5,
            color:"#000"
          }}>
          Please enter your phone number
 
        </Text>
        <Text
          style={{
            fontSize: 14,
            textAlign: 'center',
            marginBottom: 10,
            color:"#000"
          }}>
          
to receive one time password
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
          maxLength={10}
          keyboardType="number-pad"
          onChangeText={(value) => setPhonenumber(value)}
          value={phonenumber}
          placeholder='Enter Your Mobile Number'
        />
          <TouchableOpacity  style={{ pending:10, width:320, margin:3,marginTop:20,backgroundColor: '#570d13',borderRadius:8,  justifyContent: "center", }}  activeOpacity={0.9} onPress={() => onSignIn()}   >
        <Text
            style={{
              fontSize: 14,
              textAlign: 'center',
              pending:10,
              marginBottom: 10,
              marginTop: 10,
              color:"#fff"
            }}>
            Send OTP
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
export default VerifyPhoneScreen;