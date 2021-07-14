import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import HomePage from './components/HomePage'

export default App = () => {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <StatusBar style="light" />
        <Route exact path='/' component={HomePage} />
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
