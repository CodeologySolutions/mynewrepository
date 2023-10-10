// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import React, {useRef, useState, useEffect } from 'react';
import { View, Text, SafeAreaView,FlatList, Image,TouchableOpacity, TextInput,ScrollView } from 'react-native';
import EventFullBoxItem from '../components/eventFullBoxItem';
const templeData = require('../templeData.json');
import { Constants } from '../appUtils/constants';
import SimpleItem from './../components/simpleItem';

import {  

  getNewsEvents,
   
} from "../webServices/apis";
type SimpleItemData = {
  id: string;
  name: string;
  
  
};
//const DATA: ItemData[] = templeData;
const featureList = [
  {
  id: '1',
  name: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
  id: '2',
  name: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s ',
  },
  {
  id: '3',
  name: 'when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
  },
  {
  id: '4',
  name: ' It has survived not only five centuries, ',
  },
  {
  id: '5',
  name: 'but also the leap into electronic typesetting, remaining essentially unchanged.',
  },
  {
  id: '6',
  name: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  },
  
  ];
const UpgradeScreen = (props) => {
  const {searchText } = props.route.params;

  const [text, onChangeText] = useState('');
  const [simpleData, setSimpleData] = useState<SimpleItemData>(featureList);

 
  const handleBackButton = () => {
    props.navigation.goBack();
    
  }
  const handleHomeButton = () => {
    props.navigation.navigate(Constants.nav_bottom_navigation, {  })
     
  }
  
  const moveToTempleList = () => {
    
    props.navigation.navigate(Constants.nav_temple_list, {    })
   
  }
const renderItem = ({item}: {item: SimpleItemData}) => {
     
  return (
    <SimpleItem
      item={item}
      onPress={() => moveToTempleList()}
      
    />
  );
};
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E58200' }}>
    <ScrollView>
    <View style={{   flexDirection: 'row', padding: 5, position:"relative", height:30 }}>
    <TouchableOpacity style={{left:10, top:10,  flex: 1, padding:7,  position:"absolute",backgroundColor:"#7e1615" ,borderRadius:5 , zIndex:8}}  onPress={() => handleBackButton()} activeOpacity={0.9}   >
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
      <Text style={{ top:15, left:0,position:"absolute", width:"100%",  fontSize: 16 ,flex: 2, color:"#000" , fontWeight:700, textAlign:"center" } } >Premium Membership
      </Text>
      <TouchableOpacity style={{right:10, top:10,  flex: 3, padding:7,   position:"absolute" ,backgroundColor:"#7e1615",borderRadius:5, zIndex:8 }}   activeOpacity={0.9}  onPress={() => handleHomeButton()} >
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
    
   
      <View style={{ flex: 1 , marginTop: 20, margin: 10, padding: 16,backgroundColor: '#ffd8a1',borderRadius:8,}}>  
          <FlatList
          data={simpleData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          />
      </View>
      <View style={{ flex: 1, padding: 16,  alignItems: 'center', }}>
      <TouchableOpacity  style={{ pending:10, width:"90%", margin:3,marginTop:20,backgroundColor: '#570d13',borderRadius:8,  justifyContent: "center", }}  activeOpacity={0.9} onPress={() => onSubmit()}   >
      <Text
          style={{
            fontSize: 14,
            textAlign: 'center',
            pending:10,
            marginBottom: 10,
            marginTop: 10,
            color:"#fff"
          }}>
          Upgrade Now
        </Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

 
export default UpgradeScreen;