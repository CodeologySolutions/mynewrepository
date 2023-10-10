// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import React, {useRef, useState, useEffect,useCallback } from 'react';
import { DatePickerModal } from 'react-native-paper-dates';


//import { RadioButton } from 'react-native-paper';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { getUpdateProfile ,getUserProfile} from '../webServices/apis';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  TextInput,
  Image,
  Button,
  ImageBackground
} from 'react-native';
import moment from 'moment';
import ToastManager, { Toast } from 'toastify-react-native'
import { saveDataToLocalStorage } from '../appUtils/sessionManager';
import { Constants } from '../appUtils/constants';
const UserProfileScreen = (props) => {
  const [otp, setOTP] = useState('');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [genderOptions, setGenderOptions] = useState([
    {label: 'Male', value: 'male' },
    {label: 'Female', value: 'female' }
  ]);
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("Date of Birth");
  const [pincode, setPincode] = useState("");
  const [visible, setVisible] = useState(false)
 
  const date = new Date()
  const onDismiss = useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const onChange = useCallback(({ date }) => {
    setVisible(false)
    var datestring = moment(date).format('YYYY-MM-DD').toString();
    setDateOfBirth(datestring);
    console.log({ date })
  }, [])
  const onSubmit = async () => {
    var d1 = new Date(dateOfBirth); 
var d2 = new Date(); 
var diff = d2.getTime() - d1.getTime(); 

//var years = (diff / 31536000000).toFixed(0);
var years = (diff / 31536000000) ;

   // var years = new Date(new Date() - new Date(dateOfBirth)).getFullYear() - 1970;
    console.log("years==>",years);
    if (name === "") {
      Toast.error("Please enter valid name.");
      
    } else if(years<12.01){

      Toast.error("Please enter valid Date Of Birth.");
    } else{
      let payload = {
      
        name: name,
        email: email,
        gender: gender,
        placeOfBirth: placeOfBirth,
        dateOfBirth: dateOfBirth,
        pincode: pincode,
        isDetailFilled: true,
        
      };
      let response = await getUpdateProfile(payload);
      console.log('response::', response)
      if (response && response?.success === true) {
        Toast.success("Profile updated.", 'top');
        let res1 = await getUserProfile();
        console.log("res1==>",res1);
        if (res1) {
          saveDataToLocalStorage(Constants.key_user_data, JSON.stringify(res1?.item))
         
        }
        props.navigation.navigate(Constants.nav_bottom_navigation, {    })
      }

    }
 
  }
  return (
   
    <SafeAreaView style={styles.main}>
    <ToastManager />
    <ScrollView >
    
    <ImageBackground source={{uri:"https://codeologyforall.in/templeapi/uploads/main-bg.jpg"}} resizeMode="cover" style={{
        flex: 1,
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
        marginTop:10,
        marginBottom:10
      }}>
  

      <Image
            style={{
              
              height: 80,
               
              
              resizeMode: 'center',
              
              left:0,
              top:6
            }}
            source={require('../assets/images/user.png')}
          />
       
          </View>
          <View
          style={{
            marginTop: 10,
            alignItems: 'center',
           
          }}>
      <Text
        style={{
          fontSize: 25,
          textAlign: 'center',
          marginBottom: 16,
          color:"#000",
           

        }}>
        User Details
      </Text>
      <Text
      style={{
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 5,
        color:"#000",
        fontWeight:"bold"
      }}>
     

    </Text>
    
    
    </View>
    <View
      style={{
        
        alignItems: 'center',
        marginTop:0,
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
      maxLength={50}
      keyboardType="default"
      
      onChangeText={(value) => setName(value)}
      value={name}
      placeholder='Full Name'
    />
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
      maxLength={30}
      keyboardType="email-address"
      
      onChangeText={(value) => setEmail(value)}
      value={email}
      placeholder='Email ID (Optional)'
    />
    <View style={{
      position:"relative",
      alignItems:'flex-start',
      marginTop:12,
      marginBottom:30,
      backgroundColor:"#fff"
       
    }}>
      <RadioForm
      radio_props={genderOptions}
      initial={gender}
      buttonColor={'#7e1615'}
      selectedButtonColor={'#7e1615'}
    animation={true}
    buttonStyle={{margin:0}}
    buttonSize={15}
    style={{position:"absolute", right:10}}
      onPress={(value) => {setGender(value)}}
      formHorizontal={true}
      
    />
    
      </View>
     
    
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
      maxLength={30}
       
      
      onChangeText={(value) => setPlaceOfBirth(value)}
      value={placeOfBirth}
      placeholder='Place of Birth'
    />
    
    <DatePickerModal
    mode="single"
    visible={visible}
    onDismiss={onDismiss}
    date={date}
    onConfirm={onChange}
    saveLabel="Save" // optional
    label="Select date" // optional
    animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
  />
  <TouchableOpacity   style={{pending:10, 
    width:320, margin:3,
    marginTop: 10,
     backgroundColor: '#fff',
    borderRadius:10,
   
    color:"#000" }}  activeOpacity={0.9}  onPress={() => setVisible(true)}  >
  <Text
      style={{
        fontSize: 14,
        marginLeft: 10,
        marginBottom: 10,
        marginTop: 10,
        pending:10,
        color:"#000"
      }}>
     {dateOfBirth} 
    </Text>
    </TouchableOpacity>
 
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
      
      onChangeText={(value) => setPincode(value)}
      value={pincode}
      placeholder='Pincode'
    />
      <TouchableOpacity  style={{ pending:10, width:320, margin:3,marginTop:20,backgroundColor: '#570d13',borderRadius:8,  justifyContent: "center", }}  activeOpacity={0.9} onPress={() => onSubmit()}   >
    <Text
        style={{
          fontSize: 14,
          textAlign: 'center',
          pending:10,
          marginBottom: 10,
          marginTop: 10,
          color:"#fff"
        }}>
        Submit
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

  }
});
export default UserProfileScreen;