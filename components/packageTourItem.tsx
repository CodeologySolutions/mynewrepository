import React from 'react'
import { View, Image, ImageBackground, Text, TouchableOpacity ,  Dimensions} from 'react-native'
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
  
const PackageTourItem = ({item, onPress }: ItemProps) => {

    
    let imageUrl=generalSetting.UPLOADED_FILE_URL+item.image;
  //  console.log(imageUrl );
  let timeStamp =new Date().valueOf();
    return (
        <TouchableOpacity key={timeStamp+"_"+item._id} style={{height:150, margin:3 , marginRight:12, marginLeft:12, marginTop:8}}  activeOpacity={0.9} onPress={() => onPress(item.code)} >

            {/* Wrapper - All Tournaments Main View */}
         
 
            <View style={{height:110  }}>
                <Image style={{height:100, width:100, borderRadius:60, resizeMode: 'contain'}}
                source={{
                    uri: imageUrl
                  }} />
                  
              
                 
            </View>
            <Text style={{ fontSize: 12 ,color:"#000", width:100, textAlign:"center"} } > {item.name}</Text>
            
            
            
        </TouchableOpacity >
    )
}

export default PackageTourItem;