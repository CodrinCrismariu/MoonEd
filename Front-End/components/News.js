import React from 'react';
import { StyleSheet, View } from 'react-native';
import NavBar from './NavBar';

export default News = (props) => {
  return (
    <View>
      <NavBar text={'Noutăți'} setPage={props.setPage} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272727',
  },
});
