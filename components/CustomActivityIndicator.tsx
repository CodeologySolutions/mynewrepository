import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const CustomActivityIndicator = () => (
  <View style={[styles.container, styles.horizontal]}>
     
    <ActivityIndicator size="large" color="#7e1615" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E58200'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default CustomActivityIndicator;