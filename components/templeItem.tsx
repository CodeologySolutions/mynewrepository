import React from 'react'
import { View, Image, ImageBackground, Text, TouchableOpacity,  Dimensions } from 'react-native'
// Import FontAwesome Component
// parseIconFromClassName to parse any fa fa-icon into fontawesome
import * as generalSetting from '../webServices/generalSetting';
import FontAwesome, {
    SolidIcons,
    RegularIcons,
    BrandIcons,
    parseIconFromClassName,
  } from 'react-native-fontawesome';
  import Distance from './Distance';
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
  const boxWidth = parseInt(width/3)-20;
  const boxHeight = boxWidth+20;
const TempleItem = ({item, onPress }: ItemProps) => {

    let colors = ['#FFC609', '#43F2FF', '#09FFC4'];
    let imageUrl=generalSetting.UPLOADED_FILE_URL+item.image;
   // console.log("width==>",boxWidth );
    
    //console.log("height==>",height );
let timeStamp =new Date().valueOf();
    return (
        <TouchableOpacity style={{height:boxHeight , width:boxWidth, margin:3 }} key={timeStamp+"_"+item._id} activeOpacity={0.9} onPress={() => onPress(item._id)} >

            {/* Wrapper - All Tournaments Main View */}
            <Text style={{ fontSize: 11 ,color:"#FFFFFF" ,  backgroundColor: '#d90000', padding:5, borderTopRightRadius: 8, borderBottomLeftRadius: 8, position:'absolute',zIndex:8, right:0,top:0} } >{global.userLocation.latitude ? <Distance latitude={item.latitude} longitude={item.longitude} /> :"0 km"}</Text>
 
            <View style={{height:boxWidth  }}>
                <Image style={{height:boxWidth , width:boxWidth , borderRadius:8, resizeMode: 'cover'}}
                source={{
                    uri: imageUrl
                  }} />
                  
              
                 
            </View>
            <Text style={{ fontSize: 12 ,color:"#FFFFFF" ,  backgroundColor: 'rgba(0,0,0,.5)', padding:5, borderBottomRightRadius: 8,
            borderBottomLeftRadius: 8, position:'absolute',zIndex:8, bottom:20, width:"100%"} } > {item.name}</Text>
            <View style={{ flex: 1, flexDirection: 'row', padding: 5, position:"relative",height:30 }}>
            <Image
                style={{
                  width: 12,
                  height: 12,
                  tintColor:"#ffffff",
                  flex: 1,
                  resizeMode: 'center',
                  position:"absolute",
                  left:0,
                  top:6
                }}
                source={require('../assets/images/icons/map.png')}
              />
                <Text style={{ top:4, left:12,position:"absolute", fontSize: 12 ,flex: 2, color:"#FFFFFF"} } > {item.location}</Text>
            </View>
            
            
        </TouchableOpacity >
    )
}

export default TempleItem;