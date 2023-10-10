import React from 'react'
import { View, Image, ImageBackground, Text, TouchableOpacity ,Share, Alert} from 'react-native';
// Import FontAwesome Component
// parseIconFromClassName to parse any fa fa-icon into fontawesome
import FontAwesome, {
    SolidIcons,
    RegularIcons,
    BrandIcons,
    parseIconFromClassName,
  } from 'react-native-fontawesome';
  import * as generalSetting from '../webServices/generalSetting';
const locationIcon = parseIconFromClassName('fa fa-map-marker');
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

  type ItemProps = {
    item: StotraItemData;
    onPress: () => void;
    
  };
const StotraBoxItem = ({item, onPress }: ItemProps) => {
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
    let colors = ['#FFC609', '#43F2FF', '#09FFC4'];
    let imageUrl=generalSetting.UPLOADED_FILE_URL+item.image;
    //console.log(imageUrl );
    let timeStamp =new Date().valueOf();
    return (
        <TouchableOpacity key={timeStamp+"_"+item._id} style={{height:85, width:"99%", margin:3,backgroundColor: '#ffd8a1',borderRadius:10, }}  activeOpacity={0.9} onPress={() => onPress(item._id)} >

            {/* Wrapper - All Tournaments Main View */}
            <TouchableOpacity   style={{ width: 22,
              height: 22,  position:"absolute",
              right:6,
              zIndex:20,
              top:6 }}  activeOpacity={0.9} onPress={() => onShare(item)} >
            <Image
            style={{
              width: 20,
              height: 20,
              tintColor:"#6b141a",
              
              resizeMode: 'center',
             
            }}
            source={require('../assets/images/icons/share-icon.png')}
          />
          </TouchableOpacity >
 
            <View style={{height:110, flex: 1, flexDirection: 'row', padding: 5, position:"relative" }}>
                <Image style={{height:65, width:65, borderRadius:8,  flex: 1,
                  resizeMode: 'cover',
                  position:"absolute",
                  left:10,
                  top:10 }}
                source={{
                    uri: imageUrl
                  }} />
                  <View style={{ flex: 2, flexDirection: 'row', padding: 5, position:"relative",height:80 ,left:75, top:0 }}>
                  <Text style={{ fontSize: 14, color:"#6b141a", padding:5,  position:'absolute', top:0, width:200, fontWeight:"bold" } } > {item.name}</Text>
                  
            </View>
            </View>
           

            
            
            
        </TouchableOpacity >
    )
}

export default StotraBoxItem;