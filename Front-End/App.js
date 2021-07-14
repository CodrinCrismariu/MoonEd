import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Route } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';

import HomePage from './components/HomePage'
import LogIn from './components/LogIn'
import Register from './components/Register';

export default App = () => {
  const [page, setPage] = useState('');

  return (
    <NativeRouter>
      <View style={styles.container}>
        <StatusBar style="light" />
        <Route exact path='/' component={() => <HomePage page={page} setPage={setPage}/>} />
        <Route path='/login' component={() => <LogIn page={page} setPage={setPage}/>} />
        <Route path='/register' component={() => <Register page={page} setPage={setPage}/>} />
      </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272727',
  },
  test: {
    top: 100,
  },
});
