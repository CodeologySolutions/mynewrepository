// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import React, {useRef, useState, useMemo, useEffect,useCallback } from 'react';
import { DatePickerModal } from 'react-native-paper-dates'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
//import { RadioButton } from 'react-native-paper';
import { getUpdateProfile ,getUserProfile, updateProfilePic} from '../webServices/apis';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import RadioGroup from 'react-native-radio-buttons-group';

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
  ImageBackground,
  Platform
} from 'react-native';
import moment from 'moment';
import ToastManager, { Toast } from 'toastify-react-native';
import { saveDataToLocalStorage } from '../appUtils/sessionManager';
import { Constants } from '../appUtils/constants';
import * as generalSetting from '../webServices/generalSetting';


 
const ProfileScreen = (props) => {
  const radioButtons = useMemo(() => ([
    {
        id: 'male', // acts as primary key, should be unique and non-empty string
        label: 'Male',
        value: 'male'
    },
    {
        id: 'female',
        label: 'Female',
        value: 'female'
    }
]), []);
const [selectedId, setSelectedId] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [genderOptions, setGenderOptions] = useState([
    {label: 'Male', value: 0 },
    {label: 'Female', value: 1 }
  ]);

  
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("Date of Birth");
  const [pincode, setPincode] = useState("");
  const [visible, setVisible] = useState(false)
  const [visibleUploadBtn, setVisibleUploadBtn] = useState(false)

  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);

  const handleChoosePhoto = () => {
    console.log("handleChoosePhoto==>");
    launchImageLibrary({ noData: true }, (response) => {
       console.log(response);
      if (response) {
        setVisibleUploadBtn(true);
        setPhoto(response?.assets[0]);
        setPhotoUrl(response?.assets[0]?.uri)
      }
    });
  };
  const handleUploadPhoto = async () => {
    console.log("handleUploadPhoto==>");
    const data = new FormData();
    data.append('file', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });
    let response = await updateProfilePic(data);
    console.log('response::', response)
    if (response && response?.success === true) {
      setVisibleUploadBtn(false);
      
      Toast.success("Profile Photo uploaded.", 'top');
       
  }
    // fetch(`${SERVER_URL}/api/upload`, {
    //   method: 'POST',
    //   body: createFormData(photo, { userId: '123' }),
    // })
    //   .then((response) => response.json())
    //   .then((response) => {
    //     console.log('response', response);
    //   })
    //   .catch((error) => {
    //     console.log('error', error);
    //   });
  };
  const date = new Date()
  const onDismiss = useCallback(() => {
    setVisible(false)
  }, [setVisible])
  useEffect(() => {
    fetchData(); 
  }, []);
  const fetchData = async ( ) => {
    
    let res = await getUserProfile();
    console.log("res==>",res);
    if (res) {
     //res?.item?.gender ==='male' ? setGender(0) : setGender(1);
     //res?.item?.gender ==='male' ? setSelectedId('1') : setSelectedId('2');
     setSelectedId(res?.item?.gender);
      console.log("res?.item?.gender==>",res?.item?.gender);
     // console.log("genderVal==>",genderVal);
      setName(res?.item?.name);
      setEmail(res?.item?.email);
      //setGender(genderVal);
    let imageUrl=generalSetting.UPLOADED_FILE_URL+res?.item?.profilePicture?.default;

      setPhotoUrl(imageUrl)
      
      setDateOfBirth(res?.item?.dateOfBirth);
      setPincode(res?.item?.pincode);
      setPlaceOfBirth(res?.item?.placeOfBirth);
      
    }
  
  };
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
        gender: selectedId,
        placeOfBirth: placeOfBirth,
        dateOfBirth: dateOfBirth,
        pincode: pincode,
        isDetailFilled: true,
        
      };
      console.log('payload::', payload)

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
      
      <TouchableOpacity    activeOpacity={0.9} onPress={() => handleChoosePhoto()} >
      {photoUrl ? (
        <>
          <Image
            source={{ uri: photoUrl}}
            style={{ width: 100, height: 100, resizeMode: 'center',
              
             
              }}
          />
         
         
           
        </>
      ):
      <Image
            style={{
              
              height: 80,
               
              
              resizeMode: 'center',
              
              left:0,
              top:6
            }}
            source={require('../assets/images/user.png')}
          />
      }
          </TouchableOpacity>
          {visibleUploadBtn && (
            <TouchableOpacity  style={{ pending:10, width: 100, margin:3,backgroundColor: '#570d13',borderRadius:8,  justifyContent: "center", }}  activeOpacity={0.9} onPress={() => handleUploadPhoto()}   >
            <Text
                style={{
                  fontSize: 14,
                  textAlign: 'center',
                  pending:10,
                  marginBottom: 10,
                  marginTop: 10,
                  color:"#fff"
                }}>
                Upload
              </Text>
              </TouchableOpacity>
          )}
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
   
     
  }}>
  <RadioGroup 
            radioButtons={radioButtons} 
          
            onPress={(value) => {setSelectedId(value)}}
            selectedId={selectedId}
            layout={'row'}
            containerStyle={{position:"absolute", right:-20, color:"#7e1615", borderColor:"#7e1615"}}
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
export default ProfileScreen;