import React from 'react'
import { View, Image, ImageBackground, Text, TouchableOpacity } from 'react-native';
// Import FontAwesome Component
// parseIconFromClassName to parse any fa fa-icon into fontawesome
import FontAwesome, {
    SolidIcons,
    RegularIcons,
    BrandIcons,
    parseIconFromClassName,
  } from 'react-native-fontawesome';
 
type CalendarItemData = {
  monyear: string;
  date: string;
  festname: string;
  id: string;
};

  type ItemProps = {
    item: CalendarItemData;
    onPress: () => void;
    
  };
const CalendarFullBoxItem = ({item, onPress }: ItemProps) => {

    //let colors = ['#FFC609', '#43F2FF', '#09FFC4'];
   // let imageUrl="https://codeologyforall.in/templeapi/uploads/"+item.image;
    //console.log(imageUrl );
    let timeStamp =new Date().valueOf();
    return (
        <TouchableOpacity key={timeStamp} style={{height:95, width:"98%", margin:3,backgroundColor: '#ffd8a1',borderRadius:10, }}  activeOpacity={0.9}   >

            {/* Wrapper - All Tournaments Main View */}
            
            <Image
                style={{
                  width: 14,
                  height: 14,
                 
                  
                  resizeMode: 'center',
                  position:"absolute",
                  right:6,
                  top:6,
                  zIndex:8,
                }}
                source={require('../assets/images/icons/bell_icon.png')}
              />
            <Text style={{ fontSize: 16 ,color:"#6b141a" ,  marginLeft:10,  padding:5, fontWeight:600} } >{item.monyear}</Text>
            <View style={{height:110, flex: 1, flexDirection: 'row', padding: 5, position:"relative" }}>
              
                  <Text style={{ fontSize: 20 ,color:"#FFFFFF" ,  backgroundColor: '#d90000', padding:7, height:50, width:60, borderRadius:8,  flex: 1,
                  resizeMode: 'center',
                  position:"absolute",
                  left:10,
                  top:0 ,
                  fontWeight:500
                } } >{item.date}</Text>

                  <View style={{ flex: 2, flexDirection: 'row', padding: 5, position:"relative",height:30 ,left:65, top:20 }}>
                  <Text style={{ fontSize: 14 ,color:"#000" ,   padding:5, borderBottomRightRadius: 8,
                  borderBottomLeftRadius: 8, position:'absolute',zIndex:8, bottom:20, width:"100%"  } } > {item.festname}</Text>
                   
            </View>
            </View>
           

            
            
            
        </TouchableOpacity >
    )
}

export default CalendarFullBoxItem;