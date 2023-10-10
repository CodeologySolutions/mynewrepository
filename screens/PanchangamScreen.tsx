// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import React, {useRef, useState, useEffect } from 'react';
import { View, Text, SafeAreaView,FlatList, Image,TouchableOpacity, TextInput,ScrollView } from 'react-native';
import PackageTourInnerItem from '../components/packageTourInnerItem';
const templeData = require('../templeData.json');
import { Constants } from '../appUtils/constants';
const drikPanchang2023 = require('../drikPanchang2023.json');
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment'
import {  
  getCategories,
   
} from "../webServices/apis";
type CategoryItemData = {
  _id: string;
  name: string;
  isActive: boolean;
  image: string;
  code: string;
  createdAt: string;
  updatedAt: string;
};

//const DATA: ItemData[] = templeData;

const PanchangamScreen = (props) => {
  const { category } = props.route.params;
  const [text, onChangeText] = useState('');
  const [myCurrentData, setMyCurrentData] = useState([]);
  const [myCurrentData1, setMyCurrentData1] = useState([]);
  const [myCurrentData2, setMyCurrentData2] = useState([]);
  const [panchangData, setPanchangData] = useState("");
  const [currentDate, setCurrentDate] = useState(moment().format());
  const [selectedStartDate, setSelectedStartDate] = useState(moment().format());
  useEffect(() => {
    fetchData(selectedStartDate);
    

    //fetchLevelData();
  }, [selectedStartDate]);
  const handleBackButton = () => {
    props.navigation.goBack();
    
  }
  const handleHomeButton = () => {
    props.navigation.navigate(Constants.nav_bottom_navigation, {  })
     
  }
  const onDateChange = (date) => {
    setSelectedStartDate(date);
     
  }
   
  const fetchData = async () => {
 
    var datestring = moment(selectedStartDate).format('YYYY-MM-DD').toString();
  var cData= drikPanchang2023.filter(element => element.dtstart == datestring);
  setPanchangData(cData[0]?.summary);
  var descriptionList= cData[0]?.description.split("\\n");
  var descriptionArr= [];
  var descriptionArr1= [];
  var descriptionArr2= [];
  for (let i = 0; i < descriptionList.length; i++) {
    console.log("descriptionList[i]==>",descriptionList[i]);
    if (descriptionList[i].trim() === "Day Festivals and Events -") {
      break;
    }
    if (descriptionList[i].trim() === "") {
      break;
    }
    if(descriptionList[i].includes("Sunset") || descriptionList[i].includes("Sunrise")){
      descriptionArr1.push(descriptionList[i]);
    }else if(descriptionList[i].includes("Moonset") || descriptionList[i].includes("Moonrise")){
      descriptionArr2.push(descriptionList[i]);
    }else{
      descriptionArr.push(descriptionList[i]);
    }
     // descriptionArr.push(descriptionList[i]);
  }
  console.log("descriptionArr==>",descriptionArr);

  setMyCurrentData(descriptionArr);
  setMyCurrentData1(descriptionArr1);
  setMyCurrentData2(descriptionArr2);
  console.log("myCurrentData==>",myCurrentData);
  };
  const moveToTempleList = (category) => {
    
    props.navigation.navigate(Constants.nav_temple_list, {  category:category })
   
  }
const renderItem = ({item}: {item: CategoryItemData}) => {
     
  return (
    <PackageTourInnerItem
      item={item}
      onPress={() => moveToTempleList(item.code)}
      
    />
  );
};
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E58200' }}>
    <ScrollView>
    <View style={{   flexDirection: 'row', padding: 5, position:"relative", height:30 }}>
    <TouchableOpacity style={{left:10, top:10,  flex: 1, padding:7,  position:"absolute",backgroundColor:"#7e1615" ,borderRadius:5, zIndex: 1  }}  onPress={() => handleBackButton()} activeOpacity={0.9}   >
    <Image
        style={{
          width: 14,
          height: 14,
          tintColor:"#ffffff",         
          resizeMode: 'center',
        }}
        source={require('../assets/images/icons/back_arrow_icon.png')}
      />
      </TouchableOpacity>
      <Text style={{ top:10, left:24,position:"absolute", width:"100%",  fontSize: 16 ,flex: 2, color:"#000" , fontWeight:700, textAlign:"center" } } >{"Today's Panchangam"}
      </Text>
      <TouchableOpacity style={{right:10, top:10,  flex: 3, padding:7,   position:"absolute" ,backgroundColor:"#7e1615",borderRadius:5, zIndex: 1  }}   activeOpacity={0.9}  onPress={() => handleHomeButton()} >
      <Image
      style={{
        width: 14,
        height: 14,
        tintColor:"#ffffff",
        
        resizeMode: 'center',
       
      }}
      source={require('../assets/images/icons/home-icon.png')}
    />
    </TouchableOpacity>
    </View>
    <View style={{margin: 10 ,marginTop: 20, backgroundColor:"#f2f2f2",padding: 10, borderRadius:10}}>
    <CalendarPicker
          onDateChange={onDateChange}
          selectedDayColor="#6b141a"
          selectedDayTextColor="#fff"           
          todayBackgroundColor="#6b141a"
        />

         
    </View>
      <View style={{  padding: 16 , backgroundColor:"#ffd8a1" ,borderRadius:10, margin: 10, marginTop: 20}}>
  
      <View style={{margin: 3  }}>
         <Text style={{margin: 3,marginBottom: 0,backgroundColor:"#d8d8d8",borderRadius:8,padding: 10, fontSize:16, fontWeight:"bold", color: "#6b141a"}}>{moment(selectedStartDate).format("dddd Do MMM, YYYY")}</Text>
         <Text style={{backgroundColor:"#d8d8d8",padding: 10}}>{panchangData}</Text>
        
         <View
         style={{
           flexDirection: 'row',
           height: 40,
           
         }}>
         
         
         <Text style={{ width:"50%", backgroundColor:"#d8d8d8",padding: 10,color: "#6b141a"  }}>Sunrise</Text>
         <Text style={{ width:"50%", backgroundColor:"#d8d8d8",padding: 10,color: "#6b141a"  }} >Sunset</Text>
       </View>
       <View
         style={{
           flexDirection: 'row',
           height: 40,
           
         }}>
         <Text style={{ width:"50%", backgroundColor:"#f2f2f2",padding: 10  }}>{
          myCurrentData1[0]?.replace("Sunrise - ", "") }</Text>
         <Text style={{ width:"50%", backgroundColor:"#f2f2f2",padding: 10  }} >{myCurrentData1[1]?.replace("Sunset - ", "")}</Text>
       </View>
       <View
       style={{
         flexDirection: 'row',
         height: 40,
        
       }}>
       
       
       <Text style={{ width:"50%", backgroundColor:"#d8d8d8",padding: 10,color: "#6b141a"  }}>Moonrise</Text>
       <Text style={{ width:"50%", backgroundColor:"#d8d8d8",padding: 10,color: "#6b141a"  }} >Moonset</Text>
     </View>
     <View
     style={{
       flexDirection: 'row',
       height: 40,
       
     }}>
     <Text style={{ width:"50%", backgroundColor:"#f2f2f2",padding: 10  }}>{myCurrentData2[0]?.replace("Moonrise - ", "")}</Text>
     <Text style={{ width:"50%", backgroundColor:"#f2f2f2",padding: 10  }} >{myCurrentData2[1]?.replace("Moonset - ", "")}</Text>
   </View>

        
          {myCurrentData && myCurrentData.length>0 && myCurrentData.map((panchangItem,index)=>
            <>
            <Text style={{ backgroundColor:"#d8d8d8",borderRadius:7,padding: 10,color: "#6b141a"  }} key={"one"+index}>{panchangItem.split(" - ")[0]}</Text>
            <Text style={{ backgroundColor:"#f2f2f2",padding: 10  }} key={"two"+index}>{panchangItem.split(" - ")[1]}</Text>
             </>
           )}
      </View>
        
        
        
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

 
export default PanchangamScreen;