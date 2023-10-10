// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import React, {useRef, useState, useEffect } from 'react';
import { View, Text, SafeAreaView,FlatList, Image,TouchableOpacity, TextInput,ScrollView } from 'react-native';
import TempleItem from '../components/templeItem';
const templeData = require('../templeData.json');
import StotraItem from '../components/stotraItem';
import { Constants } from '../appUtils/constants';
import StotraBoxItem from './../components/stotraBoxItem';
import {
  
  getTempleByCategory,
  getStotras,
  getStotraDetails
} from "../webServices/apis";

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

//const DATA: StotraItemData[] = templeData;

const StotraListScreen = (props) => {
  const {searchText } = props.route.params;

  const [stotraDataNew, setStotraData] = useState<StotraItemData>([]);
  const [stotraDataTop, setStotraTopData] = useState<StotraItemData>([]);
  useEffect(() => {
    fetchData();

  }, []);
  const fetchData = async () => {

    let payload={};
    if(searchText && searchText.length>0){
      payload.searchText=searchText;
       
    }
    let res = await getStotras(payload);
    if (res) {
         console.log("getStotras==>",res);
        

        setStotraData(res?.list);
        setStotraTopData(res?.list);
    }
  };
  const moveToSingle = (id) => {
    props.navigation.navigate(Constants.nav_stotra_detail, { id:id  })
}
const handleBackButton = () => {
  props.navigation.goBack();
  
}
const handleHomeButton = () => {
  props.navigation.navigate(Constants.nav_bottom_navigation, {  })
   
}
const renderStotraItem = ({item}: {item: StotraItemData}) => {
       
 
  return (
    <StotraItem
      item={item}
      onPress={() => moveToSingle(item._id)}
      
    />
  );
};

const renderStotraBoxItem = ({item}: {item: StotraItemData}) => {
       
 
  return (
    <StotraBoxItem
      item={item}
      onPress={() => moveToSingle(item._id)}
      
    />
  );
};
const renderItem = ({item}: {item: ItemData}) => {
     
  return (
    <TempleItem
      item={item}
      onPress={() => moveToSingle(item._id)}
      
    />
  );
};
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E58200' }}>
    <ScrollView>
    <View style={{   flexDirection: 'row', padding: 5, position:"relative", height:30, }}>
    <TouchableOpacity style={{left:10, top:10,  flex: 1, padding:7,  position:"absolute",backgroundColor:"#7e1615" ,borderRadius:5, zIndex: 1  }}  onPress={() => handleBackButton()}   activeOpacity={0.9}   >
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
      <Text style={{ top:10, left:24,position:"absolute", width:"100%",  fontSize: 16 ,flex: 2, color:"#000" , fontWeight:700, textAlign:"center" } } >Stotras 
      </Text>
      <TouchableOpacity style={{right:10, top:10,  flex: 3, padding:7,   position:"absolute" ,backgroundColor:"#7e1615",borderRadius:5, zIndex: 1  }} onPress={() => handleHomeButton()}  activeOpacity={0.9}   >
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
    {searchText ?
        <Text style={{   width:"100%", marginTop: 20,  fontSize: 16 , color:"#000" , fontWeight:700, textAlign:"center" } } > 
        Search By:- "{searchText}"
        </Text>
    :""}
    <View style={{ flex: 1, margin: 8, marginTop: 20, backgroundColor:"#c0640d",padding:10, borderRadius:8}}>
    
    <View style={{ flex: 1, flexDirection: 'row', padding: 5, position:"relative",height:30 , textAlign: 'left', fontWeight:"bold",color:"#fff" }}>
    <Text style={{ top:4, left:4,position:"absolute", fontSize: 16 ,flex: 1, color:"#FFFFFF" , fontWeight:"bold"} } > Stotras</Text>
    
            
        </View>
    <View >
      <FlatList
        data={stotraDataTop}
        renderItem={renderStotraItem}
        keyExtractor={item => item.id}
      
        horizontal={true}
        showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
        />
    
    </View>
</View>
      <View style={{ flex: 1 , padding: 16}}>
  
      <View style={{margin: 5}}>
          <FlatList
            data={stotraDataNew}
            renderItem={renderStotraBoxItem}
            keyExtractor={item => item._id}
             
            horizontal={false}
            />
        
        </View>
        
        
        
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

 
export default StotraListScreen;