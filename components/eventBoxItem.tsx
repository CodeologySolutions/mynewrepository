import React from 'react'
import { View, Image, ImageBackground, Text, TouchableOpacity ,Share, Alert} from 'react-native';
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
    item: EventItemData;
    onPress: () => void;
    
  };
const EventBoxItem = ({item, onPress }: ItemProps) => {
  const onShare = async (item) => {
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
    let colors = ['#FFC609', '#43F2FF', '#09FFC4'];
    let imageUrl=item.image;
    //let imageUrl=generalSetting.UPLOADED_FILE_URL+item.image;
    //console.log(imageUrl );
    let timeStamp =new Date().valueOf();
    return (
        <TouchableOpacity key={timeStamp+"_"+item._id} style={{height:95, width:320, margin:3,backgroundColor: '#ffd8a1',borderRadius:8, }}  activeOpacity={0.9} onPress={() => onPress(item._id)} >

            {/* Wrapper - All Tournaments Main View */}
            <Text style={{ fontSize: 11 ,color:"#FFFFFF" ,  backgroundColor: '#d90000', padding:5, borderTopLeftRadius: 8, borderBottomRightRadius: 8, position:'absolute',zIndex:8, right:0,bottom:0} } >{global.userLocation && global.userLocation.latitude ? <Distance latitude={item.temple.latitude} longitude={item.temple.longitude} /> :"0 km"}</Text>
            <TouchableOpacity style={{   padding:3, position:'absolute',zIndex:8, right:0,top:0} } activeOpacity={0.9} onPress={() => onShare(item)}  > 
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
            <View style={{height:150, flex: 1, flexDirection: 'row', padding: 5, position:"relative" }}>
                <Image style={{height:70, width:65, borderRadius:8,  flex: 1,
                  resizeMode: 'cover',
                  position:"absolute",
                  left:10,
                  top:10 }}
                source={{
                    uri: imageUrl
                  }} />
                  <View style={{ flex: 2, flexDirection: 'row', padding: 0, position:"relative",height:80 ,left:75, top:0 }}>
                  <Text style={{ fontSize: 12 ,color:"#6b141a" ,   padding:5,   position:'absolute',zIndex:8, top:0, width:"100%", fontWeight:"bold", width:200, height:55 ,flexWrap: 'wrap'} } > {item.name}</Text>
                  <View style={{ flex: 1, flexDirection: 'row', padding: 5, position:"relative",height:30 }}>
            
                <Text style={{ top:55, left:0,position:"absolute", fontSize: 12 , color:"#000",flexWrap: 'wrap', width:200} } > {item.description.substring(0, 50)} </Text>
            </View>
            </View>
            </View>
           

            
            
            
        </TouchableOpacity >
    )
}

export default EventBoxItem;