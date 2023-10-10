import React from 'react'
import { View, Image, ImageBackground, Text, TouchableOpacity, Dimensions  } from 'react-native';
// Import FontAwesome Component
// parseIconFromClassName to parse any fa fa-icon into fontawesome
import Distance from './Distance';
import FontAwesome, {
    SolidIcons,
    RegularIcons,
    BrandIcons,
    parseIconFromClassName,
  } from 'react-native-fontawesome';
  import * as generalSetting from '../webServices/generalSetting';
const locationIcon = parseIconFromClassName('fa fa-map-marker');
type ItemData = {
    _id: string;
    name: string;
    image: string;
    latitude: string;
    longitude: string;
    location: string;
  };

  type ItemProps = {
    item: ItemData;
    onPress: () => void;
    
  };
  const {height, width} = Dimensions.get('window');
var imgWidth =320;
if(width<=360){
  imgWidth = parseInt(width)-60;
}
const TempleBoxItem = ({item, onPress }: ItemProps) => {

    let colors = ['#FFC609', '#43F2FF', '#09FFC4'];
    let imageUrl=generalSetting.UPLOADED_FILE_URL+item.image;
  
    let timeStamp =new Date().valueOf();
    return (
        <TouchableOpacity key={timeStamp+"_"+item._id} style={{height:85, width:imgWidth, margin:3,backgroundColor: '#ffd8a1',borderRadius:8 }}  activeOpacity={0.9} onPress={() => onPress(item._id)} >

            {/* Wrapper - All Tournaments Main View */}
            <Text style={{ fontSize: 11 ,color:"#FFFFFF" ,  backgroundColor: '#d90000', padding:5, borderTopLeftRadius: 8, borderBottomRightRadius: 8, position:'absolute',zIndex:8, right:0,bottom:0} } >{global.userLocation && global.userLocation.latitude ? <Distance latitude={item.latitude} longitude={item.longitude} /> :"0 km"}</Text>
 
            <View style={{height:110, flex: 1, flexDirection: 'row', padding: 5, position:"relative" }}>
                <Image style={{height:65, width:65, borderRadius:8,  flex: 1,
                  resizeMode: 'cover',
                  position:"absolute",
                  left:10,
                  top:10 }}
                source={{
                    uri: imageUrl
                  }} />
                  <View style={{ flex: 2, flexDirection: 'row', padding: 5, position:"relative",height:30 ,left:75, top:20 }}>
                  <Text style={{ fontSize: 14 ,color:"#6b141a" ,   padding:5, borderBottomRightRadius: 8,
                  borderBottomLeftRadius: 8, position:'absolute',zIndex:8, bottom:20, width:"100%", fontWeight:"bold" } } > {item.name}</Text>
                  <View style={{ flex: 1, flexDirection: 'row', padding: 5, position:"relative",height:30 }}>
            <Image
                style={{
                  width: 14,
                  height: 14,
                  tintColor:"#dc3545",
                  flex: 1,
                  resizeMode: 'center',
                  position:"absolute",
                  left:0,
                  top:6
                }}
                source={require('../assets/images/icons/map.png')}
              />
                <Text style={{ top:4, left:14,position:"absolute", fontSize: 14 ,flex: 2, color:"#000"} } > {item.location}</Text>
            </View>
            </View>
            </View>
           

            
            
            
        </TouchableOpacity >
    )
}

export default TempleBoxItem;