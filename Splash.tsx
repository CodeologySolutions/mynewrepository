import React, {useRef, useState, useEffect }  from 'react';
import {   
    View,    
    ImageBackground,
   
  } from 'react-native';
  type SplashProps = {
    imageURL: string;
  };
  function Splash( props: SplashProps)  {
    return <View style={{flex: 1, position: 'absolute', left: 0, top:0, height:"100%",
    width:"100%"}}>
       <ImageBackground source={{uri:props.imageURL}} resizeMode="cover" style={{
        flex: 1,
        position: 'absolute', left: 0, top:0,
        justifyContent: 'center',
        resizeMode: 'contain',
        height:"100%",
        width:"100%"
      }}>
    
    </ImageBackground>
  </View>  
  }
  
  export default Splash;