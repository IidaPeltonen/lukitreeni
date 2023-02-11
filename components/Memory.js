import React, { useState, useEffect } from "react";
import { Pressable, View, Text, Image, ScrollView, TextInput, Dimensions, StyleSheet } from "react-native";
import styles from "../styles/styles";
import Footer from "./Footer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

/*
vaikeusasteet 2 - 5
tokasta kolmanteen tarvii saada 2 oikein
kolmesta neljään pitää saada 3 oikein
neljästä viiteen pitää saada 4 oikein
vitosta viisi oikein -> iso palkinto? peli päättyy?
yhteensä 8 väärin koko pelissä -> peli päättyy
*/

let totalRight = 0 //kaikki oikeat yhteensä
const height = (Dimensions.get('window').height)
const boxHeight = height / 100 * 30
const boxWidth = boxHeight * 3
const fontSize = boxHeight /2
const picSize = fontSize /2
const infoSize = picSize /2

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
  const [infoPics0, setInfoPics0] = useState([]) //tieto oikesta ja väärästä indeksissä 0
  const [infoPics1, setInfoPics1] = useState([]) //tieto oikesta ja väärästä indeksissä 1
  const [infoPics2, setInfoPics2] = useState([]) //tieto oikesta ja väärästä indeksissä 2
  const [infoPics3, setInfoPics3] = useState([]) //tieto oikesta ja väärästä indeksissä 3
  const [infoPics4, setInfoPics4] = useState([]) //tieto oikesta ja väärästä indeksissä 4
  const [difficulty, setDifficulty] = useState(2) //taso alkaa aina kahdesta, max on 6
  const [isNumberVisible, setIsNumberVisible] = useState(false) //näytettävä lukujono
  const [isInputVisible, setIsInputVisible] = useState(false) //näytettävä input-kenttä
  const [IsCheckVisible, setIsCheckVisible] = useState(false) //näytettävä tarkista-nappi
  const [isNewVisible, setIsNewVisible] = useState(false) //näytettävä arvo uudet-nappi
  const [time, setTime] = useState(10000) //Leenan antama aika, kauanko lukujono näkyy

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
    setInfoPics0('')
    setInfoPics1('')
    setInfoPics2('')
    setInfoPics3('')
    setInfoPics4('')
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
    //numerokenttä näkyväksi, input, tarkista ja uudet piiloon
    setIsNumberVisible(true)
    setIsInputVisible(false)
    setIsCheckVisible(false)
    setIsNewVisible(false)
    setTimeout(() => {
      setIsNumberVisible(false)
      setIsInputVisible(true)
      setIsCheckVisible(true)
      setIsNewVisible(false)
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
        oikein = oikein + 1
        if (x === 0) {
          setInfoPics0(<MaterialCommunityIcons
            name='check'
            size= {picSize}
            color={'green'}
            key={x}>
        </MaterialCommunityIcons>) 
        } 
        if (x === 1) {
          setInfoPics1(<MaterialCommunityIcons
            name='check'
            size= {picSize}
            color={'green'}
            key={x}>
        </MaterialCommunityIcons>) 
        } 
        if (x === 2) {
          setInfoPics2(<MaterialCommunityIcons
            name='check'
            size= {picSize}
            color={'green'}
            key={x}>
        </MaterialCommunityIcons>) 
        } 
        if (x === 3) {
          setInfoPics3(<MaterialCommunityIcons
            name='check'
            size= {picSize}
            color={'green'}
            key={x}>
        </MaterialCommunityIcons>) 
        } 
        if (x === 4) {
          setInfoPics4(<MaterialCommunityIcons
            name='check'
            size= {picSize}
            color={'green'}
            key={x}>
        </MaterialCommunityIcons>) 
        } 
      }
      else {
        vaarin = vaarin + 1
        if (x === 0) {
          setInfoPics0(<MaterialCommunityIcons
            name='alert-octagram'
            size= {picSize}
            color={'red'}
            key={x}>
        </MaterialCommunityIcons>) 
        } 
        if (x === 1) {
          setInfoPics1(<MaterialCommunityIcons
            name='alert-octagram'
            size= {picSize}
            color={'red'}
            key={x}>
        </MaterialCommunityIcons>) 
        } 
        if (x === 2) {
          setInfoPics2(<MaterialCommunityIcons
            name='alert-octagram'
            size= {picSize}
            color={'red'}
            key={x}>
        </MaterialCommunityIcons>) 
        } 
        if (x === 3) {
          setInfoPics3(<MaterialCommunityIcons
            name='alert-octagram'
            size= {picSize}
            color={'red'}
            key={x}>
        </MaterialCommunityIcons>) 
        } 
        if (x === 4) {
          setInfoPics4(<MaterialCommunityIcons
            name='alert-octagram'
            size= {30}
            color={'red'}
            key={x}>
        </MaterialCommunityIcons>) 
        } 
      }
    }

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
    setIsNewVisible(true)
    setIsCheckVisible(false)
  }

  //returnit
  //jos aloita ei ole painettu
  if (notStarted == true) {
    return (
      <View style={styles.frontContainer}>
        <View style={styles.header}>
          <Image source={require('./logo.jpg')} style={styles.logoHomepage} />
        </View>
          <Text style={styles.textHeader2}>Testaa työmuistiasi</Text>
          <Text style={styles.plain}>Kun painat 'Aloita', ruudulle ilmestyy numerosarja, paina se mieleesi. </Text>
          <Text style={styles.plain}>Kun tyhjä kenttä ilmestyy, kirjoita numero siihen. Taso nousee pikkuhiljaa, </Text>
          <Text style={styles.plain}>mutta yhteensä kahdeksan väärin mennyttä numerosarjaa päättää pelin.</Text>
          <Pressable
            title='Aloita!'
            onPress={startGame}
            style={styles.start}>
            <Text style={styles.startText}>Aloita!</Text>
          </Pressable>
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
            {isNumberVisible &&
              <Text style={style.numberTo}> {numbers} </Text>
            }
            {isInputVisible &&
              <TextInput
                placeholder=""
                value={answer}
                style={style.numberTo2}
                keyboardType='number-pad'
                onChangeText={setAnswer}
              />
            }
            <Text style={styles.infoPics}> {infoPics0} {infoPics1} {infoPics2} {infoPics3} {infoPics4}  </Text>
            <Text style={style.info}> {info}  </Text>
              {IsCheckVisible &&
                <Pressable
                  title='Tarkista'
                  onPress={editAnswer}
                  style={styles.checkNumber}>
                  <Text style={styles.checkNumberText}>Tarkista</Text>
                </Pressable>
              }
              {isNewVisible &&
                <Pressable
                  title='Uudet'
                  onPress={checkLvl}
                  style={styles.checkNumber}>
                  <Text style={styles.checkNumberText}>Arvo uudet</Text>
                </Pressable>
              }
        </View>
        <Footer done={done} right={totalRight} />
      </View>
    );
  }
}

const style = StyleSheet.create({
  numberTo: {
    height: boxHeight,
    width: boxWidth,
    borderWidth: 4,
    fontSize: fontSize,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
  },
  numberTo2: {
    height: boxHeight,
    width: boxWidth,
    borderWidth: 4,
    fontSize: fontSize,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
  },
    //työmuistin tekstikenttä:
    info: {
      fontSize: infoSize,
      fontFamily: 'Roboto',
      color: 'red',
      textAlign: 'center'
    },
});