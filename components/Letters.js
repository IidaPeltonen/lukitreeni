import React, { useState } from "react";
import { Pressable, View, Text, Image, TextInput } from "react-native";
import styles from "../styles/styles";
import Footer from "./Footer";

const bigs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
  'S', 'T', 'U', 'V', 'X', 'Y', 'Z', 'Å', 'Ä', 'Ö']

let counter = 0 //montako tehty
let guesses = 0 //montako oikein
const times = 15 // joka kerralle 15 arvausta
const left = times - counter

export default function Letters() {
  const [user, setUser] = useState('') //kirjautuneen nimi //miten tää saadaan?
  const [done, setDone] = useState(0) //tehtyjen määrä
  const [right, setRight] = useState(0) //oikeiden määrä
  const [big, setBig] = useState('') //näytettävä
  const [notStarted, setNotStart] = useState(true) //taso alkaa aina kahdesta, max on 6
  const [input, setInput] = useState('') //käyttäjän syöte
  const [wrong, setWrong] = useState('') //käyttäjän syötteen alert-kenttä


  function startGame() {
    setNotStart(false)
    console.log('Peli aloitettu')
    getLetter()
  }

  function getLetter() {
    //arvo numero ja etsi siitä indksistä kirjain aakkosia on 24
    let random = Math.floor(Math.random() * 23)
    let randomLetter = bigs[random]
    setBig(randomLetter)
    console.log('randomLetter: ' + randomLetter)
  }

  function checkLetter(text) {
    //done nousee yhdellä
    counter = +1
    console.log('counter: ' + counter)
    console.log('big: ' + big)
    console.log('given: ' + text)

    //jos vastaus on oikein
    if (text === big.toLowerCase()) {
      setWrong('')
      console.log('oikein')
      guesses = +1
      setBig('')
      setInput('')
      setRight(guesses)
    }
    //jos ei 
    else {
      setInput('')
      setWrong('Yritä uudelleen!')
    }
    setDone(counter) //ei toimi

  }

  //jos peli on juuri aloitettu
  if (notStarted == true) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('./logo.jpg')} style={styles.logo} />
        </View>
        <View style={styles.welcome}>
          <View style={styles.center}>
            <Text style={styles.textHeader}>Testaa työmuistiasi</Text>
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
    );
  }

  //jos aloita on painettu
  else {
    return (
      <View style={styles.container}>
        <View style={styles.welcome}>
          <Text style={styles.textHeader}>Anna oikea kirjain</Text>
          <Text style={styles.letters}>{big}</Text>
          <TextInput
            maxLength={1}
            autoCapitalize='none'
            style={styles.letters}
            onChangeText={Text => checkLetter(Text)} />
        </View>
{/*          <View style={styles.center}>
              <Pressable
                title='Tarkista!'
                onPress={checkLetter(input)}
                style={styles.start}>
                <Text style={styles.startText}>Tarkista!</Text>
              </Pressable>
            </View>  */}
          <View style={styles.center}>
            <Text style={styles.wrong}>{wrong}</Text>
            <Text style={styles.plain}>Kirjaimia jäljellä : {left}</Text>
        </View>
        <Footer done={counter} right={done} />
      </View>
    );
  }

}