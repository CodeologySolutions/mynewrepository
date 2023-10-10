import {React, useState, useEffect } from 'react';

import {
    getGeoDistance
  
  } from "../webServices/apis";

  function Distance(props) {
   
    const [distance, setDistance] = useState("0");
    
    const fetchData = async (payload) => {
     
      let res = await getGeoDistance(payload);
      if (res) {
        setDistance(res?.item?.distance);
        //console.log("res?.item?.distance==>",res?.item?.distance);
      }
    //   var requestOptions = {
    //     method: 'GET',
    //     redirect: 'follow'
    //   };
    //   var distanceA =0;
    //   var googleApiUrl="https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins="+payload.origins+"&destinations="+payload.destinations+"&mode=driving&language=pl-PL&key=AIzaSyBmMZRSWnfJdOw6Y3ZMANFXX2ta6Z9G4pM"
    //   ;
    //  // console.log("googleApiUrl==>",googleApiUrl);
    //   fetch(googleApiUrl, requestOptions)
    //     .then(response => response.text())
    //     .then(result => {
    //       console.log("result==>",result);
    //       var responseJsonObj = JSON.parse(result)
    //       console.log("responseJsonObj.rows[0]==>",responseJsonObj.rows[0]);
    //       if(responseJsonObj.rows[0].elements[0].status==='OK'){
    //         var distanceObj = responseJsonObj.rows[0].elements[0].distance;
    //         distanceA = distanceObj.value/1000;
    //         console.log("distanceA==>",distanceA);
    //         setDistance(distanceA.toFixed(0));
    //       }
           
    //     })
    //     .catch(error => console.log('error', error));
    };
    useEffect(() => {
      let payload={lat1:global.userLocation.latitude, lng1:global.userLocation.longitude,lat2:parseFloat(props.latitude) ,lng2:parseFloat(props.longitude) };
     // let payload={origins:""+global.userLocation.latitude+","+global.userLocation.longitude+"",destinations:""+props.latitude+","+props.longitude+"" };
    //  console.log("payload=====>",payload);
       fetchData(payload);
   
      //fetchLevelData();
    }, [props]);
       
    return (
       <>{distance} km</>
    );
  }
  
  export default Distance;