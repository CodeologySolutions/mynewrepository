// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import React, {useRef, useState, useEffect } from 'react';
import { View, Text, SafeAreaView,FlatList, Image,TouchableOpacity, TextInput,ScrollView } from 'react-native';
import EventFullBoxItem from '../components/eventFullBoxItem';
const templeData = require('../templeData.json');
import { Constants } from '../appUtils/constants';
import EventBoxItem from '../components/eventBoxItem';

import {  
  getNewsEvents,
   
} from "../webServices/apis";
type ItemData = {
  _id: string;
  name: string;
  image: string;
  latitude: string;
  longitude: string;
  location: string;
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

const EventScreen = (props) => {
  const {searchText } = props.route.params;

  const [text, onChangeText] = useState('');
  const [newsEventsData, setNewsEventsData] = useState<EventItemData>([]);

  useEffect(() => {
    fetchData();
    

    //fetchLevelData();
  }, []);
  const handleBackButton = () => {
    props.navigation.goBack();
    
  }
  const handleHomeButton = () => {
    props.navigation.navigate(Constants.nav_bottom_navigation, {  })
     
  }
  const fetchData = async () => {
 
    let payload={};
    if(searchText && searchText.length>0){
      payload.searchText=searchText;
       
    }
      let res = await getNewsEvents(payload);
      if (res) {
        
        setNewsEventsData(res?.list);
      }
  };
  const moveToTempleList = (category) => {
    
    props.navigation.navigate(Constants.nav_temple_list, {  category:category })
   
  }
const renderItem = ({item}: {item: EventItemData}) => {
     
  return (
    <EventFullBoxItem
      item={item}
      onPress={() => moveToTempleList(item.code)}
      
    />
  );
};
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E58200' }}>
    <ScrollView>
    <View style={{   flexDirection: 'row', padding: 5, position:"relative", height:30 }}>
    <TouchableOpacity style={{left:10, top:10,  flex: 1, padding:7,  position:"absolute",backgroundColor:"#7e1615" ,borderRadius:5 , zIndex:8}}  onPress={() => handleBackButton()} activeOpacity={0.9}   >
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
      <Text style={{ top:15, left:0,position:"absolute", width:"100%",  fontSize: 16 ,flex: 2, color:"#000" , fontWeight:700, textAlign:"center" } } >News & Events
      </Text>
      <TouchableOpacity style={{right:10, top:10,  flex: 3, padding:7,   position:"absolute" ,backgroundColor:"#7e1615",borderRadius:5, zIndex:8 }}   activeOpacity={0.9}  onPress={() => handleHomeButton()} >
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
    {searchText ?
      <Text style={{   width:"100%", marginTop: 20,  fontSize: 16 , color:"#000" , fontWeight:700, textAlign:"center" } } > 
      Search By:- "{searchText}"
      </Text>
  :""}
   
      <View style={{ flex: 1 , padding: 16}}>
  
      <View style={{margin: 5}}>
          <FlatList
            data={newsEventsData}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            horizontal={false}
            />
        
        </View>
        
        
        
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

 
export default EventScreen;