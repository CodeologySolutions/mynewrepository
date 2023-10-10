// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import React, {useRef, useState, useEffect } from 'react';
import { View, Modal, Image, ImageBackground, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, SafeAreaView  } from 'react-native';
import { Constants } from '../appUtils/constants';
import { RootNavigation , navigationRef, navigate} from '../rootNavigation';
import { retrieveDataFromLocalStorage,clearDataFromLocalStorage } from '../appUtils/sessionManager';
const {height, width} = Dimensions.get('window');
var sideMenuWidth =320;
var boxWidth =320;
if(width<=360){
  sideMenuWidth = parseInt(width)-30;
  boxWidth = sideMenuWidth-20
}
 
const MoreScreen = () => {
  const [userdata, setUserdata] = useState({});
  console.log("sideMenuWidth=>",sideMenuWidth );
  console.log("width=>",width );
  useEffect(async () => {
    // clearDataFromLocalStorage();
    var user_data  = await retrieveDataFromLocalStorage(Constants.key_user_data);
    setUserdata(JSON.parse(user_data));
   }, []);
   const handlLogoutButton = async () => {
    console.log("handlLogoutButton==>");
     clearDataFromLocalStorage();
    navigate(Constants.nav_login, {  });
    setModalVisible(false);     
  };
  const handleButton = (screenName) => {
    //console.log("handleButton==>",navigationRef);
    navigate(screenName, {  })
  
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E58200'}}>
    <ScrollView>
    <View style={styles.centeredView}  >
     <View style={styles.modalView}>        
            <TouchableOpacity style={{height:75, width:boxWidth}} activeOpacity={0.9} onPress={() => handleButton(Constants.nav_profile)}  >
                  <View  style={{height:75, width:boxWidth, backgroundColor: '#7e1615',borderRadius:10,flex: 1, flexDirection: 'row' }}>
                    <View style={{height:110,width:120, flex: 1, flexDirection: 'row', padding: 5, position:"relative" }}>
                        <Image style={{height:55, width:55, borderRadius:8,  flex: 1,
                          resizeMode: 'center',
                          position:"absolute",
                          tintColor:"#fff",
                          left:10,
                          top:10 }}
                          source={require('../assets/images/icons/person_icon.png')}
                          />
                          <TouchableOpacity style={{ backgroundColor: '#d90000', padding:10, borderBottomLeftRadius: 8, borderTopRightRadius: 8, position:'absolute',zIndex:99, right:0,top:0}} activeOpacity={0.9} onPress={() => handleButton(Constants.nav_user_upgrade)}  >
                          <Text style={{ fontSize: 14 ,color:"#FFFFFF" , } } >{"Upgrade"}</Text>
                          </TouchableOpacity>
                          <View style={{ flex: 2, flexDirection: 'row', padding: 5, position:"relative",height:30 ,left:60, top:20 }}>
                         
                              <Text style={{ fontSize: 16 ,color:"#fff" , padding:5, borderBottomRightRadius: 8,
                              borderBottomLeftRadius: 8, position:'absolute',zIndex:8, bottom:20, width:"100%", fontWeight:"bold"}} >{userdata?.name}</Text>                              
                          </View>
                    </View>
                  </View>
            </TouchableOpacity>
     
        <View  style={{height:50, width:sideMenuWidth, margin:10, flex: 1, flexDirection: 'row' ,marginBottom:10  }}     >

        
       

        <View style={{ height:50, width:165, flexDirection: 'row', padding: 5, position:"relative",backgroundColor: '#fff',borderRadius:10 ,marginRight:10 }} >
            <Image style={{height:28, width:28, borderRadius:8,  flex: 1,
              resizeMode: 'center',
              position:"absolute",                  
              left:10,
              top:10 }}
              source={require('../assets/images/icons/icons-3.png')}
               />
              <View style={{ flex: 2, flexDirection: 'row', padding: 5, position:"relative",height:30 ,left:35, top:23 }}>

                  <Text style={{ fontSize: 16 ,color:"#000" ,   padding:5, borderBottomRightRadius: 8,
                  borderBottomLeftRadius: 8, position:'absolute',zIndex:8, bottom:20, width:"100%", fontWeight:"bold" } } >Rashifal</Text>
              
              </View>
        </View>
       
        <TouchableOpacity style={{ height:50,  width:165,flex: 2, flexDirection: 'row', padding: 5, position:"relative",backgroundColor: '#fff',borderRadius:10 }} onPress={() => handleButton(Constants.nav_panchangam_list)} activeOpacity={0.9}>
        <Image style={{height:28, width:28, borderRadius:8,  flex: 1,
          resizeMode: 'center',
          position:"absolute",
          
          left:10,
          top:10 }}
          source={require('../assets/images/icons/icons-2.png')}
           />
          <View style={{ flex: 2, flexDirection: 'row', padding: 5, position:"relative",height:30 ,left:35, top:23 }}>
              <Text style={{ fontSize: 16 ,color:"#000" ,   padding:5, borderBottomRightRadius: 8,
              borderBottomLeftRadius: 8, position:'absolute',zIndex:8, bottom:20, width:"100%", fontWeight:"bold" }} >Panchangam</Text>
          
          </View>
    </TouchableOpacity>

        
        
        
    </View >
    <View  style={{height:50,   width:320, margin:10, flex: 1, flexDirection: 'row' }}     >

        
       

    <TouchableOpacity style={{ height:50,  width:165,  flexDirection: 'row', padding: 5, position:"relative",backgroundColor: '#fff',borderRadius:10 ,marginRight:10 }} onPress={() => handleButton(Constants.nav_stotra_list)} activeOpacity={0.9}>
        <Image style={{height:28, width:28, borderRadius:8,  flex: 1,
          resizeMode: 'center',
          position:"absolute",
          
          left:10,
          top:10 }}
          source={require('../assets/images/icons/icons-1.png')}
           />
          <View style={{ flex: 2, flexDirection: 'row', padding: 5, position:"relative",height:30 ,left:35, top:23 }}>
              <Text style={{ fontSize: 16 ,color:"#000" ,   padding:5, borderBottomRightRadius: 8,
              borderBottomLeftRadius: 8, position:'absolute',zIndex:8, bottom:20, width:"100%", fontWeight:"bold" } } >Stotras</Text>
          
          </View>
    </TouchableOpacity>
   
    <View style={{ height:50,  width:165,flex: 2, flexDirection: 'row', padding: 5, position:"relative",backgroundColor: '#fff',borderRadius:10 }}>
    <Image style={{height:28, width:28, borderRadius:8,  flex: 1,
      resizeMode: 'center',
      position:"absolute",          
      left:10,
      top:10 }}
      source={require('../assets/images/icons/icons-4.png')}
       />
      <View style={{ flex: 2, flexDirection: 'row', padding: 5, position:"relative",height:30 ,left:35, top:23 }}>
          <Text style={{ fontSize: 16 ,color:"#000" ,   padding:5, borderBottomRightRadius: 8,
          borderBottomLeftRadius: 8, position:'absolute',zIndex:8, bottom:20, width:"100%", fontWeight:"bold" }} >Kundli</Text>
      
      </View>
</View>

    
    
    
</View >
  


        <View style={{backgroundColor: '#fff', width:width,  alignItems: 'center'}}>
        <TouchableOpacity  style={{height:75, width:boxWidth, margin:10,backgroundColor: '#f2f2f2',borderRadius:10 }}  activeOpacity={0.9} onPress={() => handleButton(Constants.nav_alarm)}   >

        {/* Wrapper - All Tournaments Main View */}
       <TouchableOpacity style={{  position:'absolute',zIndex:8, right:-7,top:15}}  activeOpacity={0.9}    >   
        <Image
                style={{
                  width: 46,
                  height: 46,
                  tintColor:"#6b141a",
                 
                  resizeMode: 'center',
                 
                }}
                source={require('../assets/images/icons/right_arrow.png')}
              />
              </TouchableOpacity> 

        <View style={{height:110, flex: 1, flexDirection: 'row', padding: 5, position:"relative" }}>
            <Image style={{height:55, width:55, borderRadius:8,  flex: 1,
               
              position:"absolute",
              left:10,
              top:10 }}
              source={require('../assets/images/icons/your-alarm.png')}
               />
              <View style={{ flex: 2, flexDirection: 'row', padding: 5, position:"relative",height:30 ,left:60, top:20 }}>
              <Text style={{ fontSize: 16 ,color:"#6b141a" ,   padding:5, borderBottomRightRadius: 8,
              borderBottomLeftRadius: 8, position:'absolute',zIndex:8, bottom:20, width:"100%", fontWeight:"bold" }} >Your Alarm</Text>
              <View style={{ flex: 1, flexDirection: 'row', padding: 5, position:"relative",height:30 }}>
        
            <Text style={{ top:4, left:0,position:"absolute", fontSize: 14 , color:"#000",flexWrap: 'wrap', width:180} } >Alarm Has Been Set To 6 AM</Text>
        </View>
        </View>
        </View>
       

        
        
        
    </TouchableOpacity>
    <TouchableOpacity  style={{height:60, width:boxWidth, margin:10, backgroundColor: '#f2f2f2', borderRadius:10, }}  activeOpacity={0.9}   >

    {/* Wrapper - All Tournaments Main View */}
   <TouchableOpacity style={{  position:'absolute',zIndex:8, right:0,top:12}}  activeOpacity={0.9} onPress={() => handleButton(Constants.nav_alarm)}    >   
    <Image
            style={{
              width: 32,
              height: 32,
              tintColor:"#6b141a",
             
              resizeMode: 'center',
             
            }}
            source={require('../assets/images/icons/right_arrow.png')}
          />
          </TouchableOpacity> 

    <View style={{height:110, flex: 1, flexDirection: 'row', padding: 5, position:"relative" }}>
        <Image style={{height:30, width:30, borderRadius:8,  flex: 1,
          resizeMode: 'center',
          position:"absolute",
          left:10,
          top:14 }}
          source={require('../assets/images/icons/content-language.png')}
           />
          <View style={{ flex: 2, flexDirection: 'row', padding: 5, position:"relative",height:30 ,left:50, top:20 }}>
          <Text style={{ fontSize: 16 ,color:"#000" ,   padding:5, borderBottomRightRadius: 8,
          borderBottomLeftRadius: 8, position:"absolute",zIndex:8, bottom:10, width:"100%", fontWeight:"bold" }} >Content Language</Text>
          
    </View>
    </View>
   
</TouchableOpacity >
    <TouchableOpacity  style={{height:60, width:boxWidth, margin:10,backgroundColor: '#f2f2f2',borderRadius:10, }}  activeOpacity={0.9}   >

        {/* Wrapper - All Tournaments Main View */}
       <TouchableOpacity style={{  position:'absolute',zIndex:8, right:0,top:12}}  activeOpacity={0.9}    >   
        <Image
                style={{
                  width: 32,
                  height: 32,
                  tintColor:"#6b141a",                     
                  resizeMode: 'center',
                 
                }}
                source={require('../assets/images/icons/right_arrow.png')}
              />
              </TouchableOpacity> 

        <View style={{height:110, flex: 1, flexDirection: 'row', padding: 5, position:"relative" }}>
            <Image style={{height:30, width:30, borderRadius:8,  flex: 1,
              resizeMode: 'center',
              position:"absolute",
              left:10,
              top:14 }}
              source={require('../assets/images/icons/rate-the-app.png')}
               />
              <View style={{ flex: 2, flexDirection: 'row', padding: 5, position:"relative",height:30 ,left:50, top:20 }}>
              <Text style={{ fontSize: 16 ,color:"#000" ,   padding:5, borderBottomRightRadius: 8,
              borderBottomLeftRadius: 8, position:"absolute",zIndex:8, bottom:10, width:"100%", fontWeight:"bold" }} >Rate the App</Text>
              
        </View>
        </View>
    </TouchableOpacity >
    
<TouchableOpacity  style={{height:60, width:boxWidth, margin:10,backgroundColor: '#f2f2f2',borderRadius:10, }}  activeOpacity={0.9}   >

{/* Wrapper - All Tournaments Main View */}
<TouchableOpacity style={{  position:'absolute',zIndex:8, right:0,top:12}}  activeOpacity={0.9}    >   
<Image
        style={{
          width: 32,
          height: 32,
          tintColor:"#6b141a",
         
          resizeMode: 'center',
         
        }}
        source={require('../assets/images/icons/right_arrow.png')}
      />
      </TouchableOpacity> 

<View style={{height:110, flex: 1, flexDirection: 'row', padding: 5, position:"relative" }}>
    <Image style={{height:30, width:30, borderRadius:8,  flex: 1,
      resizeMode: 'center',
      position:"absolute",
      left:10,
      top:14 }}
      source={require('../assets/images/icons/share-the-app.png')}
       />
      <View style={{ flex: 2, flexDirection: 'row', padding: 5, position:"relative",height:30 ,left:50, top:20 }}>
      <Text style={{ fontSize: 16 ,color:"#000" ,   padding:5, borderBottomRightRadius: 8,
      borderBottomLeftRadius: 8, position:"absolute",zIndex:8, bottom:10, width:"100%", fontWeight:"bold" }} >Share the App</Text>
      
</View>
</View>

</TouchableOpacity >
<TouchableOpacity  style={{height:60, width:boxWidth, margin:10,backgroundColor: '#f2f2f2',borderRadius:10, }}  activeOpacity={0.9} onPress={() => handleButton(Constants.nav_profile)}  >

{/* Wrapper - All Tournaments Main View */}
<TouchableOpacity style={{  position:'absolute',zIndex:8, right:0,top:12}}  activeOpacity={0.9}  onPress={() => handleButton(Constants.nav_profile)}  >   
<Image
    style={{
      width: 32,
      height: 32,
      tintColor:"#6b141a",
     
      resizeMode: 'center',
     
    }}
    source={require('../assets/images/icons/right_arrow.png')}
  />
  </TouchableOpacity> 

<View style={{height:110, flex: 1, flexDirection: 'row', padding: 5, position:"relative" }}>
<Image style={{height:30, width:30, borderRadius:8,  flex: 1,
  resizeMode: 'center',
  position:"absolute",
  left:10,
  top:14 }}
  source={require('../assets/images/icons/account-settings.png')}
   />
  <View style={{ flex: 2, flexDirection: 'row', padding: 5, position:"relative",height:30 ,left:50, top:20 }}>
  <Text style={{ fontSize: 16 ,color:"#000" ,   padding:5, borderBottomRightRadius: 8,
  borderBottomLeftRadius: 8, position:"absolute",zIndex:8, bottom:10, width:"100%", fontWeight:"bold" }} >Account Settings</Text>
  
</View>
</View>





</TouchableOpacity >
<TouchableOpacity  style={{height:60, width:boxWidth, margin:10,backgroundColor: '#f2f2f2',borderRadius:10, }}  activeOpacity={0.9} onPress={() => handleButton(Constants.nav_favourite_temple_list)}  >

{/* Wrapper - All Tournaments Main View */}
<TouchableOpacity style={{  position:'absolute',zIndex:8, right:0,top:12}}  activeOpacity={0.9}  onPress={() => handleButton(Constants.nav_favourite_temple_list)}  >   
<Image
    style={{
      width: 32,
      height: 32,
      tintColor:"#6b141a",
     
      resizeMode: 'center',
     
    }}
    source={require('../assets/images/icons/right_arrow.png')}
  />
  </TouchableOpacity> 

<View style={{height:110, flex: 1, flexDirection: 'row', padding: 5, position:"relative" }}>
<Image style={{height:30, width:30, borderRadius:8,  flex: 1,
  resizeMode: 'center',
  position:"absolute",
  tintColor:"#7e1615", 
  left:10,
  top:14 }}
  source={require('../assets/images/icons/favourite.png')}
   />
  <View style={{ flex: 2, flexDirection: 'row', padding: 5, position:"relative",height:30 ,left:50, top:20 }}>
  <Text style={{ fontSize: 16 ,color:"#000" ,   padding:5, borderBottomRightRadius: 8,
  borderBottomLeftRadius: 8, position:"absolute",zIndex:8, bottom:10, width:"100%", fontWeight:"bold" }} >Favourite Temples</Text>
  
</View>
</View>

</TouchableOpacity >
<TouchableOpacity  style={{height:60, width:boxWidth, margin:10,backgroundColor: '#f2f2f2',borderRadius:10, }}  activeOpacity={0.9}   >

{/* Wrapper - All Tournaments Main View */}
<TouchableOpacity style={{  position:'absolute',zIndex:8, right:0,top:12}}  activeOpacity={0.9}    >   
<Image
    style={{
      width: 32,
      height: 32,
      tintColor:"#6b141a",
     
      resizeMode: 'center',
     
    }}
    source={require('../assets/images/icons/right_arrow.png')}
  />
  </TouchableOpacity> 

<View style={{height:110, flex: 1, flexDirection: 'row', padding: 5, position:"relative" }}>
<Image style={{height:30, width:30, borderRadius:8,  flex: 1,
  resizeMode: 'center',
  position:"absolute",
  left:10,
  top:14 }}
  source={require('../assets/images/icons/support.png')}
   />
  <View style={{ flex: 2, flexDirection: 'row', padding: 5, position:"relative",height:30 ,left:50, top:20 }}>
      <Text style={{ fontSize: 16 ,color:"#000" ,   padding:5, borderBottomRightRadius: 8,
      borderBottomLeftRadius: 8, position:"absolute",zIndex:8, bottom:10, width:"100%", fontWeight:"bold" } } >Support</Text>
      
  </View>
</View>
</TouchableOpacity >
<TouchableOpacity  style={{height:60, width:boxWidth, margin:10,backgroundColor: '#f2f2f2',borderRadius:10, }}  activeOpacity={0.9} onPress={() => handlLogoutButton()}  >

{/* Wrapper - All Tournaments Main View */}
<TouchableOpacity style={{  position:'absolute',zIndex:8, right:0,top:12}}  activeOpacity={0.9}    >   
<Image
    style={{
      width: 32,
      height: 32,
      tintColor:"#6b141a",
     
      resizeMode: 'center',
     
    }}
    source={require('../assets/images/icons/right_arrow.png')}
  />
  </TouchableOpacity> 

<View style={{height:110, flex: 1, flexDirection: 'row', padding: 5, position:"relative" }}>
<Image style={{height:30, width:30, borderRadius:8,  flex: 1,
  resizeMode: 'center',
  position:"absolute",
  left:10,
  top:14 }}
  source={require('../assets/images/icons/logout.png')}
   />
  <View style={{ flex: 2, flexDirection: 'row', padding: 5, position:"relative",height:30 ,left:50, top:20 }}>
  <Text style={{ fontSize: 16 ,color:"#000" ,   padding:5, borderBottomRightRadius: 8,
  borderBottomLeftRadius: 8, position:"absolute",zIndex:8, bottom:10, width:"100%", fontWeight:"bold" }} >Logout</Text>
  
</View>
</View>





</TouchableOpacity >
        </View>
      </View>
    </View>
    </ScrollView>
  </SafeAreaView>
);
}
const styles = StyleSheet.create({
       
  modalView: {
    width:"100%",
    height:"100%",
    margin: 0,
    backgroundColor: '#E58200',
    borderRadius: 0,
    padding: 20,
    alignItems: 'center',
   

  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default MoreScreen;