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
type UserImageItemData = {
  _id: string;
  temple: string;
   image: {
		default: string;
		small: string;
		medium: string;
		large: string;
	};
  user: string;
  createdBy: string;  
};

  type ItemProps = {
    item: UserImageItemData;
    onPress: () => void;
    
  };
  
const UserImageItem = ({item, onPress }: ItemProps) => {

   
    let imageUrl=generalSetting.UPLOADED_FILE_URL+item.image.default;
  //  console.log(imageUrl );
  let timeStamp =new Date().valueOf();
    return (
        <TouchableOpacity key={timeStamp+"_"+item._id} style={{height:100, margin:3 }}  activeOpacity={0.9} onPress={() => onPress(item._id)} >

            {/* Wrapper - All Tournaments Main View */}
         
 
            <View style={{height:90  }}>
                <Image style={{height:90, width:90, borderRadius:8, resizeMode: 'cover'}}
                source={{
                    uri: imageUrl
                  }} />
                  
              
                 
            </View>
            
            
        </TouchableOpacity >
    )
}

export default UserImageItem;