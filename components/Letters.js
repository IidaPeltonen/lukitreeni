import React, { useState, useEffect } from "react";
import { Pressable, View, Text, Image, TextInput, ScrollView } from "react-native";
import styles from "../styles/styles";
import Footer from "./Footer";
import AsyncStorage from '@react-native-async-storage/async-storage';

const bigs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
  'S', 'T', 'U', 'V', 'X', 'Y', 'Z', 'Å', 'Ä', 'Ö']

  let done = 0
  let right = 0
  const times = 15 // joka kerralle 15 arvausta

export default function Letters() {
  const [firstname, setFirstname] = useState('');
  const [big, setBig] = useState('') //näytettävä
  const [notStarted, setNotStart] = useState(true) //ei vielä aloitettu
  const [input, setInput] = useState('') //käyttäjän syöte
  const [wrong, setWrong] = useState('') //käyttäjän syötteen alert-kenttä
  const [refresh, setRefresh] = useState(''); // <- Add if your view not Rerender

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const firstname = await AsyncStorage.getItem('@firstname');
      console.log(firstname);
      if (firstname !== null) {
        setFirstname(firstname);
      }
    } catch(e) {
      console.log('error: ' + e)
    }
  }

  function startGame() {
    setNotStart(false)
    getLetter()
  }

  function getLetter() {
    //arvo numero ja etsi siitä indksistä kirjain aakkosia on 24
    let random = Math.floor(Math.random() * 23)
    let randomLetter = bigs[random]
    setBig(randomLetter)
  }

  function checkLetter(text) {
    //yritetyt nousee yhdellä
    done = done + 1

    //jos vastaus on oikein
    if (text === big.toLowerCase()) {
      setWrong('')
      right = right + 1
      setBig('')
      setInput('')
      startGame()
    }
    //jos ei 
    else {
      setInput('')
      setWrong('Yritä uudelleen!')
    }
    setRefresh(Math.random()); //refressaa syötteen
  }

  //jos peli on juuri aloitettu
  if (notStarted == true) {
    return (
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('./logo.jpg')} style={styles.logoHomepage} />
        </View>
        <View style={styles.welcome}>
          <View style={styles.center}>
            <Text style={styles.textHeader}>Tunnista isot kirjaimet</Text>
            <Text style={styles.plain}>Kun painat 'Aloita', ruudulle alkaa ilmestyä isoja kirjaimia.</Text>
            <Text style={styles.plain}>Kirjoita näkemäsi iso kirjain pienellä </Text>
            <Text style={styles.plain}>alareunan ruutuun </Text>
            <View style={styles.center}>
              <Pressable
                title='Aloita!'
                onPress={startGame}
                style={styles.start}>
                <Text style={styles.startText}>Aloita!</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      </ScrollView>
    );
  }

  //jos aloita on painettu
  //mutta yrityksiä on 15
  else if (done === 15) {
    return (
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('./logo.jpg')} style={styles.logo} />
        </View>
        <View style={styles.welcome}>
          <View style={styles.center}>
            <Text style={styles.textHeader}>Peli päättyi!</Text>
            <Text style={styles.plain}> </Text>
            <Text style={styles.plain}> </Text>
            <Text style={styles.plain}>Sait {right} oikein!</Text>
          </View>
        </View>
      </View>
      </ScrollView>
    );
  }
  else {
    return (
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.welcome}>
          <Text style={styles.textHeader}>Anna oikea kirjain</Text>
          <Text style={styles.letters}>{big}</Text>
          <TextInput
          value={input}
            maxLength={1}
            autoCapitalize='none'
            style={styles.letters}
            onChangeText={Text => checkLetter(Text)} />
        </View>
          <View style={styles.center}>
            <Text style={styles.wrong}>{wrong}</Text>
            <Text style={styles.plain}>Arvauksia jäljellä tällä kerralla : {times-done}</Text>
        </View>
        <Footer firstname={firstname}/>
      </View>
      </ScrollView>
    );
  }

}