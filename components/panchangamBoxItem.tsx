import React from 'react'
import { View, Image, ImageBackground, Text, TouchableOpacity } from 'react-native';
// Import FontAwesome Component
// parseIconFromClassName to parse any fa fa-icon into fontawesome
 
type PanchangItemData = {
  dtstart: string;
  dtend: string;
  dtstamp: string;
  organizer: string;
  uid: string;
  attendee: string;
  created: string;
  description: string;
  "last-modified": string;
  location: string;
  sequence: string;
  status: string;
  summary: string;
  transp: string;
};

  type ItemProps = {
    panchangData: {};
    currentDate: string;
    
  };
const PanchangamBoxItem = ({panchangData, currentDate }: ItemProps) => {

    //let colors = ['#FFC609', '#43F2FF', '#09FFC4'];
   // let imageUrl="https://codeologyforall.in/templeapi/uploads/"+item.image;
    //console.log(imageUrl );
    let timeStamp =new Date().valueOf();
    return (
        <TouchableOpacity key={timeStamp+"_"+item.uid} style={{height:85, width:260, margin:3,backgroundColor: '#ffd8a1',borderRadius:10, }}  activeOpacity={0.9}   >

            {/* Wrapper - All Tournaments Main View */}
            
            
            <Text style={{ fontSize: 16 ,color:"#6b141a" ,   padding:5, fontWeight:600} } >{currentDate}</Text>
           
            <Text style={{ fontSize: 16 ,color:"#6b141a" ,   padding:5, fontWeight:600} } >{panchangData.summary}</Text>

            
            
            
        </TouchableOpacity >
    )
}

export default PanchangamBoxItem;