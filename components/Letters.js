import React, { useState, useEffect } from "react";
import { Pressable, View, Text, Image, TextInput, StyleSheet, Keyboard, Dimensions } from "react-native";
import styles from "../styles/styles";
import Footer from "./Footer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const bigs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
  'S', 'T', 'U', 'V', 'X', 'Y', 'Z', 'Å', 'Ä', 'Ö']

let right = 0
let wrongAns = 0
const height = (Dimensions.get('window').height)
const boxHeight = height / 100 * 30
const marginLeft = boxHeight / 5
const fontSize = boxHeight / 2
const picSize = fontSize / 2
const wrongFontSize = fontSize / 4

export default function Letters() {
  const [firstname, setFirstname] = useState('');
  const [big, setBig] = useState('') //näytettävä
  const [notStarted, setNotStart] = useState(true) //ei vielä aloitettu
  const [text, onChangeText] = useState('') //käyttäjän syöte
  const [alert, setAlert] = useState('') //käyttäjän syötteen alert-kenttä
  const [alertPic, setAlertPic] = useState('') //käyttäjän syötteen alert-kenttä, kuva
  const [refresh, setRefresh] = useState(''); // <- Add if your view not Rerender
  const [done, setDone] = useState(0) //tehtyjen määrä

  let wrongPic =
    <MaterialCommunityIcons
      name='alert-decagram'
      size={picSize}
      color={'red'}>
    </MaterialCommunityIcons>

  let rightPic =
    <MaterialCommunityIcons
      name='flower-poppy'
      size={picSize}
      color={'red'}>
    </MaterialCommunityIcons>

  useEffect(() => {
    getData();
    Keyboard.dismiss()
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
    onChangeText('')
    setNotStart(false)
    getLetter()
  }

  function getLetter() {
    //arvo numero ja etsi siitä indksistä kirjain aakkosia on 24
    let random = Math.floor(Math.random() * 23)
    let randomLetter = bigs[random]
    setBig(randomLetter)
  }

  function checkLetter() {
    setDone(done + 1)
    setAlert('')
    setAlertPic('')
    //jos vastaus on oikein
    if (text === big.toLowerCase()) {
      setAlert('   Oikein!')
      setAlertPic(rightPic)
      right = right + 1
      startGame()
    }
    //jos ei 
    else {
      wrongAns = wrongAns + 1
      setAlert('  Yritä uudelleen!')
      setAlertPic(wrongPic)
      onChangeText('')
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
            <Text style={style.big}>{big}</Text>
            <TextInput
              placeholder=""
              value={text}
              maxLength={1}
              autoCapitalize='none'
              style={style.lettersAns}
              onChangeText={(text) => { onChangeText(text) }}
            >
            </TextInput>
          </View>
          <View style={styles.nextTo}>
            {text !== '' &&
              <Pressable
                title='Uudet'
                onPress={checkLetter}
                style={style.checkLetter}>
                <Text style={styles.checkLetterText}>Tarkista!</Text>
              </Pressable>
            }
            <Text style={style.wrong}>  {alert} {alertPic} </Text>
          </View>
        </View>
        <Footer done={done} right={right} />
      </View>
    );
  }
}

const style = StyleSheet.create({
  big: {
    height: boxHeight,
    width: boxHeight,
    margin: marginLeft,
    borderWidth: 4,
    fontSize: fontSize,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
  },
  lettersAns: {
    height: boxHeight,
    width: boxHeight,
    margin: marginLeft,
    borderWidth: 4,
    fontSize: fontSize,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  wrong: {
    fontSize: wrongFontSize,
    fontFamily: 'Roboto',
    color: 'red',
    justifyContent: 'center'
  },
  checkLetter: {
    backgroundColor: '#023020',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: marginLeft / 2
  },
});