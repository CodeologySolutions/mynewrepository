import React from 'react'
import { View, Image, ImageBackground, Text, TouchableOpacity, Share, Alert } from 'react-native';
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
 

 
  type SimpleItemData = {
    id: string;
    name: string;
    
    
  };
  type ItemProps = {
    item: SimpleItemData;
    onPress: () => void;
    
  };
const SimpleItem = ({item, onPress }: ItemProps) => {
  
  
    let timeStamp =new Date().valueOf();
    return (
        <View key={timeStamp+"_"+item.id} style={{  width:"98%", margin:3,  }}  >   
            <View style={{height:150, flex: 1, flexDirection: 'row', padding: 5, position:"relative" }}>
                <Image style={{height:70, width:65, borderRadius:8,  flex: 1,
                  resizeMode: 'cover',
                  position:"absolute",
                  width: 14,
                  height: 14,
                  left:10,
                  top:10 }}
                  source={require('../assets/images/icons/bell_icon.png')}
                   />
                  <View style={{ flex: 2, flexDirection: 'row', padding: 0, position:"relative",height:80 ,left:75, top:0 }}>
                      <Text style={{  fontSize: 14 , color:"#000",     padding:5,   position:'absolute',zIndex:8, top:0, width:"100%", flexWrap: 'wrap'} } > {item.name}</Text>
                  
                   </View>
            </View>
        </View>
    )
}

export default SimpleItem;