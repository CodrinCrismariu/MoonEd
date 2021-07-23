import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Route, Redirect } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'react-native-axios';

import HomePage from './components/HomePage'
import LogIn from './components/LogIn'
import Register from './components/Register';
import ForgotPass from './components/ForgotPass';
import News from './components/News'

export default App = () => {

  const [userId, setUserId] = useState('');
  const [page, setPage] = useState('');

  return (
    <NativeRouter>

      <Redirect to={'/' + page}/>

      <View style={styles.container}>
        <StatusBar style="light" />
        <Route exact path='/' component={() => <HomePage setPage={setPage}/>} />
        <Route path='/login' component={() => <LogIn setPage={setPage}/>} />
        <Route path='/register' component={() => <Register setPage={setPage}/>} />
        <Route path='/forgotPass' component={() => <ForgotPass setPage={setPage}/>} />
        <Route exact path='/news' component={() => <News setPage={setPage}/>} />
      </View>

    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272727',
  },
});
