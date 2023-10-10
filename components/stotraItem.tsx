import React from 'react'
import { View, Image, ImageBackground, Text, TouchableOpacity } from 'react-native'
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
const StotraItem = ({item, onPress }: ItemProps) => {

    let colors = ['#FFC609', '#43F2FF', '#09FFC4'];
    let imageUrl=generalSetting.UPLOADED_FILE_URL+item.image;
  //  console.log(imageUrl );
  let timeStamp =new Date().valueOf();
    return (
        <TouchableOpacity key={timeStamp+"_"+item._id} style={{height:140, margin:3 }}  activeOpacity={0.9} onPress={() => onPress(item._id)} >

            {/* Wrapper - All Tournaments Main View */}
         
 
            <View style={{height:110  }}>
                <Image style={{height:110, width:110, borderRadius:8, resizeMode: 'cover'}}
                source={{
                    uri: imageUrl
                  }} />
                  
              
                 
            </View>
            <Text style={{ fontSize: 12 ,color:"#FFFFFF", width:110, textAlign:"center"} } > {item.name}</Text>
            
            
            
        </TouchableOpacity >
    )
}

export default StotraItem;