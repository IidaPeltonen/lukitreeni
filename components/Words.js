import React, { useState, useEffect } from "react";
import { Pressable, View, Text, Image, ScrollView, Dimensions } from "react-native";
import styles from "../styles/styles";
import Footer from "./Footer";
import WordsTable from "./WordsTable";
import AsyncStorage from '@react-native-async-storage/async-storage';

//tarvitaan lista sanoja
const words1 = ['savu', 'sinä', 'kana', 'talo', 'aave', 'ovi', 'auto']
const words2 = ['kissa', 'koira', 'koulu', 'kaali', 'sukka', 'talvi', 'silta']
const words3 = ['apina', 'saavutus', 'kolina', 'hevonen', 'porkkana', 'peruna', 'kaappi', 'sitruuna']

export default function Words() {
  const [firstname, setFirstname] = useState('');
  const [done, setDone] = useState(0) //tehtyjen määrä
  const [difficulty, setDifficulty] = useState(0) //ensin valitaan taso, ts kuinka vaikeita sanoja
  const [words, setWords] = useState([])

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const firstname = await AsyncStorage.getItem('@firstname');
      if (firstname !== null) {
        setFirstname(firstname);
      }
    } catch(e) {
      console.log('error: ' + e)
    }
  }

  function getSelectedLvlWords(difficulty) {
    const tempWords = []
    if (difficulty === 1) {
        for (let i = 0; i < words1.length; i++) {
            tempWords.push(words1[i])
        }
    }
    if (difficulty === 2) {
        for (let i = 0; i < words2.length; i++) {
            tempWords.push(words2[i])
        }
    }
    if (difficulty === 3) {
        for (let i = 0; i < words3.length; i++) {
            tempWords.push(words3[i])
        }
    }
    //tilapäinen array sekoitetuille sanoille
    let tempRandArr = []
    let length = (tempWords.length - 1)
    //arpoo numeron väliltä 0-pituus, kunnes laskuri on 0
    for (let usedWords = 0; usedWords <= length; usedWords++) {
        let random = Math.floor(Math.random() * (tempWords.length))
        let randomWord = tempWords[random]
        tempRandArr.push(randomWord)
        tempWords.splice(random, 1)
    }
    setWords(tempRandArr)
}

  //funktio tason muuttujan nollaukseen
  function resetLevel() {
    setDifficulty(0)
  }

  //jos tasoa ei ole valittu
  if (difficulty === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('./logo.jpg')} style={styles.logoHomepage} />
        </View>
        <View style={styles.center}>
          <Text style={styles.textHeader2}>Lue sanoja</Text>
          <Text style={styles.textHeader2}>Valitse vaikeustaso</Text>
        </View>
        <View style={styles.chooseLvl}>
          <Pressable
            title='1-2 lk'
            onPress={() => {
              let helper = 1
              setDifficulty(helper)
              getSelectedLvlWords(helper);
            }}>
            <Text style={styles.choice}>1-2 lk</Text>
          </Pressable>
          <View style={styles.line} />
          <Pressable
            title='3-4 lk'
            onPress={() => {
              let helper = 2
              setDifficulty(helper)
              getSelectedLvlWords(helper);
            }}>
            <Text style={styles.choice}>3-4 lk</Text>
          </Pressable>
          <View style={styles.line} />
          <Pressable
            title='5-6 lk'
            onPress={() => {
              let helper = 3
              setDifficulty(helper)
              getSelectedLvlWords(helper);
            }}>
            <Text style={styles.choice}>5-6 lk</Text>
          </Pressable>
          </View>
        <Footer firstname={firstname} done={done} />
      </View>
    );
  }

  //jos taso on 1, eli 1-2lk
  else if (difficulty === 1) {
    const time= 30
    return (
        <View style={styles.container} >
          <View style={styles.center}>
            <Text style={styles.textHeader}>Lue sana ääneen</Text>
          </View>
          <View style={styles.right}>
            <Pressable
              style={styles.change}
              title='change'
              onPress={() => {
                resetLevel();
              }} >
              <Text style={styles.plain}>Vaihda vaikeustasoa</Text>
            </Pressable>
          </View>
          <WordsTable words={words} time={time} />
          <Footer firstname={firstname} done={done} right={right} />
        </View>
    );
  }

  //jos taso on 2, eli 3-4lk
  else if (difficulty === 2) {
    const time= 20
    return (
      <View style={styles.container} >
        <View style={styles.center}>
        <Text style={styles.textHeader}>Lue sana ääneen</Text>
        </View>
          <View style={styles.right}>
            <Pressable
            style={styles.change}
              title='change'
              onPress={() => {
                resetLevel();
              }} >
                  <Text style={styles.plain}>Vaihda vaikeustasoa</Text>
          </Pressable>
          </View>
        <WordsTable words={words} time={time} />
        <Footer firstname={firstname} done={done} right={right} />
      </View>
    );
  }

  //jos taso on 3, eli 5-6lk
  else if (difficulty === 3) {
    const time= 15
    return (
      <View style={styles.container}>
        <View style={styles.center}>
        <Text style={styles.textHeader}>Lue sana ääneen</Text>
        </View>
          <View style={styles.right}>
            <Pressable
            style={styles.change}
              title='change'
              onPress={() => {
                resetLevel();
              }} >
                  <Text style={styles.plain}>Vaihda vaikeustasoa</Text>
          </Pressable>
          </View>
        <WordsTable words={words} time={time} />
        <Footer firstname={firstname} done={done} right={right} />
      </View>
    );
  }
}


