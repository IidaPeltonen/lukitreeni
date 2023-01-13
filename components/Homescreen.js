// Homescreen.js
import React from "react";
import { Button, View, Text, Image, TextInput } from "react-native";
import styles from "../styles/styles";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./logo.jpg')}
          style={styles.logoHomepage} />
      </View>
      <Text style={styles.textName}>Anna nimesi</Text>
      <TextInput style={styles.TextInputName}></TextInput>
    </View>
  );
}