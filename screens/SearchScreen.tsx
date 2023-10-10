// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import React, {useRef, useState, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView,FlatList, Image,TouchableOpacity, TextInput,ScrollView,RefreshControl } from 'react-native';
import TempleBoxItem from '../components/templeBoxItem';
import EventBoxItem from '../components/eventBoxItem';
import StotraSearchBoxItem from '../components/stotraSearchBoxItem';
import CustomActivityIndicator from '../components/CustomActivityIndicator';

import { Constants } from '../appUtils/constants';
import {  
 
  getTempleByCategory, getSearchResult
   
} from "../webServices/apis";
type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};
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
type EventItemData = {
  _id: string;
  name: string;
  image: string;
  eventDate: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  temple:ItemData;
};
const SearchScreen = (props) => {
  const [searchText, setSearchText] = useState("");
  const [text, onChangeText] = useState('');
  const [templeData, setTempleData] = useState<ItemData>([]);
  const [stotraData, setStotraData] = useState<StotraItemData>([]);
  const [newsEventsData, setNewsEventsData] = useState<EventItemData>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchResult, setIsSearchResult] = useState(false);
  useEffect(() => {
 
   // fetchData();
       
    
       //fetchLevelData();
     }, []);
  const fetchData = async  () => {
    console.log("searchText==>",text);
    
    if(text.length>3){
        let payload={searchText:text};
        let res = await getSearchResult(payload);
        if (res) {
          console.log("searchText res==>",res);
          setTempleData(res?.templeList);
          setStotraData(res?.stotraList);
          setNewsEventsData(res?.eventList);
          setIsLoading(false);
        }
    }
    
  };

  const onSubmitEditing = () => {
    setIsSearchResult(true);
    setIsLoading(true)
    console.log("onSubmitEditing");
    fetchData();
    
   // setRefreshing(false);
    
  }
  const handleBackButton = () => {
    props.navigation.goBack();
    
  }
  const handleHomeButton = () => {
    props.navigation.navigate(Constants.nav_bottom_navigation, {  })
     
  }
  const moveToSingleTemple = (id) => {
    props.navigation.navigate(Constants.nav_temple_detail, { id:id  })
  }
  const moveToTempleList = (searchText) => {
    props.navigation.navigate(Constants.nav_temple_list, { searchText:searchText  })
  }
  const moveToStotraDetail = (id) => {
    props.navigation.navigate(Constants.nav_stotra_detail,  { id:id  })
   
  }
  const moveToStotraList = (searchText) => {
    props.navigation.navigate(Constants.nav_stotra_list,  { searchText:searchText  })
   
  }
  const moveToEventList = (searchText) => {
    props.navigation.navigate(Constants.nav_event_list, { searchText:searchText  } )
   
  }

  const renderBoxItem = ({item}: {item: ItemData}) => {      
    
    return (
      <TempleBoxItem
        item={item}
        onPress={() => moveToSingleTemple(item._id)}
        
      />
    );
  };

  const renderEventItem = ({item}: {item: EventItemData}) => {
     
    return (
      <EventBoxItem
        item={item}
        onPress={() => moveToEventList()}
        
      />
    );
  };
  const renderStotraBoxItem = ({item}: {item: StotraItemData}) => {      
 
    return (
      <StotraSearchBoxItem
        item={item}
        onPress={() => moveToStotraDetail(item._id)}
        
      />
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E58200' }}>
    <ScrollView>
    <View style={{   flexDirection: 'row', padding: 5, position:"relative", height:30 }}>
    
      <Text style={{ top:10, left:0,position:"absolute", width:"100%",  fontSize: 16 ,flex: 2, color:"#000" , fontWeight:700, textAlign:"center" } } >{"Search"}
      </Text>
     
    </View>

    <View style={{margin: 5}}>
      <TextInput
      style={{
        height: 40,
        marginTop:10,
        marginLeft:5,
        marginRight:5,
        
        padding: 10,
        borderRadius:10,
        backgroundColor:"#fff"

      }}
      onSubmitEditing={onSubmitEditing}
      onChangeText={onChangeText}
      value={text}
      placeholder='Search Temples'
    />
    </View>
    {isSearchResult ? 
    <>
    {isLoading ? <CustomActivityIndicator /> : <>
    <View style={{flex: 1, padding: 10 , margin: 5}}>
          <View style={{ flex: 1, flexDirection: 'row', padding: 5, position:"relative",height:30 , textAlign: 'left', fontWeight:"bold",color:"#fff" }}>
              <Text style={{ top:4, left:4,position:"absolute", fontSize: 16 ,flex: 1, color:"#FFFFFF" , fontWeight:"bold"} } >Temples </Text>
              <TouchableOpacity style={{  flex: 2, position:"absolute",right:0,
              top:6 , cursor: 'pointer' }}  activeOpacity={0.9}  onPress={() => moveToTempleList(text)} >   
                  <Text style={{ fontSize: 16 ,color:"#FFFFFF" , fontWeight:"bold"} } > View All </Text>
              </TouchableOpacity>
                  
          </View>
         
         {templeData && templeData.length>0 && text.length>0 ? 
            <FlatList
            data={templeData}
            renderItem={renderBoxItem}
            keyExtractor={item => item._id}
          
            horizontal={true}
            showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
            />
            :  <Text style={{ fontSize: 16 ,color:"#FFFFFF" , fontWeight:"bold"} } >No Temples Found</Text>}
        
        </View>
         
        <View style={{flex: 1, padding: 10 , margin: 5}}>
      
            <View style={{ flex: 1, flexDirection: 'row', padding: 5, position:"relative",height:30 , textAlign: 'left', fontWeight:"bold",color:"#fff" }}>
            <Text style={{ top:4, left:4,position:"absolute", fontSize: 16 ,flex: 1, color:"#FFFFFF" , fontWeight:"bold"} } >Stotras </Text>
            <TouchableOpacity style={{  flex: 2, position:"absolute",right:0,
            top:6 , cursor: 'pointer' }}  activeOpacity={0.9}  onPress={() => moveToStotraList(text)} >   
                <Text style={{ fontSize: 16 ,color:"#FFFFFF" , fontWeight:"bold"} } > View All </Text>
            </TouchableOpacity>
                
          </View>
   
        
        {stotraData && stotraData.length >0 && text.length>0 ? 
        <FlatList
            data={stotraData}
            renderItem={renderStotraBoxItem}
            keyExtractor={item => item._id}
          
            horizontal={true}
            showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
            />
            :  <Text style={{ fontSize: 16 ,color:"#FFFFFF" , fontWeight:"bold"} } >No Stotras Found</Text>}
        </View>
        <View style={{flex: 1, padding: 10 , margin: 5}}>
            <View style={{ flex: 1, flexDirection: 'row', padding: 5, position:"relative",height:30 , textAlign: 'left', fontWeight:"bold",color:"#fff" }}>
            <Text style={{ top:4, left:4,position:"absolute", fontSize: 16 ,flex: 1, color:"#FFFFFF" , fontWeight:"bold"} } >News & Events </Text>
            <TouchableOpacity style={{  flex: 2, position:"absolute",right:0,
            top:6 , cursor: 'pointer' }}  activeOpacity={0.9}  onPress={() => moveToEventList(text)} >   
                <Text style={{ fontSize: 16 ,color:"#FFFFFF" , fontWeight:"bold"} } > View All </Text>
            </TouchableOpacity>
                
          </View>
        
        {newsEventsData && newsEventsData.length >0 && text.length>0 ? 
          <FlatList
            data={newsEventsData}
            renderItem={renderEventItem}
            keyExtractor={item => item._id}
          
            horizontal={true}
            showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
            />
            :  <Text style={{ fontSize: 16 ,color:"#FFFFFF" , fontWeight:"bold"} } >No Events Found</Text>}
        </View>
        </>
    }
    </>
    :<></>}
        </ScrollView>
    </SafeAreaView>
  );
}

export default SearchScreen;