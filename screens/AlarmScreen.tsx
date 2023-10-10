// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import React, {useRef, useState, useEffect } from 'react';
import { View, Text,StyleSheet, SafeAreaView,FlatList, Image,TouchableOpacity, TextInput,ScrollView } from 'react-native';
import CalendarFullBoxItem from './../components/calendarFullBoxItem';
const templeData = require('../templeData.json');
import { Constants } from '../appUtils/constants';
const calendar = require('../calendar.json');
import CalendarPicker from 'react-native-calendar-picker';
 import moment from 'moment'
import {  
   getCategories,
   
} from "../webServices/apis";

import {Actions} from 'react-native-router-flux';

// Components
import NavBar from '../components/Alarm/Common/NavBar';
import AlarmList from '../components/Alarm/Home/AlarmList';



type CalendarItemData = {
  monyear: string;
  date: string;
  festname: string;
  id: string;
};

//const DATA: ItemData[] = templeData;

const AlarmScreen = (props) => {
  console.log("props==>",props);
  const [calenderData, setCalendarData] = useState<CalendarItemData>([]);
  const [monthList, setMonthList] = useState( ['January 2023', 'February 2023', 'March 2023', 'April 2023', 'May 2023', 'June 2023', 'July 2023', 'August 2023', 'September 2023', 'October 2023', 'November 2023', 'December 2023']);
  const [calenderMonthData, setCalendarMonthData] = useState([]);
  const [start, setStart] = useState(parseInt(moment().format('M'))-1);
  const [current, setCurrent] = useState(parseInt(moment().format('M')));

  const [finish, setFinish] = useState(parseInt(moment().format('M'))+1);
  const [currentMonth, setCurrentMonth] = useState(monthList[current - 1]);
  const [monthNumber, setMonthNumber] = useState(moment().format('M'));
  // const [startMonth, setStartMonth] = useState(monthList[monthNumber-2]);
  // const [finishMonth, setFinishMonth] = useState(monthList[monthNumber]);
  const [startMonth, setStartMonth] = useState(monthList[start - 1]);
  const [finishMonth, setFinishMonth] = useState(monthList[finish - 1]);
  const [fadedleft, setFadedLeft] = useState(true);
  const [fadedright, setFadedRight] = useState(false);

  
  const handleAddAlarm = () => {
    props.navigation.navigate(Constants.nav_add_alarm, {  })
    //Actions.AddAlarms();
  };
  useEffect(() => {
    
    // /
    
    console.log("alarms==>",current)
    console.log("current",current)
    console.log("finish",finish)
    console.log("startMonth",startMonth)
    console.log("currentMonth",currentMonth)
    console.log("finishMonth",finishMonth)
   // var monthNumber=moment().format('M');
    fetchData(currentMonth);
   // setStartMonth(monthList[monthNumber-2])
   // setFinishMonth(monthList[monthNumber])
    //fetchLevelData();
  }, [currentMonth]);
  const handleBackButton = () => {
    props.navigation.goBack();
    
  }
  const handleHomeButton = () => {
    props.navigation.navigate(Constants.nav_bottom_navigation, {  })
     
  }
  const onDateChange = (date) => {
    setSelectedStartDate(date);
     
  }
   
  const fetchData = async (filterMonth) => {
 
    setCalendarData(calendar);
    var monyearArr=[];
    calendar.forEach((element) => {
      monyearArr.push(element.monyear)
      
    });
    var cData= calendar.filter(element => element.monyear == filterMonth);
    //setCalendarData(response.data.data)
    setCalendarData(cData);

  };
  const leftClick = () => {
   
 
    if (start > 0 && finish > 0) {
      setStartMonth(monthList[start - 1])
      setFinishMonth(monthList[finish - 1])
      setCurrentMonth(monthList[current - 1])
        setStart(start - 1);
        setFinish(finish - 1);
        setCurrent(current - 1);
       
    } else {
        setFadedLeft(true)
       
    }
    setFadedRight(false)
    
  }
  const rightClick = () => {
  
    // let start = this.state.start;
    // let finish = this.state.finish;
    if (finish < monthList.length) {
      setStartMonth(monthList[start + 1])
      setFinishMonth(monthList[finish + 1])
      setCurrentMonth(monthList[current + 1])
        setStart(start + 1);
        setFinish(finish + 1);
        setCurrent(current + 1);
      
    } else {
        setFadedRight(true)
      
    }
    setFadedLeft(false)
     
  };
  const moveToTempleList = (category) => {
    
    props.navigation.navigate(Constants.nav_temple_list, {  category:category })
   
  }
const renderItem = ({item}: {item: CalendarItemData}) => {
     
  return (
    <CalendarFullBoxItem
      item={item}
      onPress={() => moveToTempleList(item.code)}
      
    />
  );
};
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E58200' }}>
    <ScrollView>
    <View style={{   flexDirection: 'row', padding: 5, position:"relative", height:30 }}>
    <TouchableOpacity style={{left:10, top:10,  flex: 1, padding:7,  position:"absolute",backgroundColor:"#7e1615" ,borderRadius:5 , zIndex: 1 }}  onPress={() => handleBackButton()} activeOpacity={0.9}   >
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
      <Text style={{ top:10, position:"absolute", width:"100%",  fontSize: 16 ,flex: 2, color:"#000" , fontWeight:700, textAlign:"center" } } >Alarms
      </Text>
      <TouchableOpacity style={{right:10, top:10,  flex: 3, padding:7,   position:"absolute" ,backgroundColor:"#7e1615",borderRadius:5 , zIndex: 1}}   activeOpacity={0.9}  onPress={() => handleHomeButton()} >
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
    


    <View style={styles.container}>
    <NavBar
      title="Alarms"
      rightButtonIcon="plus"
      onRightButtonPress={handleAddAlarm}
    />

    <SafeAreaView style={styles.container}>
      <AlarmList />
    </SafeAreaView>
  </View>




    

       
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginTop:10,
    flex: 1,
    backgroundColor: '#E58200'
  },
});
 
export default AlarmScreen;