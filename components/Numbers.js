import React, { useState, useEffect } from "react";
import { Pressable, View, Text, Image, ScrollView, TextInput, Dimensions } from "react-native";
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
    getNumber()
  }

  function getNumber() {
    //tarkistetaan vaikeusaste'
    //arvotaan sopiva määrä numeroita
    //asetetaan ne numbersiim
    let tempNbrs = []
    if (difficulty === 2) {
      console.log('arvotaan kaksi numeroa')
      let number1 = Math.floor(Math.random() * 10)
      console.log('num1: ' + number1)
      tempNbrs.push(number1)
      let number2 = Math.floor(Math.random() * 10)
      console.log('num2: ' + number2)
      tempNbrs.push(number2)
      console.log(tempNbrs)
    }
    if (difficulty === 3) {
      console.log('arvotaan kolme numeroa')
      let number1 = Math.floor(Math.random() * 10)
      console.log('num1: ' + number1)
      tempNbrs.push(number1)
      let number2 = Math.floor(Math.random() * 10)
      console.log('num2: ' + number2)
      tempNbrs.push(number2)
      let number3 = Math.floor(Math.random() * 10)
      console.log('num3: ' + number3)
      tempNbrs.push(number3)
      console.log(tempNbrs)
    }
    if (difficulty === 4) {
      console.log('arvotaan nljä numeroa')
      let number1 = Math.floor(Math.random() * 10)
      console.log('num1: ' + number1)
      tempNbrs.push(number1)
      let number2 = Math.floor(Math.random() * 10)
      console.log('num2: ' + number2)
      tempNbrs.push(number2)
      let number3 = Math.floor(Math.random() * 10)
      console.log('num3: ' + number3)
      tempNbrs.push(number3)
      let number4 = Math.floor(Math.random() * 10)
      console.log('num4: ' + number4)
      tempNbrs.push(number4)
      console.log(tempNbrs)
    }
    if (difficulty === 5) {
      console.log('arvotaan visi numeroa')
      let number1 = Math.floor(Math.random() * 10)
      console.log('num1: ' + number1)
      tempNbrs.push(number1)
      let number2 = Math.floor(Math.random() * 10)
      console.log('num2: ' + number2)
      tempNbrs.push(number2)
      let number3 = Math.floor(Math.random() * 10)
      console.log('num3: ' + number3)
      tempNbrs.push(number3)
      let number4 = Math.floor(Math.random() * 10)
      console.log('num4: ' + number4)
      tempNbrs.push(number4)
      let number5 = Math.floor(Math.random() * 10)
      console.log('num5: ' + number5)
      tempNbrs.push(number5)
      console.log(tempNbrs)
    }
    if (difficulty === 6) {
      console.log('arvotaan kuusi numeroa')
      let number1 = Math.floor(Math.random() * 10)
      console.log('num1: ' + number1)
      tempNbrs.push(number1)
      let number2 = Math.floor(Math.random() * 10)
      console.log('num2: ' + number2)
      tempNbrs.push(number2)
      let number3 = Math.floor(Math.random() * 10)
      console.log('num3: ' + number3)
      tempNbrs.push(number3)
      let number4 = Math.floor(Math.random() * 10)
      console.log('num4: ' + number4)
      tempNbrs.push(number4)
      let number5 = Math.floor(Math.random() * 10)
      console.log('num5: ' + number5)
      tempNbrs.push(number5)
      let number6 = Math.floor(Math.random() * 10)
      console.log('num6: ' + number6)
      tempNbrs.push(number6)
      console.log(tempNbrs)
    }
    setNumbers(tempNbrs)
  }

  function checkNumber() {
    //setDones++
    setDone(done + 1);
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
            {/* <View style={styles.container} height={Dimensions.get("window").height -100}> */}
            <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('./logo.jpg')} style={styles.logoHomepage} />
        </View>
        <View style={styles.center}>
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
        {/* <View style={styles.container} height={Dimensions.get("window").height -100}> */}
        <View style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.textHeader}>Testaa työmuistiasi</Text>
          <View style={styles.center}>
          <Text style={styles.plain}>Paina numerosarja mieleesi ja kirjoita se ruudulle, kun aika loppuu</Text>
          <Text style={styles.plain}>{numbers}/ tää katoaa kun aika loppuu</Text>
          <TextInput style={styles.plain}>24 / tää ilmestyy kun aika loppuu</TextInput>
          <Text style={styles.Clock}>Aikaa jäljellä : 'times' </Text>
          <Pressable
                title='Aloita!'
                onPress={startGame}
                style={styles.start}>
                <Text style={styles.startText}>uudet!</Text>
              </Pressable>
        </View>
        </View>
       <Footer firstname={firstname} done={done} right={right} /> 
      </View>
      </ScrollView>
    );
  }

}