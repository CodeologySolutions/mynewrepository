import React, { Component } from 'react';
import {StyleSheet, View, Dimensions,Image} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
 
import { Marker } from 'react-native-maps';  
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE =  global.userLocation?.latitude;
const LONGITUDE = global.userLocation?.longitude;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyBmMZRSWnfJdOw6Y3ZMANFXX2ta6Z9G4pM';

 
function  MapContainer (props) {

 
// {lat1:global.userLocation.latitude, lng1:global.userLocation.longitude,lat2:parseFloat(props.latitude) ,lng2:parseFloat(props.longitude) }
    // AirBnB's Office, and Apple Park
    // this.state = {
    //   coordinates: [
    //     {
    //       latitude: global.userLocation.latitude,
    //       longitude: global.userLocation.longitude,
    //     },
    //     {
    //       latitude: parseFloat(this.props.templeDetail.latitude),
    //       longitude: parseFloat(this.props.templeDetail.longitude),
    //     },
    //   ],
    // };

    // this.mapView = null;
 
 
  
    console.log("LONGITUDE==>",LONGITUDE);
    console.log("templeDetail==>",props);
    console.log("global.userLocation==>",global.userLocation);

    return (
      <View style={styles.MainContainer}>  
  
      <MapView  
        style={styles.mapStyle}  
        showsUserLocation={false}  
        zoomEnabled={true}  
        zoomControlEnabled={true}  
        zoom={6}
        initialRegion={{  
          latitude: LATITUDE ,  
          longitude: LONGITUDE,  
          latitudeDelta: LATITUDE_DELTA,  
          longitudeDelta: LONGITUDE_DELTA,  
        }}>  

        <Marker  
          coordinate={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
          }}  
          title={"Your Location"}  
          description={"Your Location"}  
          
          
           />  
        <Marker  
          coordinate={{
            latitude: parseFloat(props.latitude),
            longitude: parseFloat(props.longitude),
          }}  
         
           
          title={props.name}  
          description={props.location}  
        /> 
        <MapViewDirections
    origin={{
      latitude: LATITUDE,
      longitude: LONGITUDE,
    }}
    destination={{
      latitude: parseFloat(props.latitude),
      longitude: parseFloat(props.longitude),
    }}
    strokeColor="#7e1615"
    strokeWidth={4}
     
    apikey={GOOGLE_MAPS_APIKEY}
  />
      </MapView>  
        
    </View>  

    );
  
}
const styles = StyleSheet.create({  
  MainContainer: {  
     
    top: 0,  
    left: 0,  
    right: 0,  
    bottom: 0,  
    alignItems: 'center',  
    justifyContent: 'flex-end',  
    backgroundColor:"#fff",
    height:600,
  },  
  mapStyle: {  
    position: 'absolute',  
    top: 0,  
    left: 0,  
    right: 0,  
    bottom: 0,  
  },  
});  

export default MapContainer;