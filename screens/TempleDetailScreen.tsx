// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import React, {useRef, useState, useEffect } from 'react';
import { View, Text, SafeAreaView,FlatList, Image,TouchableOpacity, TextInput,ScrollView, Linking, Dimensions , Platform } from 'react-native';
import moment from 'moment';
import ToastManager, { Toast } from 'toastify-react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import TempleItem from '../components/templeItem';
const templeData = require('../templeData.json');
import TempleBoxItem from '../components/templeBoxItem';
import StotraItem from '../components/stotraItem';
import AccordionItem from '../components/AccordionItem';
import * as generalSetting from '../webServices/generalSetting';
import Distance from '../components/Distance';
import { Constants } from '../appUtils/constants';
import EventBoxItem from '../components/eventBoxItem';
import UserImageItem from '../components/userImageItem';

import {
 
  setTempleUserFavourite,
  getTempleUserFavourite,
  getGeoLocation,
  getNewsEvents,
  getTempleByCategory,
  getStotras,
  getTempleDetails,
  getTemplePujas,
  saveUserTempleImage,
  getUserTempleImageList,
  
} from "../webServices/apis";

type UserImageItemData = {
  _id: string;
  temple: string;
   image: {
		default: string;
		small: string;
		medium: string;
		large: string;
	};
  user: string;
  createdBy: string;  
};
type ItemData = {
  _id: string;
  name: string;
  image: string;
  latitude: string;
  longitude: string;
  location: string;
};
type StotraItemData = {
  _id: string;
  name: string;
  isActive: boolean;
  image: string;
  description: string;
  audioLink: string;
  createdAt: string;
  updatedAt: string;
};
type EventItemData = {
  _id: string;
  name: string;
  image: string;
  eventDate: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  temple:ItemData;
};
//const DATA: ItemData[] = templeData;
const {height, width} = Dimensions.get('window');
var imgWidth =375;
if(width<375){
  imgWidth = parseInt(width)-10;
} 

const TempleDetailScreen = (props) => {
 // console.log("props===>",props);
  const [templedistance, setTempledistance] = useState(0);
  const [templeDetail, setTempleDetail] = useState(0);
  const [templeData1, setTempleData] = useState<ItemData>([]);
  const [eventData, setEventData] = useState<EventItemData>([]);
  const [templePujas, setTemplePujas] = useState([]);
  const [templeActivePujas, setTempleActivePujas] = useState([]);
  const [templeUserImages, setTempleUserImages] = useState<UserImageItemData>([]);
   
  const [stotraDataNew, setStotraData] = useState<StotraItemData>([]);
  const [userLat, setUserLat] = useState(17.361719);
  const [userLong, setUserLong] = useState(78.475166);
  const [showMore, setShowMore] = useState(false);
  const [isShowTempleMap, setIsShowTempleMap] = useState(false);
  const [isTempleFavourite, setIsTempleFavourite] = useState(false);
  useEffect(() => {
   
        // navigator.geolocation.getCurrentPosition(function(position) {
        //   setUserLat(position.coords.latitude);
        //   setUserLong(position.coords.longitude);
          
        //   // console.log("Latitude is :", position.coords.latitude);
    
        //   // console.log("Longitude is :", position.coords.longitude);
    
        // },async function(error) {
        //     setUserLat(17.361719);
        //     setUserLong(78.475166);
          
        // });
        fetchData(props.route.params.id);
        fetchTempleUserFavouriteData(props.route.params.id);
        fetchTempleUserImagesData(props.route.params.id);
        fetchStotraData();
        //fetchLevelData();
      }, [props.route.params.id]);
      
      const groupArrayByDate = arr => [...new Set(arr.map(e => e.devta))].map(devta => ({ devta: devta, pujas: arr.filter(e => e.devta === devta).map(e => Object.entries(e).filter(f => f[0] !== 'devta')).map(f => Object.fromEntries(f)) }));
    
      const fetchData = async (id) => {
 
        let res = await getTempleDetails(id);
        if (res) {
         
          setTempleDetail(res?.item);
        }
        let payload={skip:0,limit:20};
        let res1 = await getTempleByCategory(payload);
        if (res1) {
          
          setTempleData(res1?.list);
        }
        let payload1={temple:id};
        //let payload1={};
        let res2 = await getNewsEvents(payload1);
        if (res2) {
          
          setEventData(res2?.list);
        }
        let payload2={temple:id};
        
        let res3 = await getTemplePujas(payload2);
        if (res3) {
        
            
            const grouped = groupArrayByDate(res3?.list);
          //  console.log("grouped==>",grouped)
            
          setTemplePujas(grouped);
          if(grouped && grouped.length>0){
            setTempleActivePujas(grouped[0].pujas)
          }
         
        }
      };
      
      const fetchStotraData = async () => {
  
        let payload={};
        let res = await getStotras(payload);
        if (res) {
          
            setStotraData(res?.list);
        }
      };
      const moveToStotraList = () => {
        props.navigation.navigate(Constants.nav_stotra_list, {   })
       
      }
      const handleChangeActivePujas = (devta) => {
        var selectedPujas= templePujas.filter(element => element.devta == devta);
        
        setTempleActivePujas(selectedPujas[0].pujas)
        
      }
      const handleBackButton = () => {
        props.navigation.goBack();
        
      }
      const handleHomeButton = () => {
        props.navigation.navigate(Constants.nav_bottom_navigation, {  })
         
      }
      const moveToSingleStotra = (id) => {
        props.navigation.navigate(Constants.nav_stotra_detail, { id:id  })
      }
      const setFavourite = async (id) => {
        let payload={temple:id};
        if(isTempleFavourite==false){
          payload.favourite=true;
        }else{
          payload.favourite=false;

        }
        console.log("setFavourite==payload==>",payload);
        
        let res2 = await setTempleUserFavourite(payload);
        console.log("setFavourite==>",res2);
        if (res2) {
          if(res2?.success==true){
            setIsTempleFavourite(true);
          }         
          //setEventData(res2?.list);
        }
        
       // props.navigation.navigate(Constants.nav_stotra_detail, { id:id  })
      }  
      const fetchTempleUserFavouriteData = async (id) => {
  
        let payload={temple:id};
        let res = await getTempleUserFavourite(payload);
        if (res) {
          setIsTempleFavourite(res?.item?.isFavourite);
          console.log("res==>",res);
           // setStotraData(res?.list);
        }
      };
      const moveToTempleList = () => {
        props.navigation.navigate(Constants.nav_temple_list, {   })
      
      }
const handleClick = async (url) => {
  Linking.canOpenURL(url).then(supported => {
    console.log("how to open URI: " + supported+ "Open URL"+url);

    if (supported) {
      Linking.openURL(url);
    } else {
      console.log("Don't know how to open URI: " + url);
    }
  });
};
const moveToSingleTemple = (id) => {
  props.navigation.navigate(Constants.nav_temple_detail, { id:id  })
  
}
const moveToSingleTempleMap = (id) => {
  props.navigation.navigate(Constants.nav_temple_map_detail, { id:id  })
  
}
const moveToEventList = () => {
  props.navigation.navigate(Constants.nav_event_list, {   })
 
}

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
    data.append('temple',props.route.params.id);
    console.log("data==>",data);

    let response = await saveUserTempleImage(data);
    console.log('response::', response)
    if (response && response?.success === true) {
      setPhotoUrl(null);
      await fetchTempleUserImagesData(props.route.params.id);
      Toast.success("Image uploaded successfully.", 'top');
       
  }
};

const fetchTempleUserImagesData = async (id) => {
  
  let payload={temple:id};
  let res = await getUserTempleImageList(payload);
  if (res) {
   
    console.log("TempleUserImages==>",res?.list);
    setTempleUserImages(res?.list);
  }
};
const openFullImage = () => {
  console.log("openFullImage");
 
}
const renderUserImageItem = ({item}: {item: UserImageItemData}) => {
     
  return (
    <UserImageItem
      item={item}
      onPress={() => openFullImage(item)}
      
    />
  );
};
const renderItem = ({item}: {item: ItemData}) => {
     
  return (
    <TempleItem
      item={item}
      onPress={() => moveToSingleTemple(item._id)}
      
    />
  );
};

const renderStotraItem = ({item}: {item: StotraItemData}) => {
       
 
  return (
    <StotraItem
      item={item}
      onPress={() => moveToSingleStotra(item._id)}
      
    />
  );
};
const renderBoxItem = ({item}: {item: ItemData}) => {
 

  return (
    <TempleBoxItem
      item={item}
      onPress={() => moveToSingleTemple(item._id)}
      
    />
  );
};
const renderEventItem = ({item}: {item: EventItemData}) => {
    return (
    <EventBoxItem
      item={item}
      onPress={() => moveToEventList()}
      
    />
  );
};
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E58200' }}>
    <ScrollView >
    <View style={{   flexDirection: 'row', padding: 5, position:"relative", height:30 }}>
    <TouchableOpacity style={{left:10, top:10,  flex: 1, padding:7,  position:"absolute",backgroundColor:"#7e1615" ,borderRadius:5 }}   activeOpacity={0.9} onPress={() => handleBackButton()}   >
    <Image
        style={{
          width: 14,
          height: 14,
          tintColor:"#ffffff",         
          resizeMode: 'center',
        }}
        source={require('../assets/images/icons/back_arrow_icon.png')}
      />
      </TouchableOpacity>
      <Text style={{ top:10, left:45,position:"absolute", width:300,  fontSize: 16 ,flex: 2, color:"#000" , fontWeight:700, textAlign:"center" , height:50 } } >{templeDetail?.name}
      </Text>
      {isTempleFavourite ?  <TouchableOpacity style={{right:10, top:10,  flex: 1, padding:7,  position:"absolute",borderRadius:5 }}   activeOpacity={0.9} onPress={() => setFavourite(templeDetail?._id)}   >
      <Image
          style={{
            width: 24,
            height: 24,
            tintColor:"#7e1615",         
            resizeMode: 'center',
          }}
          source={require('../assets/images/icons/favourite.png')}
        />
        </TouchableOpacity> : 
      <TouchableOpacity style={{right:10, top:10,  flex: 1, padding:7,  position:"absolute",borderRadius:5 }}   activeOpacity={0.9} onPress={() => setFavourite(templeDetail?._id)}   >
      <Image
          style={{
            width: 24,
            height: 24,
            tintColor:"#ffffff",         
            resizeMode: 'center',
          }}
          source={require('../assets/images/icons/favourite.png')}
        />
        </TouchableOpacity>
        }
    </View>
{/*backgroundColor:"#7e1615" , */}
    <View style={{   flexDirection: 'row', padding: 5, marginTop:10, position:"relative",height:30 }}>
    <Image
        style={{
          width: 14,
          height: 14,
          
          flex: 1,
          resizeMode: 'center',
          position:"absolute",
          left:10,
          top:10
        }}
        source={require('../assets/images/icons/map.png')}
      />
      <Text style={{ top:7, left:24,position:"absolute", fontSize: 14 ,flex: 2, color:"#212529",fontWeight:500} } > {templeDetail?.location}</Text>
       
      
    </View>
    <View style={{margin: 5, marginLeft:10, marginRight:10}}>
      <Text style={{ color:"#212529", fontSize: 12}}>
      {templeDetail?.deityDetails}
      </Text>
    </View>
    <View style={{   flexDirection: 'row', padding: 5,   position:"relative",height:40 ,   }}>
    
    <TouchableOpacity style={{ }}   activeOpacity={0.9} onPress={() => moveToSingleTempleMap(templeDetail?._id)}  >
    <Text style={{ flex: 1, fontSize: 11 ,color:"#FFFFFF" ,  backgroundColor: '#d90000',  borderTopLeftRadius: 8, borderBottomRightRadius: 8, position:'absolute', left:10,top:7, paddingTop:4, paddingBottom:8, paddingLeft:10, paddingRight:10, marginBottom:10} } >{global.userLocation.latitude ? <Distance latitude={templeDetail.latitude} longitude={templeDetail.longitude} /> :"0 km"}</Text>
</TouchableOpacity>
      <Text style={{ top:7, left:80,position:"absolute", fontSize: 14 ,flex: 2, color:"#212529",fontWeight:500} } > From your location</Text>
       
      
    </View>
    <View style={{margin: 5,marginTop:10, alignItems: 'center'}}>
    <Image
    style={{
      width: imgWidth,
      height: 210,
    }}
    source={{
      uri: generalSetting.UPLOADED_FILE_URL+templeDetail?.image
    }}
  />
    </View>
    <View style={{margin: 10,backgroundColor: '#ffd8a1',borderRadius:10,padding:10}}>
    <Text style={{ color:"#000", fontSize: 14, fontWeight:700}}>About Temple
    </Text>
      <Text style={{ color:"#212529", fontSize: 12}}>
      { templeDetail?.mythology ?
        showMore ? templeDetail?.mythology : templeDetail?.mythology.substring(0, 100)
      :""}
     
      </Text>
      <TouchableOpacity style={{ backgroundColor: '#d60',borderRadius:10,padding:10, marginTop:10, width:100 }}   activeOpacity={0.9} onPress={() => setShowMore(!showMore)} >
      <Text style={{ color:"#fff", fontSize: 14 ,fontWeight:"bold"}}> {showMore ? "Know less" : "Know more"} </Text>
      </TouchableOpacity>
    </View>

      <View style={{ margin: 10,  backgroundColor: '#ffd8a1',borderRadius:10,padding:10}}>
      <Text style={{ color:"#000", fontSize: 14, fontWeight:700, }}>Template Details
      </Text>
      <View style={{ marginTop:10,backgroundColor: '#7e1615',borderRadius:10,padding:10}}>
      {templePujas && templePujas.length>0 ?     
      <AccordionItem title="Puja List" imageUrl='https://codeologyforall.in/templeapi/uploads/darshan.png'>
          
          {templePujas && templePujas.length>0 ? 
            <>
            <Text style={{  color:"#fff" ,fontWeight:"bold" ,marginBottom:10  }}>Select Deity
          </Text>
          <View style={{flexDirection: 'row'}}>

          {templePujas && templePujas.length>0 && templePujas.map((newItem,index) => {
            return (
              <TouchableOpacity style={{ backgroundColor:"#e79620",  padding:10, borderRadius:20, marginLeft:10}}   activeOpacity={0.9} onPress={() => handleChangeActivePujas(newItem?.devta)} >
              <Text style={{ color:"#fff", fontSize: 14 ,fontWeight:"bold" }} >{newItem?.devta}</Text>
              </TouchableOpacity>
             
              
            )
         })}
         </View>
         <View style={{marginTop:10}}>

          {templeActivePujas && templeActivePujas.length>0 && templeActivePujas.map((newItem,index) => {
            return (
              <Text style={{  width:"100%", margin:10,backgroundColor: '#ffd8a1',borderRadius:10, padding:10, fontSize:16, fontWeight:"bold" }}   >{newItem?.pujaName}</Text>
              
            )
         })}
         </View>
         </>
          : <Text style={{ color:"#fff", fontSize: 14 ,fontWeight:"bold" }} >Content will be updated soon</Text>}
          </AccordionItem> : <></>}
          {eventData && eventData.length>0 ? 
          <AccordionItem title="Up Coming Events" imageUrl='https://codeologyforall.in/templeapi/uploads/prasadam.png'>
          {eventData && eventData.length>0 ? 
            <FlatList
          data={eventData}
          renderItem={renderEventItem}
          keyExtractor={item => item._id}
        
          horizontal={true}
          showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
          />: <Text style={{ color:"#fff", fontSize: 14 ,fontWeight:"bold" }} >Content will be updated soon</Text>}
          </AccordionItem>: <></>}
          <AccordionItem title="Link to Media" imageUrl='https://codeologyforall.in/templeapi/uploads/donations.png'>
          {(templeDetail?.facebookLink && templeDetail?.facebookLink !=="") || (templeDetail?.youtubeLink && templeDetail?.youtubeLink !=="")  || (templeDetail?.instagramLink && templeDetail?.instagramLink !=="") || (templeDetail?.websiteLink && templeDetail?.websiteLink !=="")  ?  <>
            {templeDetail?.facebookLink ?  <TouchableOpacity  style={{height:45, width:"100%", margin:10,backgroundColor: '#ffd8a1',borderRadius:10, }}  activeOpacity={0.9} onPress={() => {
              Linking.openURL(templeDetail?.facebookLink);
            }}  >
              <View style={{  flex: 1, flexDirection: 'row', padding: 5, position:"relative" }}>
                  <Image style={{height:30, width:30, borderRadius:8,  flex: 1,
                    resizeMode: 'center',
                    position:"absolute",
                    left:10,
                    top:10 }}
                    source={require('../assets/images/icons/facebook.png')}
                     />
                    <View style={{ flex: 2, flexDirection: 'row', padding: 5, position:"relative",height:30 ,left:40, top:20 }}>
                        <Text style={{ fontSize: 16 ,color:"#000" ,   padding:5, borderBottomRightRadius: 8,
                        borderBottomLeftRadius: 8, position:'absolute',zIndex:8, bottom:15, width:"100%", fontWeight:"bold" } } >Facebook.com</Text>
                    </View>
              </View>
          </TouchableOpacity > :""} 
          {templeDetail?.youtubeLink ?  <TouchableOpacity  style={{height:45, width:"100%", margin:10,backgroundColor: '#ffd8a1',borderRadius:10, }}  activeOpacity={0.9} onPress={()=>{Linking.openURL(templeDetail?.youtubeLink)}}  >
          <View style={{  flex: 1, flexDirection: 'row', padding: 5, position:"relative" }}>
              <Image style={{height:30, width:30, borderRadius:8,  flex: 1,
                resizeMode: 'center',
                position:"absolute",
                left:10,
                top:10 }}
                source={require('../assets/images/icons/youtube.png')}
                 />
                <View style={{ flex: 2, flexDirection: 'row', padding: 5, position:"relative",height:30 ,left:40, top:20 }}>
                    <Text style={{ fontSize: 16 ,color:"#000" ,   padding:5, borderBottomRightRadius: 8,
                    borderBottomLeftRadius: 8, position:'absolute',zIndex:8, bottom:15, width:"100%", fontWeight:"bold" } } >Youtube.com</Text>
                </View>
          </View>
      </TouchableOpacity > :""} 
      {templeDetail?.instagramLink ?  <TouchableOpacity  style={{height:45, width:"100%", margin:10,backgroundColor: '#ffd8a1',borderRadius:10, }}  activeOpacity={0.9} onPress={()=>{Linking.openURL(templeDetail?.instagramLink)}}  >
      <View style={{  flex: 1, flexDirection: 'row', padding: 5, position:"relative" }}>
          <Image style={{height:30, width:30, borderRadius:8,  flex: 1,
            resizeMode: 'center',
            position:"absolute",
            left:10,
            top:10 }}
            source={require('../assets/images/icons/inst.png')}
             />
            <View style={{ flex: 2, flexDirection: 'row', padding: 5, position:"relative",height:30 ,left:40, top:20 }}>
                <Text style={{ fontSize: 16 ,color:"#000" ,   padding:5, borderBottomRightRadius: 8,
                borderBottomLeftRadius: 8, position:'absolute',zIndex:8, bottom:15, width:"100%", fontWeight:"bold" } } >Instagram.com</Text>
            </View>
      </View>
  </TouchableOpacity > :""} 
  {templeDetail?.websiteLink ?  <TouchableOpacity  style={{height:45, width:"100%", margin:10,backgroundColor: '#ffd8a1',borderRadius:10, }}  activeOpacity={0.9} onPress={()=>{Linking.openURL(templeDetail?.websiteLink)}}  >
  <View style={{  flex: 1, flexDirection: 'row', padding: 5, position:"relative" }}>
      <Image style={{height:30, width:30, borderRadius:8,  flex: 1,
        resizeMode: 'center',
        position:"absolute",
        left:10,
        top:10 }}
        source={require('../assets/images/icons/website.png')}
         />
        <View style={{ flex: 2, flexDirection: 'row', padding: 5, position:"relative",height:30 ,left:40, top:20 }}>
            <Text style={{ fontSize: 16 ,color:"#000" ,   padding:5, borderBottomRightRadius: 8,
            borderBottomLeftRadius: 8, position:'absolute',zIndex:8, bottom:15, width:"100%", fontWeight:"bold" } } >Website</Text>
        </View>
  </View>
</TouchableOpacity > :""} 
</> 
: <Text style={{ color:"#fff", fontSize: 14 ,fontWeight:"bold" }} >Content will be updated soon</Text>}
       
</AccordionItem>
{templeDetail?.preparation  && templeDetail?.preparation !=="" ?    
          <AccordionItem title="Preparation to visit temple" imageUrl='https://codeologyforall.in/templeapi/uploads/events.png'>
          {templeDetail?.preparation  && templeDetail?.preparation !=="" ?    
          <Text style={{fontSize: 14, color:"#fff"}}>{templeDetail?.preparation}</Text> 
        : <Text style={{ color:"#fff", fontSize: 14 ,fontWeight:"bold" }} >Content will be updated soon</Text>}

          </AccordionItem>
          :<></>}
        
        </View>
        
        
        
      </View>

      <View style={{ margin: 10,  backgroundColor: '#ffd8a1',borderRadius:10,padding:10}}>
     
      <Text style={{ color:"#000", fontSize: 14 ,fontWeight:"bold" }} >User Gallery</Text>
       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {photoUrl && (
        <>
          <Image
            source={{ uri: photoUrl }}
            style={{ width: 100, height: 100 }}
          />
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
              Upload Photo
            </Text>
            </TouchableOpacity>
          
        </>
      )}
      <TouchableOpacity  style={{ pending:10, width: 100, margin:3,backgroundColor: '#570d13',borderRadius:8,  justifyContent: "center", }}  activeOpacity={0.9} onPress={() => handleChoosePhoto()}   >
      <Text
          style={{
            fontSize: 14,
            textAlign: 'center',
            pending:10,
            marginBottom: 10,
            marginTop: 10,
            color:"#fff"
          }}>
          Choose Photo
        </Text>
        </TouchableOpacity>
        </View>

      {templeUserImages ?  <View style={{marginTop: 10}}>
        <FlatList
          data={templeUserImages}
          renderItem={renderUserImageItem}
          keyExtractor={item => item._id}
        
          horizontal={true}
          showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
          />
      
      </View>:<></>}

    </View>
     
      

      <View style={{ flex: 1, margin: 8, backgroundColor:"#c0640d",padding:10, borderRadius:8}}>
    
    <View style={{ flex: 1, flexDirection: 'row', padding: 5, position:"relative",height:30 , textAlign: 'left', fontWeight:"bold",color:"#fff" }}>
    <Text style={{ top:4, left:4,position:"absolute", fontSize: 16 ,flex: 1, color:"#FFFFFF" , fontWeight:"bold"} } > Stotras</Text>
    <TouchableOpacity style={{  flex: 2, position:"absolute",
    right:0,
    top:6 }}  activeOpacity={0.9}  onPress={() => moveToStotraList( )} >   
    <Image
            style={{
              width: 24,
              height: 24,
              tintColor:"#ffffff",
            
              resizeMode: 'center',
            
            }}
            source={require('../assets/images/icons/right_arrow.png')}
          />
          </TouchableOpacity>
            
        </View>
    <View style={{margin: 0}}>
      <FlatList
        data={stotraDataNew}
        renderItem={renderStotraItem}
        keyExtractor={item => item.id}
      
        horizontal={true}
        showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
        />
    
    </View>
</View>

<View style={{ flex: 1, padding: 10 }}>
        
    <View style={{ flex: 1, flexDirection: 'row', padding: 5, position:"relative",height:30 , textAlign: 'left', fontWeight:"bold",color:"#fff" }}>
    <Text style={{ top:4, left:4,position:"absolute", fontSize: 16 ,flex: 1, color:"#FFFFFF" , fontWeight:"bold"} } > Temple Nearby You </Text>
    <TouchableOpacity style={{  flex: 2, position:"absolute",
    right:0,
    top:6 }}  activeOpacity={0.9}  onPress={() => moveToTempleList( )} >   
    <Image
            style={{
              width: 24,
              height: 24,
              tintColor:"#ffffff",
            
              resizeMode: 'center',
            
            }}
            source={require('../assets/images/icons/right_arrow.png')}
          />
          </TouchableOpacity>
            
        </View>



<View style={{margin: 5}}>
  <FlatList
    data={templeData1}
    renderItem={renderBoxItem}
    keyExtractor={item => item._id}
  
    horizontal={true}
    showsVerticalScrollIndicator={false}
  showsHorizontalScrollIndicator={false}
    />

</View>
</View>   
     
      
 
 
       
      </ScrollView>
    </SafeAreaView>
  );
}

 
export default TempleDetailScreen;