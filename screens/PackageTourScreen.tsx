// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import React, {useRef, useState, useEffect } from 'react';
import { View, Text, SafeAreaView,FlatList, Image,TouchableOpacity, TextInput,ScrollView } from 'react-native';
import PackageTourInnerItem from '../components/packageTourInnerItem';
const templeData = require('../templeData.json');
import { Constants } from '../appUtils/constants';
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

const PackageTourScreen = (props) => {
  const { category } = props.route.params;
  const [text, onChangeText] = useState('');
  const [devitionalToursData, setDevitionalToursData] = useState<CategoryItemData>([]);

  useEffect(() => {
    fetchData();
    

    //fetchLevelData();
  }, []);
  const handleBackButton = () => {
    props.navigation.goBack();
    
  }
  const handleHomeButton = () => {
    props.navigation.navigate(Constants.nav_bottom_navigation, {  })
     
  }
  const fetchData = async () => {
 
    let payload={};
    let res = await getCategories(payload);
    if (res) {
      
      setDevitionalToursData(res?.list);
    }
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
    <TouchableOpacity style={{left:10, top:10,  flex: 1, padding:7,  position:"absolute",backgroundColor:"#7e1615" ,borderRadius:5 }}  onPress={() => handleBackButton()} activeOpacity={0.9}   >
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
      <Text style={{ top:10, left:24,position:"absolute", width:"100%",  fontSize: 16 ,flex: 2, color:"#000" , fontWeight:700, textAlign:"center" } } >Package Tours
      </Text>
      <TouchableOpacity style={{right:10, top:10,  flex: 3, padding:7,   position:"absolute" ,backgroundColor:"#7e1615",borderRadius:5 }}   activeOpacity={0.9}  onPress={() => handleHomeButton()} >
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

   
      <View style={{ flex: 1 , padding: 16}}>
  
      <View style={{margin: 5}}>
          <FlatList
            data={devitionalToursData}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            numColumns={2}
            horizontal={false}
            />
        
        </View>
        
        
        
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

 
export default PackageTourScreen;