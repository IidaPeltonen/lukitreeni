import "react-native-gesture-handler"; //this should be the first import in your code
import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, Pressable, ScrollView, Alert } from "react-native";
import styles from "../styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const [firstname, setFirstname] = useState('')

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
    } catch (e) {
      console.log('error: ' + e)
    }
  }

  const showAlert = () => {
    Alert.alert(
      'Moi ' + firstname + '!',
      'Nimi tallennettu.',
      [
        {
          text: 'Aloitetaan!',
          onPress: () => console.log('aloitetaan')
        }
      ]
    )
  }

    return (
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('./logo.jpg')}
            style={styles.logoHomepage} />
        </View>
        <View style={styles.welcome}>
          <Text style={styles.textHeader}>Moi! Anna nimesi</Text>
          <View style={styles.center}>
          <TextInput
            style={styles.textHeaderInput}
            onChangeText={setFirstname}
            value={firstname}
            placeholder="Nimi tähän"
          />

          <Pressable
            title="Save firstname"
            style={styles.start}
            onPress={() => {
              storeData(firstname);
              showAlert();
            }}>
            <Text style={styles.startText}>Aloita!</Text>
          </Pressable>
          </View>
          </View>
        </View>
      </ScrollView>
    );
}