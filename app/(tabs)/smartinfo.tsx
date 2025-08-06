import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const smartinfo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Smart Info</Text>
    </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',  // Dark theme background
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
});
export default smartinfo
