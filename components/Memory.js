import React, { useState, useEffect } from "react";
import { Pressable, View, Text, Image, ScrollView, TextInput, button, ToastAndroid } from "react-native";
import styles from "../styles/styles";
import Footer from "./Footer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { SvgVolumeHigh } from "react-native-materialcommunity-icons";

let totalRight = 0 //kaikki oikeat yhteensä
/*
vaikeusasteet 2 - 5
tokasta kolmanteen tarvii saada 2 oikein
kolmesta neljään pitää saada 3 oikein
neljästä viiteen pitää saada 4 oikein
vitosta viisi oikein -> iso palkinto? peli päättyy?
yhteensä 8 väärin koko pelissä -> peli päättyy
*/

export default function Memory() {
  const [firstname, setFirstname] = useState('');
  const [notStarted, setNotStart] = useState(true) //onko aloita-painettu
  const [gameEnded, setGameEnded] = useState(false) //jos 8 väärin
  const [numbers, setNumbers] = useState([]) //näytettävät numerot
  const [answer, setAnswer] = useState(['']) //syötetty numerosarja
  const [right, setRight] = useState(0) //oliko vastaus oikein
  const [done, setDone] = useState(0) //tehtyjen määrä
  const [wrong, setWrong] = useState(0) //väärien vastausten määrä, max 8
  const [info, setInfo] = useState('') //tieto oikesta ja väärästä
  const [infoPics, setInfoPics] = useState([]) //tieto oikesta ja väärästä
  const [difficulty, setDifficulty] = useState(2) //taso alkaa aina kahdesta, max on 6
  const [counter, setCounter] = useState(0) //kauanko lukujono näkyy, määräytyy vaikeustason mukaan
  const [isAlertVisible, setIsAlertVisible] = useState(false) //näytettävä lukujono
  const [isInputVisible, setIsInputVisible] = useState(false) //näytettävä input-kenttä
  const [time, setTime] = useState(10000) //Leenan antama aika, kauanko lukujono näkyy
  const [helper, setHelper] = useState(0) //apumuuttuja kuvien keyhyn
  const [helper2, setHelper2] = useState(0) //apumuuttuja kuvien keyhyn

  const wrongPic =
  <MaterialCommunityIcons
      name='alpha-x'
      size= '20'
      color={'red'}
      key={helper+1}>
  </MaterialCommunityIcons>

const rightPic =
<MaterialCommunityIcons
    name='check'
    size= '20'
    color={'greeb'}
    key={helper2+1}>
</MaterialCommunityIcons>

  //käyttäjän nimen haku
  //ja lvl-tarkistus
  useEffect(() => {
    getData();
    checkLvl()
    chckTime()
  }, [difficulty]);

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

  //hakee ajan vaikeuden mukaan, Leena saa miettiä ajat
  function chckTime() {
    if (difficulty === 2) {
      setTime(10000)
    }
    if (difficulty === 3) {
      setTime(13000)
    }
    if (difficulty === 4) {
      setTime(17000)
    }
    if (difficulty === 5) {
      setTime(20000)
    }
  }

  function startGame() {
    setGameEnded(false)
    setRight(0)
    setWrong(0)
    setDifficulty(2)
    setDone(0)
    setNotStart(false)
    checkLvl()
  }

  function checkLvl() {
    setInfo('')
    if (wrong === 8) {
      setGameEnded(true)
      return
    }
    else {
      if (difficulty === 2) {
        if (right === 2) {
          setDifficulty(difficulty + 1)
          setRight(0)
        }
        else {

        }
      }
      if (difficulty === 3) {
        if (right === 3) {
          setDifficulty(difficulty + 1)
          setRight(0)
        }
        else {

        }
      }
      if (difficulty === 4) {
        if (right === 4) {
          setDifficulty(difficulty + 1)
          setRight(0)
        }
        else {

        }
      }
      if (difficulty === 5) {
        if (right === 5) {
          setDifficulty(difficulty + 1)
          setRight(0)
        }
        else {

        }
      }
      getNumber()
    }
  }

  function getNumber() {
    setAnswer('')
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
    //numerokenttä näkyväksi
    //ja niiden jälkeen input näkyviin
    setIsAlertVisible(true);
    setIsInputVisible(false)
    setTimeout(() => {
      setIsAlertVisible(false)
      setIsInputVisible(true)
    }, time)
  }

  function editAnswer() {
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

  function checkNumber(tempAnswer) {
    setDone(done + 1);
    let oikein = 0
    let vaarin = 0
    for (let x = 0; x < tempAnswer.length; x++) {
      if (Number(tempAnswer[x]) === Number(numbers[x])) {
        //tässä voisi muuttaa vaikka väriä tai piilottaa tai jotain
        //oikeiden määrä nousee
        oikein = oikein + 1
        infoPics.push(rightPic)
      }
      else {
        vaarin = vaarin + 1
        infoPics.push(wrongPic)
      }
    }
    console.log('uvat: ' + infoPics)
    //jos koko sana on oikein
    if (oikein === numbers.length) {
      setRight(right + 1)
      totalRight = totalRight + 1
      setNumbers('')
      setInfo('Hyvä, oikein!')
    }
    else {
      setWrong(wrong + 1)
      setInfo('Harmi, pieleen meni!')
    }
    setNumbers('')
  }



  //returnit
  //jos aloita ei ole painettu
  if (notStarted == true) {
    return (
      <View style={styles.frontContainer}>
        <View style={styles.header}>
          <Image source={require('./logo.jpg')} style={styles.logoHomepage} />
        </View>
        <ScrollView>
          <Text style={styles.textHeader2}>Testaa työmuistiasi</Text>
          <Text style={styles.plain}>Kun painat 'Aloita', ruudulle ilmestyy numerosarja, paina se mieleesi </Text>
          <Text style={styles.plain}>ja ajan loppuessa kirjoita se allaolevaan kenttään. Taso nousee pikkuhiljaa, </Text>
          <Text style={styles.plain}>mutta yhteensä kahdeksan väärin mennyttä numerosarjaa päättää pelin.</Text>
          <Pressable
            title='Aloita!'
            onPress={startGame}
            style={styles.start}>
            <Text style={styles.startText}>Aloita!</Text>
          </Pressable>
        </ScrollView>
        <Footer done={done} right={totalRight} />
      </View>
    );
  }

  //jos aloita on painettu, mutta peli on jo loppunut
  else if (gameEnded === true) {
    return (
      <ScrollView>
        <View style={styles.frontContainer}>
          <View style={styles.center}>
            <Text style={styles.plainText}> Peli päättyi, sait 8 väärin </Text>
            <Text style={styles.plainText}> ja {totalRight} oikein </Text>
            <View style={styles.center}>
              <Pressable
                title='Aloita alusta!'
                onPress={startGame}
                style={styles.start}>
                <Text style={styles.startText}>Aloita alusta!</Text>
              </Pressable>
            </View>
          </View>
          <Footer done={done} right={totalRight} />
        </View>
      </ScrollView>
    );
  }

  else {
    return (
      <View style={styles.frontContainer}>
        <View style={styles.MemoryTable}>
          <ScrollView>
          <Text style={styles.plain}>Vaikeustaso: {difficulty}</Text>

           {isAlertVisible && 
              <Text style={styles.numberToShow}> {numbers} </Text>
           }

            {isInputVisible && 
            <TextInput
              placeholder=""
              value={answer}
              style={styles.numberToWrite}
              keyboardType='number-pad'
              onChangeText={setAnswer}
            />
            } 
            <Text style={styles.wrong}> {info} {infoPics} </Text>
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
          </ScrollView>
        </View>
        <Footer done={done} right={totalRight} />
      </View>
    );
  }


}