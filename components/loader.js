import React from 'react'
import AnimatedLoader from "react-native-animated-loader";
import { StyleSheet, Text } from 'react-native';

export default function Loader() {
  return (
    <AnimatedLoader
      visible={true}
      overlayColor="#FDF6AA"
      source={require("../assets/loader1.json")}
      animationStyle={styles.lottie}
      speed={1}
    >
      <Text>Loading...</Text>
    </AnimatedLoader>
  )
}


const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100
  }
});