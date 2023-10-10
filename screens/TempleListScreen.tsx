// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import React, {useRef, useState, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView,FlatList, Image,TouchableOpacity, TextInput,ScrollView,RefreshControl } from 'react-native';
import TempleItem from '../components/templeItem';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
const templeData = require('../templeData.json');
import { Constants } from '../appUtils/constants';
import {  
  getTempleByCategory,
   
} from "../webServices/apis";
type ItemData = {
  _id: string;
  name: string;
  image: string;
  latitude: string;
  longitude: string;
  location: string;
};

//const DATA: ItemData[] = templeData;

const TempleListScreen = (props) => {
  const { category, searchText } = props.route.params;
  const [text, onChangeText] = useState('');
  const [categoryData, setCategoryData] = useState({});
  const [templeData1, setTempleData] = useState<ItemData>([]);
  const [userLat, setUserLat] = useState(17.361719);
  const [userLong, setUserLong] = useState(78.475166);
  //const [searchText, setSearchText] = useState("");
  const [showSearchError, setShowSearchError] = useState(false);
  const [isShowTempleDetails, setIsShowTempleDetails] = useState(false);
  const [templeId, setTempleId] = useState("");
  const [refreshing, setRefreshing] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
 
 fetchData();
    
 setRefreshing(false);
    //fetchLevelData();
  }, []);
  const onSubmitEditing = () => {
    setIsLoading(true);
    console.log("onSubmitEditing");
    fetchData();
    
    setRefreshing(false);
    
  }
  const handleBackButton = () => {
    props.navigation.goBack();
    
  }
  const handleHomeButton = () => {
    props.navigation.navigate(Constants.nav_bottom_navigation, {  })
     
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setCategoryData([]);
    setTempleData([]);
    onChangeText('');
    setTimeout(() => { 
      fetchData();
      setRefreshing(false);
    },1000);
  }, []);
  const fetchData = async () => {
     
    let payload={};
    if(category!=='neartemple'){
      payload.category=category;
    }else{
      console.log("global.userLocation==>",global.userLocation)
      if(global.userLocation && global.userLocation.latitude){
        payload.latitude= global.userLocation.latitude;
        payload.longitude= global.userLocation.longitude;
      }
     
       
    } 
    if(text.length>0){
      payload.searchText=text;
    }
    if(searchText && searchText.length>0){
      payload.searchText=searchText;
      onChangeText(searchText);
    }
    let res = await getTempleByCategory(payload);
    if (res) {
      console.log(res?.list);
      setTempleData(res?.list);
      setCategoryData(res?.category);
      setIsLoading(false);
    }
  };
  const moveToSingleTemple = (id) => {
    props.navigation.navigate(Constants.nav_temple_detail, { id:id  })
}
const renderItem = ({item}: {item: ItemData}) => {
     
  return (
    <TempleItem
      item={item}
      onPress={() => moveToSingleTemple(item._id)}
      
    />
  );
};
  return isLoading ? <CustomActivityIndicator />: (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E58200' }}>
    <ScrollView refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
    <View style={{   flexDirection: 'row', padding: 5, position:"relative", height:30 }}>
    <TouchableOpacity style={{left:10, top:10,  flex: 1, padding:7,  position:"absolute",backgroundColor:"#7e1615" ,borderRadius:5 , zIndex:10 }}  onPress={() => handleBackButton()} activeOpacity={0.9}   >
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
      <Text style={{ top:10, left:0,position:"absolute", width:"100%",  fontSize: 16 ,flex: 2, color:"#000" , fontWeight:700, textAlign:"center" } } >{categoryData?.name ? categoryData?.name :"Temple Nearby You"}
      </Text>
      <TouchableOpacity style={{right:10, top:10,  flex: 3, padding:7,   position:"absolute" ,backgroundColor:"#7e1615",borderRadius:5, zIndex:10 }}   activeOpacity={0.9}  onPress={() => handleHomeButton()} >
      <Image
      style={{
        width: 14,
        height: 14,
        tintColor:"#ffffff",
        
        resizeMode: 'center',
       
      }}
      source={require('../assets/images/icons/home-icon.png')}
    />
    </TouchableOpacity>
    </View>

    <View style={{margin: 5}}>
      <TextInput
      style={{
        height: 40,
        marginTop:10,
        marginLeft:5,
        marginRight:5,
        
        padding: 10,
        borderRadius:10,
        backgroundColor:"#fff"

      }}
      onSubmitEditing={onSubmitEditing}
      onChangeText={onChangeText}
      value={text}
      placeholder='Search Temples'
    />
    </View>
      <View style={{ flex: 1 , padding: 16}}>
  
      <View style={{margin: 5}}>
          <FlatList
            data={templeData1}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            numColumns={3}
            horizontal={false}
            />
        
        </View>
        
        
        
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

 
export default TempleListScreen;