// Homescreen.js
import React from "react";
import { Button, View, Text, Image } from "react-native";
import styles from "../styles/styles";
import logo from "./logo.jpg"

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./logo.jpg')}
          style={styles.logoHomepage} />
      </View>
      <Text style={styles.text}>opastetekstiä tähän tähän</Text>
      <Text style={styles.text}></Text>
    </View>
  );
}