import React, { useState, useEffect } from "react";
import { Pressable, View, Text, Image, ScrollView, TextInput, Dimensions } from "react-native";
import styles from "../styles/styles";
import Footer from "./Footer";
import AsyncStorage from '@react-native-async-storage/async-storage';

/*
vaikeusasteet 2 - 5
tokasta kolmanteen tarvii saada 2 oikein
kolmesta neljään pitää saada 3 oikein
neljästä viiteen pitää saada 4 oikein
vitosta viisi oikein -> iso palkinto? peli päättyy?
yhteensä 8 väärin koko pelissä -> peli päättyy
*/

export default function Numbers() {
  const [firstname, setFirstname] = useState('');
  const [notStarted, setNotStart] = useState(true) //onko aloita-painettu
  const [gameEnded, setGameEnded] = useState(false) //jos 8 väärin
  const [numbers, setNumbers] = useState([]) //näytettävät numerot
  const [answer, setAnswer] = useState(['']) //syötetty numerosarja
  const [right, setRight] = useState(1) //oliko vastaus oikein
  const [done, setDone] = useState(0) //tehtyjen määrä
  const [wrong, setWrong] = useState(0) //väärien vastausten määrä, max 8

  const [rights, setRights] = useState(0) //oliko vastaus oikein
  const [info, setInfo] = useState('') //tieto oikesta ja väärästä

  const [difficulty, setDifficulty] = useState(2) //taso alkaa aina kahdesta, max on 6
  // const [newDifficulty, setNewDifficulty] = useState(2) //taso alkaa aina kahdesta, max on 6



  //käyttäjän nimen haku
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
    checkLvl()
  }

  function checkLvl() {
    console.log('difficulty: ' + difficulty)
    console.log('right: ' + right)

    setInfo('')
    if (wrong === 8) {
      setGameEnded(true)
    }
    else {
      if (difficulty === 2) {
        if (right === 2) {
          //tämä ei toimi, lvl ei vaan nouse, eikä oikeat nollaannut
/*           setDifficulty(Number(3))
          setRight(Number(0)) */
          setDifficulty(difficulty + 1)
          setRight(0)
        }
        else {
          console.log('Taso2, oikeita alle 2')
        }
      }
      if (difficulty === 3) {
        if (right === 3) {
          console.log('diff = 3 ja oikein = 3')
          setDifficulty(difficulty + 1)
          setRight(0)
        }
        else {
          console.log('Taso 3, oikeita alle 3')
        }
      }
      if (difficulty === 4) {
        if (right === 4) {
          console.log('diff = 4 ja oikein = 4')
          setDifficulty(difficulty + 1)
          setRight(0)
        }
        else {
          console.log('Taso 4, oikeita alle 4')
        }
      }
      if (difficulty === 5) {
        console.log('diff = 5')
        console.log('ollaan tasolla 5')
      }
      getNumber()
    }
  }

  function getNumber() {
    console.log('getNumberia kutsuttiin')
    console.log('diff: ' + difficulty)
    console.log('oikein; ' + right)
    setDone(done + 1);
    let tempNbrs = []

    if (difficulty === 2) {
      let number1 = Math.floor(Math.random() * 10)
      tempNbrs.push(number1)
      let number2 = Math.floor(Math.random() * 10)
      tempNbrs.push(number2)
    }
    else if (difficulty === 3) {
      let number1 = Math.floor(Math.random() * 10)
      tempNbrs.push(number1)
      let number2 = Math.floor(Math.random() * 10)
      tempNbrs.push(number2)
      let number3 = Math.floor(Math.random() * 10)
      tempNbrs.push(number3)
    }
    else if (difficulty === 4) {
      let number1 = Math.floor(Math.random() * 10)
      tempNbrs.push(number1)
      let number2 = Math.floor(Math.random() * 10)
      tempNbrs.push(number2)
      let number3 = Math.floor(Math.random() * 10)
      tempNbrs.push(number3)
      let number4 = Math.floor(Math.random() * 10)
      tempNbrs.push(number4)
    }
    else if (difficulty === 5) {
      let number1 = Math.floor(Math.random() * 10)
      tempNbrs.push(number1)
      let number2 = Math.floor(Math.random() * 10)
      tempNbrs.push(number2)
      let number3 = Math.floor(Math.random() * 10)
      tempNbrs.push(number3)
      let number4 = Math.floor(Math.random() * 10)
      tempNbrs.push(number4)
      let number5 = Math.floor(Math.random() * 10)
      tempNbrs.push(number5)
    }
    setNumbers(tempNbrs)
  }

  function editAnswer() {
    if (answer.length !== numbers.length) {
      alert('Tarkista numeroiden määrä')
    }
    else {
      let tempAnswer = []
      if (answer.length === 2) {
        let first = answer.substring(0, 1)
        let second = answer.substring(1, 2)
        tempAnswer.push(first, second)
      }
      if (answer.length === 3) {
        let first = answer.substring(0, 1)
        let second = answer.substring(1, 2)
        let third = answer.substring(2, 3)
        tempAnswer.push(first, second, third)
      }
      if (answer.length === 4) {
        let first = answer.substring(0, 1)
        let second = answer.substring(1, 2)
        let third = answer.substring(2, 3)
        let fourth = answer.substring(3, 4)
        tempAnswer.push(first, second, third, fourth)
      }
      if (answer.length === 5) {
        let first = answer.substring(0, 1)
        let second = answer.substring(1, 2)
        let third = answer.substring(2, 3)
        let fourth = answer.substring(3, 4)
        let fifth = answer.substring(4, 5)
        tempAnswer.push(first, second, third, fourth, fifth)
      }
      checkNumber(tempAnswer)
    }
  }

  function checkNumber(tempAnswer) {
    let oikein = 0
    let vaarin = 0
    for (let x = 0; x < tempAnswer.length; x++) {
      if (Number(tempAnswer[x]) === Number(numbers[x])) {
        //tässä voisi muuttaa vaikka väriä tai piilottaa tai jotain
        //oikeiden määrä nousee
        oikein = oikein + 1
      }
      else {
        vaarin = vaarin + 1
      }
    }
    //jos koko sana on oikein
    if (oikein === numbers.length) {
      console.log('koko sarja oikein')
      setRight(right + 1)
      setNumbers('')
      setInfo('Hyvä, oikein!')
    }
    else {
      console.log('koko sarja ei oikein')
      setWrong(wrong + 1)
      setInfo('Harmi, pieleen meni!')
    }
    setAnswer('')
    console.log('arvotaan uudet')

  }


  //returnit
  //jos aloita ei ole painettu
  if (notStarted == true) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('./logo.jpg')} style={styles.logoHomepage} />
        </View>
        <View style={styles.center}>
          <Text style={styles.textHeader2}>Testaa työmuistiasi</Text>
          <Text style={styles.plainText}>Kun painat 'Aloita', ruudulle ilmestyy numerosarja.</Text>
          <Text style={styles.plainText}>Ajan loppuessa kirjoita se allaolevaan kenttään.</Text>
          <Text style={styles.plainText}>Taso nousee, kun saat tarpeeksi monta oikeaa vastausta.</Text>
          <Text style={styles.plainText}>Yhteensä kahdeksan väärin mennyttä numerosarjaa päättää pelin.</Text>
          <Text style={styles.plainText}></Text>
        </View>
        <View style={styles.center}>
          <Pressable
            title='Aloita!'
            onPress={startGame}
            style={styles.start}>
            <Text style={styles.startText}>Aloita!</Text>
          </Pressable>
        </View>
        <Footer firstname={firstname} />
      </View>
    );
  }

  //jos aloita on painettu, mutta peli on jo loppunut
  else if (gameEnded === true) {
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.plainText}> Peli päättyi, sait 8 väärin </Text>
        </View>
        <Footer firstname={firstname} />
      </View>
    );
  }

  else {
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.numberToShow}> {numbers} </Text>
          <TextInput
            placeholder=""
            value={answer}
            style={styles.numberToWrite}
            keyboardType='number-pad'
            onChangeText={setAnswer}
          />
          <Text style={styles.plain}>{info}</Text>
          <Text style={styles.plain}>Arvottuja numerosarjoja: {done}</Text>
          <Text style={styles.plain}>Oikein: {right}</Text>
          <Text style={styles.plain}>Väärin: {wrong}</Text>
        </View>
        <View style={styles.center}>
          <View style={styles.nextTo}>
            <Pressable
              title='Tarkista'
              onPress={editAnswer}
              style={styles.checkNumber}>
              <Text style={styles.checkNumberText}>Tarkista</Text>
            </Pressable>
            <Pressable
              title='Uudet'
              onPress={checkLvl}
              style={styles.checkNumber}>
              <Text style={styles.checkNumberText}>Arvo uudet</Text>
            </Pressable> 
          </View>
        </View>
        {/*  <Footer firstname={firstname} done={done} right={right} /> */}
      </View>

    );
  }


}