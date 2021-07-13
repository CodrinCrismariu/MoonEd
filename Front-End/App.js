import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Canvas from 'react-native-canvas'

export default function App() {

  let handleCanvas = (canvas) => {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#BABABA';
    ctx.fillRect(0, 0, 100, 100);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Canvas ref={handleCanvas}>
        <Text style={styles.text}>Open up App.js to start working on your app!</Text>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272727',
  },
  text: {
    color: '#fff',
  }
});
