import React, { useState, useEffect } from "react";
import { Pressable, View, Text, Image, TextInput, ScrollView, Keyboard } from "react-native";
import styles from "../styles/styles";
import Footer from "./Footer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const bigs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
  'S', 'T', 'U', 'V', 'X', 'Y', 'Z', 'Å', 'Ä', 'Ö']

let right = 0
let wrongAns = 0
const times = 15 // joka kerralle 15 arvausta

export default function Letters() {
  const [firstname, setFirstname] = useState('');
  const [big, setBig] = useState('') //näytettävä
  const [notStarted, setNotStart] = useState(true) //ei vielä aloitettu
  const [text, onChangeText] = useState('') //käyttäjän syöte
  const [wrong, setWrong] = useState('') //käyttäjän syötteen alert-kenttä
  const [wrongPic, setWrongPic] = useState('') //käyttäjän syötteen alert-kenttä, kuva
  const [refresh, setRefresh] = useState(''); // <- Add if your view not Rerender
  const [done, setDone] = useState(0) //tehtyjen määrä

  let alertPic =
    <MaterialCommunityIcons
      name='alert-decagram'
      size={35}
      color={'red'}>
    </MaterialCommunityIcons>

  useEffect(() => {
    getData();
    Keyboard.dismiss()
    checkLetter()
    onChangeText('')
    setWrong('')
    setWrongPic('')
  }, [text]);

  const getData = async () => {
    try {
      const firstname = await AsyncStorage.getItem('@firstname');
      if (firstname !== null) {
        setFirstname(firstname);
      }
    } catch (e) {
      console.log('error: ' + e)
    }
  }

  function startGame() {
    setNotStart(false)
    getLetter()
  }

  function getLetter() {
    setDone(done + 1)
    //arvo numero ja etsi siitä indksistä kirjain aakkosia on 24
    let random = Math.floor(Math.random() * 23)
    let randomLetter = bigs[random]
    setBig(randomLetter)
  }

  function checkLetter() {
console.log('check')
    if (text !== '') {
      console.log('ei oo tyhhä')
      //jos vastaus on oikein
      if (text === big.toLowerCase()) {
        console.log('oikein')
        setWrong('Oikein!')
        right = right + 1
        startGame()
      }
      //jos ei 
      else {
        console.log('väärin')
        setWrong('  Yritä uudelleen!')
        wrongAns = wrongAns + 1
        setWrongPic(alertPic)
      }
    }
   
    setRefresh(Math.random()); //refressaa syötteen
  }
  //jos peli on juuri aloitettu
  if (notStarted == true) {
    return (
        <View style={styles.frontContainer}>
          <View style={styles.header}>
            <Image source={require('./logo.jpg')} style={styles.logoHomepage} />
          </View>
          <Text style={styles.textHeader2}>Tunnista isot kirjaimet</Text>
          <Text style={styles.plain}>Kun painat 'Aloita', ruudulle alkaa ilmestyä isoja kirjaimia.</Text>
          <Text style={styles.plain}>Kirjoita näkemäsi iso kirjain pienellä tyhjään ruutuun. </Text>
                <Pressable
                  title='Aloita!'
                  onPress={startGame}
                  style={styles.start}>
                  <Text style={styles.startText}>Aloita!</Text>
                </Pressable>
          <Footer done={done} right={right} />
        </View>
    );
  }

  else {
    return (
        <View style={styles.frontContainer}>
          <View style={styles.LetterTable}>
              <View style={styles.nextTo}>
                <Text style={styles.letters}>{big}</Text>
                <TextInput
                  placeholder=""
                  value={text}
                  maxLength={1}
                  autoCapitalize='none'
                  style={styles.lettersAns}
                  onChangeText={onChangeText}
                  >
                </TextInput>
                <Text style={styles.wrong}>{wrongPic} {wrong}xxxx</Text>
              </View>
          </View>
          <Footer done={done} right={right} />
        </View>
    );
  }
}