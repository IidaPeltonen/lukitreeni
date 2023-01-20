import React, { useState, useEffect } from "react";
import { Pressable, View, Text, Image, ScrollView, TextInput } from "react-native";
import styles from "../styles/styles";
import Footer from "./Footer";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Numbers() {
  const [firstname, setFirstname] = useState('');
  const [done, setDone] = useState(0) //tehtyjen määrä
  const [right, setRight] = useState(0) //oikeiden määrä
  const [difficulty, setDifficulty] = useState(2) //taso alkaa aina kahdesta, max on 6
  const [notStarted, setNotStart] = useState(true) //onko aloita-painettu
  const [numbers, setNumbers] = useState([]) //näytettävät numerot
  const [givenNumbers, setGivenNumbers] = useState([]) //syötetty numerosarja
  const [rightsThisRound, setRightsThisRound] = useState(0) //muuttuja kierroksen oikeita varten
  const [wrongsThisRound, setWrongsThisRound] = useState(0) //muuttuja kierroksen vääriä varten

  
//käyttäjän nimen haku
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
    console.log('Peli aloitettu')
  }

  function getNumber() {
    //tarkistetaan vaikeusaste
    //arvotaan sopiva määrä numeroita
    //asetetaan ne numbersiim
  }

  function checkNumber() {
    //setDones++
    //luetaan käyttäjän syöte
    //verrataan sitä näytettyyn numerosarjaan
    //annetaan palaute
    //josoikein, oikeat lisääntyy
    // setRightsThisRound ++
    //jos väärin
    // setWrongssThisRound ++
    //jos rightsThisRound === 2
    //difficulty++
    //jos wrongsThisRound === 2
    //difficulty--

  }


//returnit
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
            <Text style={styles.textHeader}>Testaa työmuistiasi</Text>
            <Text style={styles.plain}>Kun painat 'Aloita', ruudulle ilmestyy numerosarja.</Text>
            <Text style={styles.plain}>Ajan loppuessa kirjoita se annettuun kenttään.</Text>
            <Text style={styles.plain}>Jos saat kaksi peräkkäin oikein, taso nousee.</Text>
            <Text style={styles.plain}>Jos saat kaksi peräkkäin väärin, taso laskee.</Text>
            <Text style={styles.plain}>Ylin taso on taso numero 6.</Text>

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
  else {
    const time = 50
    return (
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.welcome}>
          <Text style={styles.textHeader}>Numeroita tähän</Text>
          <Text style={styles.plain}>24 / tää katoaa kun aika loppuu</Text>
          <TextInput style={styles.plain}>24 / tää ilmestyy kun aika loppuu</TextInput>
          <Text style={styles.Clock}>Aikaa jäljellä : 'times' </Text>
        </View>
        <Footer firstname={firstname} done={done} right={right} />
      </View>
      </ScrollView>
    );
  }

}