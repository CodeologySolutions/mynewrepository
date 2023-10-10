// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import React, {useRef, useState, useEffect } from 'react';
import { View, Text, SafeAreaView,FlatList, Image,TouchableOpacity, TextInput,ScrollView ,Share, Alert} from 'react-native';
import {WebView} from 'react-native-webview';
import TempleItem from '../components/templeItem';
const templeData = require('../templeData.json');
import StotraItem from '../components/stotraItem';
import { Constants } from '../appUtils/constants';
import StotraBoxItem from '../components/stotraBoxItem';
import * as generalSetting from '../webServices/generalSetting';
import Slider from '@react-native-community/slider';
import {
  
  getTempleByCategory,
  getStotras,
  getStotraDetails
} from "../webServices/apis";
import styles from 'rn-range-slider/styles';

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

//const DATA: StotraItemData[] = templeData;

const StotraDetailScreen = (props) => {
  const [stotraDataNew, setStotraData] = useState<StotraItemData>([]);
  const [stotraDataTop, setStotraTopData] = useState<StotraItemData>([]);
  const [stotraDetail, setStotraDetail] = useState(0);
  const [stotraAudio, setStotraAudio] = useState("");
  const [sliderValue, setSliderValue] = useState(12);
 
  useEffect(() => {
    fetchData(props.route.params.id);

  }, [props.route.params.id]);
  const fetchData = async (id ) => {
    
    let res = await getStotraDetails(id);
    if (res) {
      
        setStotraDetail(res?.item);
        var htmlContest='<audio controls="" src="'+res?.item?.audioLink+'" style="width: 90%; height:55px">Your browser does not support the audio element.</audio>'
        setStotraAudio(htmlContest);
    }
  
  };
  const moveToSingle = (id) => {
    props.navigation.navigate(Constants.nav_stotra_detail, { id:id  })
}

const handleBackButton = () => {
  props.navigation.goBack();
  
}
const handleHomeButton = () => {
  props.navigation.navigate(Constants.nav_bottom_navigation, {  })
   
}
const onShare = async (item) => {
  console.log("onShare==>");
  try {
    const result = await Share.share({
      message: item.name + " - "+item.description,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error: any) {
    Alert.alert(error.message);
  }
};
const renderStotraItem = ({item}: {item: StotraItemData}) => {
       
 
  return (
    <StotraItem
      item={item}
      onPress={() => moveToSingle(item._id)}
      
    />
  );
};

const renderStotraBoxItem = ({item}: {item: StotraItemData}) => {
       
 
  return (
    <StotraBoxItem
      item={item}
      onPress={() => moveToSingle(item._id)}
      
    />
  );
};
const renderItem = ({item}: {item: ItemData}) => {
     
  return (
    <TempleItem
      item={item}
      onPress={() => moveToSingle(item._id)}
      
    />
  );
};
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E58200' }}>
    <ScrollView>
    <View style={{   flexDirection: 'row', padding: 5, position:"relative", height:30, }}>
    <TouchableOpacity style={{left:10, top:10,  flex: 1, padding:7,  position:"absolute",backgroundColor:"#7e1615" ,borderRadius:5 ,zIndex:1 }}   activeOpacity={0.9}  onPress={() => handleBackButton()}   >
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
      <Text style={{ top:10, left:0,position:"absolute", width:"100%",  fontSize: 16 ,flex: 2, color:"#000" , fontWeight:700, textAlign:"center" } } >Stotras 
      </Text>
      <TouchableOpacity style={{right:10, top:10,  flex: 3, padding:7,   position:"absolute" ,backgroundColor:"#7e1615",borderRadius:5,zIndex:1 }}   activeOpacity={0.9} onPress={() => handleHomeButton()}  >
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

   
    <View style={{ flex: 1, margin: 8, marginTop: 20, backgroundColor:"#fff1db",padding:10, borderRadius:8}}>
      <View style={{height:80, flex: 1, flexDirection: 'row', padding: 5, position:"relative",backgroundColor:"#fff",borderRadius:8 }}>
      <TouchableOpacity style={{   padding:5, position:'absolute',zIndex:18, right:0,top:0} } activeOpacity={0.9} onPress={() => onShare(stotraDetail)}  > 
      <View>
      <Image
      style={{
        width: 24,
        height: 24,
        tintColor:"#6b141a",
         
        resizeMode: 'center',
         
        right:0,
        top:6
      }}
      source={require('../assets/images/icons/share-icon.png')}
    />
    </View>
    </TouchableOpacity>
                <Image style={{height:65, width:65, borderRadius:8,  flex: 1,
                  resizeMode: 'center',
                  position:"absolute",
                  left:10,
                  top:10 }}
                source={{
                    uri: generalSetting.UPLOADED_FILE_URL+stotraDetail.image
                  }} />
                  <View style={{ flex: 2, flexDirection: 'row', padding: 5, position:"relative",height:30 ,left:75, top:20 , width:300}}>
                        <Text style={{ fontSize: 14 ,color:"#6b141a" ,   padding:5, borderBottomRightRadius: 8,
                        borderBottomLeftRadius: 8, position:'absolute',zIndex:8, bottom:20, width:"100%", fontWeight:"bold" } } > 
                        {stotraDetail.name}
                        </Text>
                       
                  </View>
                  
                  
                 
            </View>
            <WebView
                  style={{ flex: 1, padding: 5,height:50, alignItems:'center'  }}
                  originWhitelist={['*']}
                  source={{html:`'<audio controls="" src="${stotraDetail.audioLink}" style="width: 96%; height:60px">Your browser does not support the audio element.</audio>'` }}  
                />
           
                <View style={{
                  flex: 1,
                  marginLeft: 10,
                   marginTop: 10,
                  marginRight: 10,
                  flexDirection: 'row',
                  alignItems: "stretch",
                  justifyContent: "center",
                }}> 
                <Text style={{fontSize:12, marginTop: 23,}}>A</Text>
                <Slider
                minimumValue={12}
                maximumValue={36}
                step={1}
                value={sliderValue}
                thumbTintColor={"#F8AC10"}
                minimumTrackTintColor={"#7E1615"}
                style={{ width: 200 , marginTop: 20  }}
                onValueChange={(newValue) => setSliderValue(newValue)}
              />
              <Text style={{fontSize:36}}>A</Text>
              </View>
            <View style={{marginTop: 20}}> 
            
                  <Text style={{fontSize: sliderValue,color:"#000" }} > {stotraDetail.description}</Text>
            </View>
    
    
   
</View>
      
      </ScrollView>
    </SafeAreaView>
  );
}

 
export default StotraDetailScreen;