import React from 'react'
import TextTicker from 'react-native-text-ticker'

const CustomMarquee = (props) => {
    console.log("props==>",props);
    return (
        <TextTicker
          
            duration={10000}
            loop={true}
            marqueeDelay={5000}
            bounce={false}
            scrollSpeed={3000}
            repeatSpacer={50}
            marqueeDelay={1000}
        >
            {props.value}
        </TextTicker>
    );
}

export default CustomMarquee;



