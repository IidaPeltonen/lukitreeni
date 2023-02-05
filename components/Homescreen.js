import "react-native-gesture-handler"; 
import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, Pressable, Alert } from "react-native";
import styles from "../styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "./Footer";

let done = 0
let right = 0

export default function HomeScreen({ navigation }) {
  const [firstname, setFirstname] = useState('')
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    clearData();
  }, []);

  const clearData = async () => {
    try {
      await AsyncStorage.removeItem('@firstname');
    } catch (e) {
      console.log('error: ' + e)
    }
  }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@firstname', value)
      if (firstname === '') {
        setIsSaved(false)
        alert('Anna nimesi!')
        return
      }
      else {
        setIsSaved(true)
        showAlert
      }
    } catch (e) {
      console.log('error: ' + e)
    }
  }

  const showAlert = () => {
    Alert.alert(
      'Moi ' + firstname + '!',
      'Nimi tallennettu.' + 'Valitse valikosta haluamasi aktiviteetti.',
      [
        {
          text: 'Aloitetaan!',
        }
      ]
    )
  }

  //jos nimeä ei ole tallessa 
  if (isSaved === false) {
    return (
      <View style={styles.frontContainer}>
        <View style={styles.header}>
          <Image source={require('./logo.jpg')}
            style={styles.logoHomepage} />
        </View>
          <Text style={styles.textHeader}>Tervetuloa lukitreeniin!</Text>
          <Text></Text>
            <TextInput
              style={styles.textHeaderInput}
              onChangeText={setFirstname}
              value={firstname}
              placeholder="Kirjoita nimesi tähän"
            />
            <Pressable
              title="Save firstname"
              style={styles.start}
              onPress={() => {
                storeData(firstname);
              }}>
              <Text style={styles.startText}>Aloita!</Text>
            </Pressable>
      </View>
    );
  }
  else {
    return (
      <View style={styles.frontContainer}>
        <View style={styles.header}>
          <Image source={require('./logo.jpg')}
            style={styles.logoHomepage} />
        </View>
        <View style={styles.center}>
          <Text style={styles.textHeader}>Tervetuloa lukitreeniin</Text>
          <Text style={styles.textHeader}>{firstname}!</Text>
        </View>
        <Footer done={done} right={right} />
      </View>
    );
  }

}