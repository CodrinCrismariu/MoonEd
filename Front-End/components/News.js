import React from 'react';
import { StyleSheet, View } from 'react-native';
import NavBar from './NavBar';

export default News = () => {
  return (
    <View>
      <NavBar text={'Noutăți'}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272727',
  },
});
