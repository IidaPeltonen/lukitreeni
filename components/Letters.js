import React, { useState, useEffect } from "react";
import { Pressable, View, Text, Image, TextInput, Dimensions, ScrollView } from "react-native";
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
  const [input, setInput] = useState('') //käyttäjän syöte
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
  }, []);

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
    //arvo numero ja etsi siitä indksistä kirjain aakkosia on 24
    let random = Math.floor(Math.random() * 23)
    let randomLetter = bigs[random]
    setBig(randomLetter)
    setDone(done+1)
  }

  function checkLetter(text) {
    //yritetyt nousee yhdellä

    //jos vastaus on oikein
    if (text === big.toLowerCase()) {
      setWrong('')
      right = right + 1
      startGame()
    }
    //jos ei 
    else {
      setWrong( '  Yritä uudelleen!'  )
      wrongAns = wrongAns + 1
      setWrongPic( alertPic )
    }
    setInput('')
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
        <View style={styles.center}>
          <View style={styles.center}>
            <Text style={styles.textHeader2}>Tunnista isot kirjaimet</Text>
            <Text style={styles.plainText}>Kun painat 'Aloita', ruudulle alkaa ilmestyä isoja kirjaimia.</Text>
            <Text style={styles.plainText}>Kirjoita näkemäsi iso kirjain pienellä </Text>
            <Text style={styles.plainText}>tyhjään ruutuun </Text>
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
        <Footer done={done} right={right} />
      </View>
      </ScrollView>
    );
  }

  //jos aloita on painettu
  //mutta yrityksiä on 15
  else if (done === 15) {
    return (
      // <ScrollView>
      <View style={styles.container}>
        <View style={styles.LetterContainer}>
          <View style={styles.header}>
            <Image source={require('./logo.jpg')} style={styles.logo} />
          </View>
          <View style={styles.center}>
            <View style={styles.center}>
              <Text style={styles.textHeader2}>Peli päättyi!</Text>
              <Text style={styles.plainText}> </Text>
              <Text style={styles.plainText}> </Text>
              <Text style={styles.plainText}>Sait {right} oikein!</Text>
            </View>
          </View>
          <Footer done={done} right={right} />
        </View>
      </View>
        // </ScrollView>
    );
  }
  else {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.LetterContainer}>
            <View style={styles.center}>
              <View style={styles.nextTo}>
                <Text style={styles.letters}>{big}</Text>
                <TextInput
                  placeholder=""
                  value={input}
                  maxLength={1}
                  autoCapitalize='none'
                  style={styles.letters}
                  onChangeText={checkLetter} 
                />
                <Text style={styles.wrongPic}>{wrongPic}</Text>
                <Text style={styles.wrong}>{wrong}</Text>
              </View>
              <Text style={styles.left}>Arvauksia jäljellä tällä kerralla : {times - done}</Text>
            </View>
          <View style={styles.center}>
</View>
          </View>
          <Footer done={done} right={right} />
        </View>
        </ScrollView>
    );
  }

}