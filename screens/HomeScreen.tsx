// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import React, {useRef, useState, useEffect,useCallback } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
  RefreshControl,
  ImageBackground,
  Dimensions,
  Pressable,
  TextInput,
  Modal,
  Alert
} from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import * as generalSetting from '../webServices/generalSetting';
const calendarData = require('../calendar.json');
const drikPanchang2023 = require('../drikPanchang2023.json');
const templeData = require('../templeData.json');
const categories = require('../categories.json');
import TempleItem from '../components/templeItem';
import TempleBoxItem from '../components/templeBoxItem';
import StotraItem from '../components/stotraItem';
import CalendarBoxItem from '../components/calendarBoxItem';
import PackageTourItem from './../components/packageTourItem';
import EventBoxItem from './../components/eventBoxItem';
import CustomHeader from '../components/customHeader'
import * as RootNavigation from './rootNavigation';
import { Constants } from '../appUtils/constants';
import moment from 'moment';
import Geocoder from 'react-native-geocoding';
Geocoder.init("AIzaSyBmMZRSWnfJdOw6Y3ZMANFXX2ta6Z9G4pM");
import Geolocation from 'react-native-geolocation-service';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

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
 
 

import {
 
  saveUserAddress,
  getUserAddressList,
  getGeoLocation,
  getGeoDistance,
  getBanners,
  getTempleByCategory,
  getStotras,
  getVideos,
  getCategories,
  getUserProfile,
  getNewsEvents
} from "../webServices/apis";

type CategoryItemData = {
  _id: string;
  name: string;
  isActive: boolean;
  image: string;
  code: string;
  createdAt: string;
  updatedAt: string;
};
const categoryData : CategoryItemData[]=categories;
type PanchangItemData = {
  dtstart: string;
  dtend: string;
  dtstamp: string;
  organizer: string;
  uid: string;
  attendee: string;
  created: string;
  description: string;
  "last-modified": string;
  location: string;
  sequence: string;
  status: string;
  summary: string;
  transp: string;
};
type CalendarItemData = {
  monyear: string;
  date: string;
  festname: string;
  id: string;
};
const calendar : CalendarItemData[]=calendarData;
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
const DATA: ItemData[] = templeData;
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
type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = ({item, onPress, backgroundColor, textColor}: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
  </TouchableOpacity>
);

//const WIDTH = Dimensions.get('window').width;
//const HEIGHT = Dimensions.get('window').height;
const WIDTH =260;
const HomeScreen = ( props) => {
  const placesRef = useRef();
  const getAddress = () => {
   // console.log("getAddress==>",placesRef.current?.getAddressText());
  };
//  console.log("props==>",props);
const [modalVisible, setModalVisible] = useState(false);
  const [panchangData, setPanchangData] = useState("");
  const [currentDate, setCurrentDate] = useState(moment().format());

  const [userLat, setUserLat] = useState(17.361719);
  const [userLong, setUserLong] = useState(78.475166);
  const [userLat1, setUserLat1] = useState(0);
  const [userLong1, setUserLong1] = useState(0);
  const [userAddress, setUserAddress] = useState("");
  const [userCity, setUserCity] = useState("Hyderabad");
  const [userState , setUserState] = useState("Telangana");
  const [userCountry, setUserCountry] = useState("");
  const [userAddressLine1, setUserAddressLine1] = useState("");
  const [userArea, setUserArea] = useState("Pathar Gatti");
  const [bannerList, setBannersData] = useState([]);
  const [templeData1, setTempleData] = useState<ItemData>([]);
  const [templeData2, setTempleData2] = useState<ItemData>([]);
  const [templeFastivalData, setFastivalTempleData] = useState<ItemData>([]);
  const [templeKuladDevathaData, setKuladDevathaTempleData] = useState<ItemData>([]);
  const [newsEventsData, setNewsEventsData] = useState<EventItemData>([]);
  const [stotraData1, setStotraData] = useState<StotraItemData>([]);
  const [templeGramaData, setGramaTempleData] = useState<ItemData>([]);
  const [templePeakData, setPeakTempleData] = useState<ItemData>([]);
  const [templeFamousData, setFamousTempleData] = useState<ItemData>([]);
  const [templeRecentData, setRecentTempleData] = useState<ItemData>([]);
  const [calenderData, setCalendarData] = useState([]);
  const [calenderDataSelected, setCalenderDataSelected] = useState(null);
  const [goToSlide, setGoToSlide] = useState(0);
  const [offsetRadius, setOffsetRadius] = useState(4);
  const [showNavigation, setShowNavigation] = useState(false);
  const [config, setConfig] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [sliderImages, setSliderImages] = useState([]);
 
  const [devitionalToursData, setDevitionalToursData] = useState<CategoryItemData>([]);

  const [refreshing, setRefreshing] = useState(true);
  const [userCustomLat, setUserCustomLat] = useState(0);
  const [userCustomLong, setUserCustomLong] = useState(0);
  const [userCustomAddress, setUserCustomAddress] = useState("");
  const [userCustomAddressLabel, setUserCustomAddressLabel] = useState("");
  const [userCustomAddressList, setUserCustomAddressList] = useState([]);
  const [userCustomCity, setUserCustomCity] = useState("");
  const [userCustomState, setUserCustomState] = useState("");


    //Fetch list
    useEffect(() => {
      getLocation();
    //  setLoading(true)
      
  }, [global.locationPermission])
  const [location, setLocation] = useState(false);
  // function to check permissions and get Location
  const getLocation = async () => {

  // console.log('getLocation HomeScreen locationPermission', global.locationPermission);
//   console.log('getLocation HomeScreen userLocation ', global.userLocation);
   if(global.locationPermission){
    Geocoder.from(global.userLocation.latitude, global.userLocation.longitude)
    .then(response => {
   //   console.log("response==>",response);
      const address = response.results[0].formatted_address;
              let addressLine1, area, city, state, country;
              for (let i = 0; i < response.results[0].address_components.length; i++) {
                for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                  switch (response.results[0].address_components[i].types[j]) {
                    case "route":
                      addressLine1 = response.results[0].address_components[i].long_name;
                      break;
                      case "sublocality_level_1":
                        area = response.results[0].address_components[i].long_name;
                        break;
                        case "locality":
                          city = response.results[0].address_components[i].long_name;
                          break;
                    case "administrative_area_level_1":
                      state = response.results[0].address_components[i].long_name;
                      break;
                    case "country":
                      country = response.results[0].address_components[i].long_name;
                      break;
                  }
                }
              }
              setUserAddress(address);
              setUserCity(city);
              setUserState(state);
              setUserCountry(country);
              setUserArea(area);
              setUserAddressLine1(addressLine1);
            var addressComponent = response.results[0].address_components[0];
     // console.log("addressComponent==>",addressComponent);
    })
    .catch(error => console.warn(error));
  }
    
  };

   
 
 
const onRefresh = useCallback(() => {
  setRefreshing(true);
  setBannersData([]);
  setTempleData2([]);
  setFastivalTempleData([]);
  setNewsEventsData([]);
  setStotraData([]);
  setPeakTempleData([]);
  setFamousTempleData([]);
  setRecentTempleData([]);
  setCalendarData([]);
  setDevitionalToursData([]);
  setTimeout(() => {
    fetchNewsEventsData();
    fetchBannersData();
    fetchCategoriesData();
    fetchFastivalTempleData();
    fetchStotraData();
    fetchPeakTempleData();
    fetchFamousTempleData();
    fetchRecentTempleData();
    fetchCalendarData();
    fetchPanchangData();
    setRefreshing(false);
  },1000);
}, []);
 
 useEffect(() => {
 // console.log("global.userLocation==>",global.userLocation)
 if(global.userLocation && global.userLocation.latitude){
 // console.log("global.userLocation.latitude==>",global.userLocation.latitude)
  fetchData(global.userLocation.latitude, global.userLocation.longitude);
 }
      fetchNewsEventsData();
      fetchBannersData();
      fetchCategoriesData();
      fetchFastivalTempleData();
      fetchStotraData();
      fetchPeakTempleData();
      fetchFamousTempleData();
      fetchRecentTempleData();
      fetchCalendarData();
      setRefreshing(false);
}, [])
  useEffect(() => {
    fetchPanchangData();
  }, [drikPanchang2023])
  const moveToTempleList = (category) => {
    
    props.navigation.navigate(Constants.nav_temple_list, {  category:category })
   
  }
  const moveToSingleTemple = (id) => {
    props.navigation.navigate(Constants.nav_temple_detail, { id:id  })
  }
  const moveToStotraList = () => {
    props.navigation.navigate(Constants.nav_stotra_list, {   })
   
  }
  const moveToEventList = () => {
    props.navigation.navigate(Constants.nav_event_list, {   })
   
  }
  const moveToCalendar = () => {
    props.navigation.navigate(Constants.nav_calendar, {   })
   
  }
  const moveToPackageTourList = () => {
    props.navigation.navigate(Constants.nav_package_tour_list, {   })
   
  }
  const moveToPanchangamList = () => {
    props.navigation.navigate(Constants.nav_panchangam_list, {   })
   
  }
  
  const moveToSingleStotra = (id) => {
    props.navigation.navigate(Constants.nav_stotra_detail, { id:id  })
  }
const fetchPanchangData = async ( ) => {
   
  var datestring = moment(currentDate).format('YYYY-MM-DD').toString();
  var cData= drikPanchang2023.filter(element => element.dtstart == datestring);
  setPanchangData(cData[0]?.summary);
};
const fetchBannersData = async () => {
  let payload={};
  let res = await getBanners(payload);
  if (res) {
  //  console.log("res==>",res);
    setBannersData(res?.list);
    
    let copy = [];
    res?.list.forEach(function (item) {
        copy.push( generalSetting.UPLOADED_FILE_URL+item.image);
    });
    setSliderImages(copy);
  }
};
const applySearchedLocation = async () => {
 
  if(userCustomLat>0){
    global.userLocation.latitude=userCustomLat;
  }

  if(userCustomLong>0){
      global.userLocation.longitude=userCustomLong;
  }
  fetchData(userCustomLat, userCustomLong);
 
  setUserCity(userCustomCity);
  setUserState(userCustomState);
  setModalVisible(false);
};
const saveUserAddressData = async () => {
 
  let payload={};
 
  if(userCustomLat>0){
    payload.latitude=userCustomLat;
  }
    if(userCustomLong>0){
    payload.longitude=userCustomLong;
  }
  if(userCustomAddress.length>0){
    payload.address=userCustomAddress;
  }
  if(userCustomAddressLabel.length>0){
    payload.name=userCustomAddressLabel;
  }
  let res = await saveUserAddress(payload);
  if (res) {
    
    fetchUserAddressData();
  }
};
const fetchUserAddressData = async () => {

  let payload={};
  let res = await getUserAddressList(payload);
  if (res) {
    
    setUserCustomAddressList(res?.list);
  }
};
const fetchNewsEventsData = async () => {

      let payload={};
      let res = await getNewsEvents(payload);
      if (res) {
        
        setNewsEventsData(res?.list);
      }
    };
const fetchCategoriesData = async () => {
 
  let payload={};
  let res = await getCategories(payload);
  if (res) {
    
    setDevitionalToursData(res?.list);
  }
};

const fetchGeoLocationData = async () => {
  let payload={};
  let res = await getGeoLocation(payload);
  if (res) {
    //console.log("res==>",res);
  }
};

 

const fetchData = async (latitude,longitude) => {
  // setUserLat(position.coords.latitude);
  // setUserLong(position.coords.longitude);
  console.log("latitude,longitude==>",latitude+"=="+longitude)
  let payload={};
  payload.latitude= latitude;
  payload.longitude= longitude;
  let res = await getTempleByCategory(payload);
 // console.log("setTempleData===res1==>",res);
  if (res) {     
  
      setTempleData(res?.list);
  }
  // if(localStorage.getItem('token')){
  //   let res1 = await getUserProfile();
  //   console.log("res1==>",res1);
  //   if (res1) {
  //     localStorage.setItem('userdata', JSON.stringify(res1?.item));
     
  //   }
  // }
  
 
};

const fetchStotraData = async () => {
 
  let payload={};
  let res = await getStotras(payload);
  if (res) {
     // console.log("getStotras==>",res);
      setStotraData(res?.list);
  }
};
const fetchJyotirlingData = async () => {
  
  let payload={category:"jyotirlingas"};
  let res = await getTempleByCategory(payload);
  if (res) {
      
      setTempleData2(res?.list);
  }
};
const fetchFastivalTempleData = async  () => {
 
  let payload={category:"festival"};
  let res = await getTempleByCategory(payload);
  if (res) {
    
      setFastivalTempleData(res?.list);
  }
};
const fetchKuladDevathaTempleData = async () => {
 
  let payload={category:""};
  let res = await getTempleByCategory(payload);
  if (res) {
    
    setKuladDevathaTempleData(res?.list);
  }
};
const fetchGramaTempleData =  async () => {
 
  let payload={category:"jyotirlingas"};
  let res = await getTempleByCategory(payload);
  if (res) {
    
    setGramaTempleData(res?.list);
  }
};
const fetchPeakTempleData = async () => {
 
  let payload={category:"peak"};
  let res = await getTempleByCategory(payload);
  if (res) {
    
    setPeakTempleData(res?.list);
  }
};
const fetchFamousTempleData = async () => {
 
  let payload={category:"famous"};
      let res = await getTempleByCategory(payload);
  if (res) {
    
    setFamousTempleData(res?.list);
  }
};
const fetchRecentTempleData = async () => {
 
  let payload={category:"recent"};
  let res = await getTempleByCategory(payload);
  if (res) {
    
    setRecentTempleData(res?.list);
  }
};

 
const fetchCalendarData =  () => {
  setCalendarData(calendar);
  var datestring = moment(currentDate).format('MMMM YYYY').toString();
  calendar.forEach(function (item,index) {
   // var dateAndMonthYear = item.date+" "+item.monyear;
    var dateAndMonthYear = item.monyear;
   

   if(datestring==dateAndMonthYear){
  //  console.log("dateAndMonthYear==>",dateAndMonthYear);
    //console.log("datestring==>",datestring);
    //console.log("calenderDataSelected==>",index);
    setCalenderDataSelected(index)
   }
});
 
};
  // const [sliderImages, setSliderImages] = useState([
  //       "https://source.unsplash.com/1024x768/?nature",
  //       "https://source.unsplash.com/1024x768/?water",
  //       "https://source.unsplash.com/1024x768/?girl",
  //       "https://source.unsplash.com/1024x768/?tree"
  //     ]);


      const [selectedId, setSelectedId] = useState<string>();
      
      const renderItem = ({item}: {item: ItemData}) => {
       
    
        return (
          <TempleItem
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

      const renderCalenderBoxItem = ({item}: {item: CalendarItemData}) => {   
    
        return (
          <CalendarBoxItem
            item={item}
            onPress={() => moveToCalendar(item.id)}
            
          />
        );
      };

      const renderCategoryItem = ({item}: {item: CategoryItemData}) => {   
    
        return (
          <PackageTourItem
            item={item}
            onPress={() => moveToTempleList(item.code)}
            
          />
        );
      };


      

  return (
    <SafeAreaView style={styles.main}>
 
    <ScrollView  refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
    
    <ImageBackground source={{uri:"https://codeologyforall.in/templeapi/uploads/main-bg.jpg"}} resizeMode="cover" style={{
        flex: 1,
        position: 'absolute', left: 0, top:0,
        justifyContent: 'center',
        height:"100%",
        width:"100%"
      }}>
     
    </ImageBackground>
    <TouchableOpacity
    style={{ flex: 1, zIndex:99 }}
    activeOpacity={0.9}
    onPress={() => setModalVisible(true)}>
    <View style={{ flex: 1, flexDirection: 'row', padding: 5, position:"relative",height:30 }}>
    <Image
        style={{
          width: 14,
          height: 14,
          tintColor:"#ffffff",
          flex: 1,
          resizeMode: 'center',
          position:"absolute",
          left:10,
          top:10
        }}
        source={require('../assets/images/icons/map.png')}
      />
      <Text style={{ top:7, left:28,position:"absolute", fontSize: 14 ,flex: 2, color:"#FFFFFF"} } >{userCity}, {userState}</Text>
       
      
    </View>
    </TouchableOpacity>
  
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    style={{ justifyContent: 'flex-end', margin: 0 }}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
      setModalVisible(!modalVisible);
    }}>
   
    <View style={styles.centeredView}>
   
 
      <View style={styles.modalView}>
      
      <TouchableOpacity
      style={{ position:"absolute" ,   top:10, right:10, zIndex:9999}}
      onPress={() => setModalVisible(!modalVisible)} activeOpacity={0.9}>
      <Image
  style={{
  width: 24,
  height: 24,
  tintColor:"#6b141a",
  
  resizeMode: 'center',
  
  }}
  source={require('../assets/images/icons/close_icon.png')}
  />
    </TouchableOpacity>

      <GooglePlacesAutocomplete
      placeholder='Enter Location'
      minLength={2}
      autoFocus={true}
      returnKeyType={'default'}
      fetchDetails={true}
      styles={{
        textInputContainer: {
          width:340,
          backgroundColor: '#ffd8a1',
        },
        textInput: {
          height: 46,
          width:340,
          color: '#5d5d5d',
          fontSize: 16,
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
        listView: {
          
          zIndex: 9999,
        }
      }}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        
        setUserCustomLat(details?.geometry?.location?.lat)
        setUserCustomLong(details?.geometry?.location?.lng)
        setUserCustomAddress(details?.formatted_address)
       
              let addressLine1, area, city, state, country;
              for (let i = 0; i < details?.address_components.length; i++) {
                for (let j = 0; j < details?.address_components[i].types.length; j++) {
                  switch (details?.address_components[i].types[j]) {
                 
                        case "locality":
                          city = details?.address_components[i].long_name;
                          break;
                        case "administrative_area_level_1":
                          state = details?.address_components[i].long_name;
                          break;
                    
                  }
                }
              }
          
              setUserCustomCity(city);
              setUserCustomState(state);
             
              
        console.log("details.formatted_address==>", details?.formatted_address);
        console.log("details==>", details);
        console.log("details?.geometry?.location==>", details?.geometry?.location);
      }}
      query={{
        key: 'AIzaSyBmMZRSWnfJdOw6Y3ZMANFXX2ta6Z9G4pM',
        language: 'en',
      }}
     // ref={placesRef}
    />
    <TouchableOpacity  style={{ pending:10, width:320, margin:3,marginTop:5,backgroundColor: '#570d13',borderRadius:8,  justifyContent: "center", }}  activeOpacity={0.9} onPress={() => applySearchedLocation()}   >
  <Text
      style={{
        fontSize: 14,
        textAlign: 'center',
        pending:10,
        marginBottom: 10,
        marginTop: 10,
        color:"#fff"
      }}>
      Apply
    </Text>
    </TouchableOpacity>
    {userCustomLat>0 ? 
    <View
    style={{
      flex:1,
      alignItems: 'center',
      marginTop:10,
      marginBottom:10
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
    keyboardType="default"
    onChangeText={(value) => setUserCustomAddressLabel(value)}
    value={userCustomAddressLabel}
    placeholder='Enter Your Address Label'
  />
  <Text style={{
    fontSize: 18,
    textAlign: 'center',
    pending:10,
    marginBottom: 10,
    marginTop: 10,
    color:"#000"
  }} >{userCustomAddress}</Text> 
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
      Save
    </Text>
    </TouchableOpacity>
  </View>
:<></>}
       {/* <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.textStyle}>Hide Modal</Text>
    </Pressable> */}
      </View>
    </View>
  </Modal>


    <SliderBox images={sliderImages} 
    sliderBoxHeight={180}
     dotColor="#FFF"
    inactiveDotColor="#fab211"
    paginationBoxVerticalPadding={20}
    autoplay
    circleLoop
    resizeMethod={'resize'}
    resizeMode={'cover'}
    paginationBoxStyle={{
      position: "absolute",
      bottom: 0,
      padding: 0,
      alignItems: "center",
      alignSelf: "center",
      justifyContent: "center",
      paddingVertical: 10
    }}
    dotStyle={{
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 0,
      padding: 0,
      margin: 0,
      backgroundColor: "rgba(128, 128, 128, 0.92)"
    }}
    ImageComponentStyle={{borderRadius: 15, width: '96%', marginTop: 5}}
    imageLoadingColor="#2196F3"
    autoplayInterval={5000}
   />
   <View style={{ flex: 1, padding: 10 }}>
        
        <View style={{ flex: 1, flexDirection: 'row', padding: 5, position:"relative",height:30 , textAlign: 'left', fontWeight:"bold",color:"#fff" }}>
        <Text style={{ top:4, left:4,position:"absolute", fontSize: 16 ,flex: 1, color:"#FFFFFF" , fontWeight:"bold"} } > Temple Nearby You </Text>
        <TouchableOpacity style={{  flex: 2, position:"absolute",
        right:0,
        top:6 }}  activeOpacity={0.9}  onPress={() => moveToTempleList("neartemple")} >   
        <Image
                style={{
                  width: 28,
                  height: 28,
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
            keyExtractor={item => item.id}
          
            horizontal={true}
            showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
            />
        
        </View>
   </View>
   <View style={{ flex: 1, margin: 8, backgroundColor:"#7e1615",padding:10, borderRadius:8}}>
   <View style={{ flex: 1, flexDirection: 'row', padding: 5, position:"relative",height:30 , textAlign: 'left', fontWeight:"bold",color:"#fff" }}>
   <Text style={{ top:4, left:4,position:"absolute", fontSize: 16 ,flex: 1, color:"#FFFFFF" , fontWeight:"bold"} } > Stotras</Text>
   <TouchableOpacity style={{  flex: 2, position:"absolute",
   right:0,
   top:6 }}  activeOpacity={0.9}  onPress={() => moveToStotraList( )} >   
   <Image
           style={{
             width: 28,
             height: 28,
             tintColor:"#ffffff",
           
             resizeMode: 'center',
           
           }}
           source={require('../assets/images/icons/right_arrow.png')}
         />
         </TouchableOpacity>
           
       </View>
        <View style={{margin: 0}}>
          <FlatList
            data={stotraData1}
            renderItem={renderStotraItem}
            keyExtractor={item => item.id}
          
            horizontal={true}
            showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
            />
        
        </View>
   </View>
   <View style={{ flex: 1, padding: 10 }}>
          
        <View style={{ flex: 1, flexDirection: 'row', padding: 5, position:"relative",height:30 , textAlign: "left", fontWeight:"bold",color:"#fff" }}>
        <Text style={{ top:4, left:4,position:"absolute", fontSize: 16 ,flex: 1, color:"#FFFFFF" , fontWeight:"bold"} } >News & Events</Text>
        <TouchableOpacity style={{  flex: 2, position:"absolute",
        right:0,
        top:6 }}  activeOpacity={0.9}  onPress={() => moveToEventList( )} >   
        <Image
                style={{
                  width: 28,
                  height: 28,
                  tintColor:"#ffffff",
                
                  resizeMode: 'center',
                
                }}
                source={require('../assets/images/icons/right_arrow.png')}
              />
              </TouchableOpacity>
                
            </View>
        <View style={{margin: 5}}>
          <FlatList
            data={newsEventsData}
            renderItem={renderEventItem}
            keyExtractor={item => item._id}
          
            horizontal={true}
            showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
            />
        
        </View>
   </View>
   <View style={{ flex: 1, padding: 10 }}>
      
        <View style={{ flex: 1, flexDirection: 'row', padding: 5, position:"relative",height:30 , textAlign: 'left', fontWeight:"bold",color:"#fff" }}>
        <Text style={{ top:4, left:0,position:"absolute", fontSize: 16 ,flex: 1, color:"#FFFFFF" , fontWeight:"bold"} } >Festival Based Temples </Text>
        <TouchableOpacity style={{  flex: 2, position:"absolute",
        right:0,
        top:6 }}  activeOpacity={0.9}  onPress={() => moveToTempleList( "festival")} >   
        <Image
                style={{
                  width: 28,
                  height: 28,
                  tintColor:"#ffffff",
                 
                  resizeMode: 'center',
                 
                }}
                source={require('../assets/images/icons/right_arrow.png')}
              />
              </TouchableOpacity>
                
            </View>
        <View style={{margin: 5}}>
          <FlatList
            data={templeFastivalData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          
            horizontal={true}
            showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
            />
        
        </View>
   </View>
      <View style={{ flex: 1, padding: 10 }}>
       
        <View style={{ flex: 1, flexDirection: 'row', padding: 5, position:"relative",height:30 , textAlign: 'left', fontWeight:"bold",color:"#fff" }}>
        <Text style={{ top:4, left:0,position:"absolute", fontSize: 16 ,flex: 1, color:"#FFFFFF" , fontWeight:"bold"} } >Calendar </Text>
        <TouchableOpacity style={{  flex: 2, position:"absolute",
        right:0,
        top:6 }}  activeOpacity={0.9}  onPress={() => moveToCalendar()} >   
        <Image
                style={{
                  width: 28,
                  height: 28,
                  tintColor:"#ffffff",
                 
                  resizeMode: 'center',
                 
                }}
                source={require('../assets/images/icons/right_arrow.png')}
              />
              </TouchableOpacity>
                
            </View>
        <View style={{margin: 5}}>
          {
            calenderDataSelected !=null ? 
          <>
          <FlatList
            data={calendar}
            renderItem={renderCalenderBoxItem}
            keyExtractor={item => item.id}
            horizontal={true}
            initialScrollIndex={calenderDataSelected}
            
            pagingEnabled = { true }
            getItemLayout={(data, index) => ({
              length: WIDTH,
              offset: WIDTH * index,
              index,
            })}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            /></> : "" }
        
        </View>
   </View>
   <View style={{ flex: 1, padding: 10 }}>
     
        <View style={{ flex: 1, flexDirection: 'row', padding: 5, position:"relative",height:30 , textAlign: 'left', fontWeight:"bold",color:"#fff" }}>
        <Text style={{ top:4, left:0,position:"absolute", fontSize: 16 ,flex: 1, color:"#FFFFFF" , fontWeight:"bold"} } >  Recently Added Temples </Text>
        <TouchableOpacity style={{  flex: 2, position:"absolute",
        right:0,
        top:6 }}  activeOpacity={0.9}  onPress={() => moveToTempleList("recent")} >   
        <Image
                style={{
                  width: 28,
                  height: 28,
                  tintColor:"#ffffff",
                 
                  resizeMode: 'center',
                 
                }}
                source={require('../assets/images/icons/right_arrow.png')}
              />
              </TouchableOpacity>
                
            </View>
        <View style={{margin: 5}}>
          <FlatList
            data={templeRecentData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          
            horizontal={true}
            showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
            />
        
        </View>
   </View>
       <View style={{ flex: 1, padding: 10 }}>
       <View style={{ flex: 1, flexDirection: 'row', padding: 5, position:"relative",height:30 , textAlign: 'left', fontWeight:"bold",color:"#fff" }}>
       <Text style={{ top:4, left:0,position:"absolute", fontSize: 16 ,flex: 1, color:"#FFFFFF" , fontWeight:"bold"} } >   {"Today's Panchangam"}</Text>
       <TouchableOpacity style={{  flex: 2, position:"absolute",
       right:0,
       top:6 }}  activeOpacity={0.9}  onPress={() => moveToPanchangamList()} >   
       <Image
               style={{
                 width: 28,
                 height: 28,
                 tintColor:"#ffffff",
                
                 resizeMode: 'center',
                
               }}
               source={require('../assets/images/icons/right_arrow.png')}
             />
             </TouchableOpacity>
               
           </View>
       
        <View style={{margin: 5}}>
       {panchangData && panchangData.length>0 ? <TouchableOpacity style={{height:90, width:"100%", margin:3,backgroundColor: '#ffd8a1',borderRadius:10, }}  activeOpacity={0.9} onPress={() => moveToPanchangamList()}  >
        <Text style={{ fontSize: 16 ,color:"#6b141a" ,   padding:5, fontWeight:600,marginLeft:10} } >{moment(currentDate).format('Do MMM YYYY')}</Text>       
        <Text style={{ fontSize: 12 ,color:"#000" ,   padding:5,marginLeft:10} } > {panchangData}</Text>
        </TouchableOpacity>: ""}
        
        </View>
   </View>
    <View style={{ flex: 1, padding: 10 }}>
          
        <View style={{ flex: 1, flexDirection: 'row', padding: 5, position:"relative",height:30 , textAlign: 'left', fontWeight:"bold",color:"#fff" }}>
        <Text style={{ top:4, left:0,position:"absolute", fontSize: 16 ,flex: 1, color:"#FFFFFF" , fontWeight:"bold"} } >   Famous Temples </Text>
        <TouchableOpacity style={{  flex: 2, position:"absolute",
        right:0,
        top:6 }}  activeOpacity={0.9}  onPress={() => moveToTempleList("famous" )} >   
        <Image
                style={{
                  width: 28,
                  height: 28,
                  tintColor:"#ffffff",
                 
                  resizeMode: 'center',
                 
                }}
                source={require('../assets/images/icons/right_arrow.png')}
              />
              </TouchableOpacity>
                
            </View>
        <View style={{margin: 5}}>
          <FlatList
            data={templeFamousData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          
            horizontal={true}
            showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
            />
        
        </View>
   </View>
   <View style={{ flex: 1, margin: 8, backgroundColor:"#ffd8a1",padding:10, borderRadius:8}}>
   <View style={{ flex: 1, flexDirection: 'row', padding: 5, position:"relative",height:30 , textAlign: 'left', fontWeight:"bold",color:"#fff" }}>
   <Text style={{ top:4, left:0,position:"absolute", fontSize: 16 ,flex: 1, color:"#000" , fontWeight:"bold"} } >   Package Tours </Text>
   <TouchableOpacity style={{  flex: 2, position:"absolute",
   right:0,
   top:6 }}  activeOpacity={0.9}  onPress={() => moveToPackageTourList( )} >   
   <Image
           style={{
             width: 28,
             height: 28,
             tintColor:"#000",
            
             resizeMode: 'center',
            
           }}
           source={require('../assets/images/icons/right_arrow.png')}
         />
         </TouchableOpacity>
           
       </View>
  
        <View style={{margin: 0}}>
          <FlatList
            data={devitionalToursData}
            renderItem={renderCategoryItem}
            keyExtractor={item => item._id}
          
            horizontal={true}
            showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
            />
        
        </View>
   </View>
   <View style={{ flex: 1, padding: 10 }}>
       
        <View style={{ flex: 1, flexDirection: 'row', padding: 5, position:"relative",height:30 , textAlign: 'left', fontWeight:"bold",color:"#fff" }}>
        <Text style={{ top:4, left:0,position:"absolute", fontSize: 16 ,flex: 1, color:"#FFFFFF" , fontWeight:"bold"} } >   Temples with Peak Days and Peak Hours </Text>
        <TouchableOpacity style={{  flex: 2, position:"absolute",
        right:0,
        top:6 }}  activeOpacity={0.9}  onPress={() => moveToTempleList("peak" )} >   
        <Image
                style={{
                  width: 28,
                  height: 28,
                  tintColor:"#ffffff",
                 
                  resizeMode: 'center',
                 
                }}
                source={require('../assets/images/icons/right_arrow.png')}
              />
              </TouchableOpacity>
                
            </View>
        <View style={{margin: 5}}>
          <FlatList
            data={templePeakData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          
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

  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end'
   // justifyContent: 'center',
    //alignItems: 'center',
   // marginTop: "22",
    
  },
  modalView: {
     
    margin: 0,
    zIndex:99999,
    backgroundColor: '#ffd8a1',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width:"100%",
    height:"60%",
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
export default HomeScreen;