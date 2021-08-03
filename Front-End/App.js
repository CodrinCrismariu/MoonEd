import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NativeRouter, Route, Redirect } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'react-native-axios';
import * as SecureStore from 'expo-secure-store';

import HomePage from './components/HomePage';
import LogIn from './components/LogIn';
import Register from './components/Register';
import ForgotPass from './components/ForgotPass';
import News from './components/News';
import Messages from './components/Messages';

export default App = () => {

  const [loggedIn, setLoggedIn] = useState(0);
  const [userData, setUserData] = useState({});
  const [page, setPage] = useState('');

  const getValueForMail = async () => {
    setUserData({ ...userData, mail: await SecureStore.getItemAsync('mail') });
  }

  const getValueForPass = async () => {
    setUserData({ ...userData, pass: await SecureStore.getItemAsync('pass') });
  }

  useEffect(() => {
    getValueForMail();
  }, []);

  useEffect(() => {
    if (userData.mail && !userData.pass && loggedIn == 0) {
      getValueForPass();
    }
    if (userData.mail && userData.pass && loggedIn == 0) {
      axios.post('http://192.168.1.189:3000/login', {
        mail: userData.mail,
        pass: userData.pass,
      })
        .then((res) => {
          if (res.data == 'succes') {
            // retrieve userData
            axios.post('http://192.168.1.189:3000/retrieveUserData', {
              mail: userData.mail
            })
            .then((res) => { 
              setUserData({ ...userData, ...res.data });
            })
            .catch((err) => { 
              console.error(err) 
            })
            // redirect
            setPage('news');
            setLoggedIn(1);
          }
        })
        .catch((err) => {
          console.error(err);
        })
    }
  });
  return (
    <NativeRouter>

      <Redirect to={'/' + page} />
      <View style={styles.container}>
        <StatusBar style="light" />
        <Route exact path='/' component={() => <HomePage setPage={setPage} />} />
        <Route path='/login' component={() => <LogIn setPage={setPage} />} />
        <Route path='/register' component={() => <Register setPage={setPage} />} />
        <Route path='/forgotPass' component={() => <ForgotPass setPage={setPage} />} />
        <Route exact path='/news' component={() => <News setPage={setPage}
          name={userData.name}
          setLoggedIn={setLoggedIn} />} />
        <Route path='/messages' component={() => <Messages userData={userData} setPage={setPage} />} />
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
