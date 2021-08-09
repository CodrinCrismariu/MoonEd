import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NativeRouter, Route, Redirect } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'react-native-axios';
import * as SecureStore from 'expo-secure-store';
import { ip, mainColor, secondColor, thirdColor } from './Variable'; 

import HomePage from './components/HomePage';
import LogIn from './components/LogIn';
import Register from './components/Register';
import ForgotPass from './components/ForgotPass';
import News from './components/News';
import Chats from './components/Chats';
import Grades from './components/Grades';

export default App = () => {
  const routes = [
    { path: '', Component: HomePage },
    { path: 'login', Component: LogIn },
    { path: 'register', Component: Register },
    { path: 'forgotPass', Component: ForgotPass },
    { path: 'news', Component: News },
    { path: 'messages', Component: Chats },
    { path: 'grades', Component: Grades }
  ];

  const [loggedIn, setLoggedIn] = useState(0);
  const [userData, setUserData] = useState({});
  const [page, setPage] = useState('');

  const getUserData = () => {
    axios
      .post(ip + '/retrieveUserData', {
        mail: userData.mail,
      })
      .then((res) => {
        setUserData({ ...userData, ...res.data });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getValueForMail = async () => {
    setUserData({ ...userData, mail: await SecureStore.getItemAsync('mail') });
  };

  const getValueForPass = async () => {
    setUserData({ ...userData, pass: await SecureStore.getItemAsync('pass') });
  };

  useEffect(() => {
    getValueForMail();
  }, []);

  useEffect(() => {
    if (userData.mail && !userData.pass && loggedIn == 0) {
      getValueForPass();
    }
    if (userData.mail && userData.pass && loggedIn == 0) {
      axios
        .post(ip + '/login', {
          mail: userData.mail,
          pass: userData.pass,
        })
        .then((res) => {
          if (res.data == 'succes') {
            // retrieve userData
            getUserData();
            // redirect
            setPage('news');
            setLoggedIn(1);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });
  return (
    <NativeRouter>
      <Redirect to={'/' + page} />
      <View style={styles.container}>
        <StatusBar style='light' />

        {routes.map(({ path, Component }) => (
          <Route
            exact
            path={'/' + path}
            key={path}
            component={() => (
              <Component
                setPage={setPage}
                getUserData={getUserData}
                setUserData={setUserData}
                userData={userData}
                setLoggedIn={setLoggedIn}
              />
            )}
          />
        ))}
      </View>
    </NativeRouter>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColor,
  },
});
