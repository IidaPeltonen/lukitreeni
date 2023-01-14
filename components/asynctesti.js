/* // Homescreen.js
import "react-native-gesture-handler"; //this should be the first import in your code
import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, Pressable } from "react-native";
import styles from "../styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const [noUser, setNoUser] = useState(true)
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [usernameInfo, setUsernameInfo] = useState('')

   const getData = async () => {
    const usernameInfo = await AsyncStorage.getItem('@username')
    setUsername(JSON.parse(usernameInfo))
  }

  const saveName = async () => {
    setNoUser(false)
    const nameToSave = {
      username: username
    }
    await AsyncStorage.setItem('@username', JSON.stringify(nameToSave))
    setUsernameInfo(nameToSave)
  }

  useEffect(getData) 

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
          value={name}
        />
        <Pressable
          title='Aloita!'
          //onPress={saveName}
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
          <Text style={styles.user}>Tervetuloa {usernameInfo.username}!</Text>
          <Text style={styles.user}></Text>
          <Text style={styles.plain}>Valitse mitä haluat tehdä tänään</Text>
        </View>
      </View>
    )
  }
} */