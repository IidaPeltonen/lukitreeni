// Homescreen.js
import "react-native-gesture-handler"; //this should be the first import in your code
import React, { useState } from "react";
import { View, Text, Image, TextInput, Pressable } from "react-native";
import styles from "../styles/styles";

export default function HomeScreen({ navigation }) {
  const [name, setName] = useState('')
  const [noUser, setNoUser] = useState(true)

  function saveName() {
    setNoUser(false)
    let user = name
    setName(user)
  }

  if (noUser === true) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('./logo.jpg')}
            style={styles.logoHomepage} />
        </View>
        <View style={styles.welcome}>
        <Text style={styles.textHeader}>Anna nimesi</Text>
        <TextInput
          style={styles.textHeaderInput}
          keyboardType='default'
          onChangeText={Text => setName(Text)}
        />
        <Pressable
          title='Aloita!'
          onPress={saveName}
          style={styles.start}>
          <Text style={styles.startText}>Aloita!</Text>
        </Pressable>
        </View>
      </View>
    );
  }
  else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('./logo.jpg')}
            style={styles.logoHomepage} />
        </View>
        <View style={styles.welcome}>
          <Text style={styles.user}>Tervetuloa {name}!</Text>
          <Text style={styles.user}></Text>
          <Text style={styles.plain}>Valitse mitä haluat tehdä tänään</Text>
        </View>
      </View>
    )
  }
}