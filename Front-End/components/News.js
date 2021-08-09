import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ip, mainColor, secondColor, thirdColor } from '../Variable'; 
import NavBar from './NavBar';

export default News = (props) => {
  return (
    <View>
      <NavBar text={ 'Noutăți' } 
              setPage={ props.setPage } 
              userData={ props.userData }
              setUserData={ props.setUserData }
              setLoggedIn={ props.setLoggedIn }/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColor,
  },
});
