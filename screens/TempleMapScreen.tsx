// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import React, {useRef, useState, useEffect } from 'react';
import { View, Text, SafeAreaView,FlatList, Image,TouchableOpacity, TextInput,ScrollView } from 'react-native';
import TempleItem from '../components/templeItem';
const templeData = require('../templeData.json');
import TempleBoxItem from '../components/templeBoxItem';
import StotraItem from '../components/stotraItem';
import AccordionItem from '../components/AccordionItem';
import * as generalSetting from '../webServices/generalSetting';
import { Constants } from '../appUtils/constants';
import MapContainer from '../components/MapContainer';

import {

  getGeoLocation,
  getNewsEvents,
  getTempleByCategory,
  getStotras,
  getTempleDetails,
  getTemplePujas
  
} from "../webServices/apis";
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
//const DATA: ItemData[] = templeData;

const TempleMapScreen = (props) => {
  console.log("props===>",props);
  const [templedistance, setTempledistance] = useState(0);
  const [templeDetail, setTempleDetail] = useState(0);
  const [templeData1, setTempleData] = useState<ItemData>([]);
  const [eventData, setEventData] = useState([]);
  const [templePujas, setTemplePujas] = useState([]);
   
  const [stotraDataNew, setStotraData] = useState<StotraItemData>([]);
  const [userLat, setUserLat] = useState(17.361719);
  const [userLong, setUserLong] = useState(78.475166);
  const [showMore, setShowMore] = useState(false);
  const [isShowTempleMap, setIsShowTempleMap] = useState(false);
  const handleBackButton = () => {
    props.navigation.goBack();
    
  }
  const handleHomeButton = () => {
    props.navigation.navigate(Constants.nav_bottom_navigation, {  })
     
  }
  useEffect(() => {
   
        
        fetchData(props.route.params.id);
        
        //fetchLevelData();
      }, []);
      
    
      const fetchData = async (id) => {
 
        let res = await getTempleDetails(id);
        if (res) {
         
          setTempleDetail(res?.item);
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
      const moveToSingleStotra = (id) => {
        props.navigation.navigate(Constants.nav_stotra_detail, { id:id  })
      }
const moveToTempleList = () => {
  props.navigation.navigate(Constants.nav_temple_list, {   })
 
}
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

const renderStotraItem = ({item}: {item: StotraItemData}) => {
       
 
  return (
    <StotraItem
      item={item}
      onPress={() => moveToSingleTemple(item._id)}
      
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
      <Text style={{ top:10, left:24,position:"absolute", width:"100%",  fontSize: 16 ,flex: 2, color:"#000" , fontWeight:700, textAlign:"center" } } >{templeDetail?.name}
      </Text>
      
    </View>

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
    <View style={{margin: 10}}>
    {templeDetail?.latitude ? <MapContainer name={templeDetail?.name} location={templeDetail?.location} latitude={templeDetail?.latitude}  longitude={templeDetail?.longitude} imageUrl={ generalSetting.UPLOADED_FILE_URL+templeDetail?.image}
    /> :""} 
    </View>
   
    
   

      
          
      
 
 
       
      </ScrollView>
    </SafeAreaView>
  );
}

 
export default TempleMapScreen;