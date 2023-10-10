import React from 'react'
import { 
  View,
  Image, 
  ImageBackground, 
  Text, 
  TouchableOpacity,
  Dimensions } from 'react-native'
// Import FontAwesome Component
// parseIconFromClassName to parse any fa fa-icon into fontawesome
import * as generalSetting from '../webServices/generalSetting';
type CategoryItemData = {
  _id: string;
  name: string;
  isActive: boolean;
  image: string;
  code: string;
  createdAt: string;
  updatedAt: string;
};

  type ItemProps = {
    item: CategoryItemData;
    onPress: () => void;
    
  };
  const {height, width} = Dimensions.get('window');
  const boxWidth = parseInt(width/2)-30;
  const boxHeight = boxWidth+20;
const PackageTourInnerItem = ({item, onPress }: ItemProps) => {
 // console.log("width==>",boxWidth );
    
    let imageUrl=generalSetting.UPLOADED_FILE_URL+item.image;
  //  console.log(imageUrl );
  let timeStamp =new Date().valueOf();
    return (
        <TouchableOpacity key={timeStamp+"_"+item._id} style={{height:boxHeight, margin:5  }}  activeOpacity={0.9} onPress={() => onPress(item.code)} >

            {/* Wrapper - All Tournaments Main View */}
         
 
            <View style={{height:boxWidth  }}>
                <Image style={{height:boxWidth, width:boxWidth,   borderRadius:8, resizeMode: 'contain'}}
                source={{
                    uri: imageUrl
                  }} />
                  
              
                 
            </View>
            <Text style={{ fontSize: 12 ,color:"#fff", width:boxWidth, textAlign:"center"} } > {item.name}</Text>
            
            
            
        </TouchableOpacity >
    )
}

export default PackageTourInnerItem;