import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type AccordionItemPros = PropsWithChildren<{
  title: string;
  imageUrl:string;
}>;

function AccordionItem({ children, title,imageUrl }: AccordionItemPros): JSX.Element {
    const [ expanded, setExpanded ] = useState(false);
  
    function toggleItem() {
      setExpanded(!expanded);
    }
  
    const body = <View style={styles.accordBody}>{ children }</View>;
  //console.log("image==>",imageUrl);
    return (
      <View style={styles.accordContainer}>
        <TouchableOpacity style={styles.accordHeader} onPress={ toggleItem }>
        <Image
            style={{
              width: 32,
              height: 32,
               
            
              resizeMode: 'center',
            
            }}
            source={{
              uri: imageUrl,
            }}
          />
          <Text style={styles.accordTitle}>{ title }</Text>
          <Image
            style={{
              width: 32,
              height: 32,
              tintColor:"#000",
            
              resizeMode: 'center',
            
            }}
            source={require('../assets/images/icons/right_arrow.png')}
          />
        </TouchableOpacity>
        { expanded && body }
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    accordContainer: {
      paddingBottom: 4
    },
    accordHeader: {
      padding: 14,
      borderRadius:8,
      backgroundColor: '#ffd8a1',
      color: '#000',
      fontSize:18,
      flex: 1,
      flexDirection: 'row',
      justifyContent:'space-between'

    },
    accordTitle: {
      marginTop:5,
      fontSize: 16,
    },
    accordBody: {
      padding: 12
    },
    textSmall: {
      fontSize: 16
    },
    seperator: {
      height: 12
    }
  });
  export default AccordionItem;