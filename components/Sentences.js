import React, { useState, useEffect } from "react";
import { Pressable, View, Text, Image, ScrollView, Dimensions } from "react-native";
import styles from "../styles/styles";
import Footer from "./Footer";
import SentencesTable from "./SentencesTable";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'


//tarvitaan lista sanoja
const sen1 = ['Ovi on auki.', 'Talo on iso.', 'Kissa on pieni.', 'Sinä olet kiva!']
const sen2 = ['Kissan nimi on Mauri.', 'Koulun ovi oli lukossa.', 'Kaali maistuu hyvältä.']
const sen3 = ['Apina söi puussa banaania.', 'Se oli hieno saavutus!', 'Kolina kuului kellarista.',
  'Hevonen syö mielellään porkkanaa.']

export default function Sentences() {
  const [firstname, setFirstname] = useState('');
  const [done, setDone] = useState(0) //tehtyjen määrä
  const [difficulty, setDifficulty] = useState(0) //ensin valitaan taso, ts kuinka vaikeita lauseita
  const [sentences, setSentences] = useState([])

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

  //haetaan sopivan tason sanat
  function getSelectedLvlSentences(difficulty) {
    const tempSentences = []
    if (difficulty === 1) {
      for (let i = 0; i < sen1.length; i++) {
        tempSentences.push(sen1[i])
      }
    }
    if (difficulty === 2) {
      for (let i = 0; i < sen2.length; i++) {
        tempSentences.push(sen2[i])
      }
    }
    if (difficulty === 3) {
      for (let i = 0; i < sen3.length; i++) {
        tempSentences.push(sen3[i])
      }
    }
    //tilapäinen array sekoitetuille lauseille
    let tempRandArr = []
    let length = (tempSentences.length - 1)
    //arpoo numeron väliltä 0-pituus, kunnes laskuri on 0
    for (let usedSentences = 0; usedSentences <= length; usedSentences++) {
      let random = Math.floor(Math.random() * (tempSentences.length))
      let randomSen = tempSentences[random]
      tempRandArr.push(randomSen)
      tempSentences.splice(random, 1)
      setDone(done+1)
    }
    setSentences(tempRandArr)
  }

  //funktio tason muuttujan nollaukseen
  function resetLevel() {
    setDifficulty(0)
    setDone(0)
  }

  //jos tasoa ei ole valittu
  if (difficulty === 0) {
    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={require('./logo.jpg')} style={styles.logoHomepage} />
          </View>
          <View style={styles.center}>
            <Text style={styles.textHeader2}>Valitse vaikeustaso</Text>
            <Text style={styles.plainText}>Seuraavalla sivulla lue virkkeet ääneen</Text>
          
          </View>
          <View style={styles.chooseLvl}>
            <Text></Text>
            <Pressable
              title='1-2 lk'
              onPress={() => {
                let helper = 1
                setDifficulty(helper)
                getSelectedLvlSentences(helper);
              }}>
              <Text style={styles.choice}>1. Lyhyet virkkeet</Text>
            </Pressable>
            <View style={styles.line} />
            <Pressable
              title='3-4 lk'
              onPress={() => {
                let helper = 2
                setDifficulty(helper)
                getSelectedLvlSentences(helper);
              }}>
              <Text style={styles.choice}>2. Pidemmät virkkeet</Text>
            </Pressable>
            <View style={styles.line} />
            <Pressable
              title='5-6 lk'
              onPress={() => {
                let helper = 3
                setDifficulty(helper)
                getSelectedLvlSentences(helper);
              }}>
              <Text style={styles.choice}>3. Pitkät virkkeet</Text>
            </Pressable>
            <View style={styles.line} />
          </View>
          <Footer done={done} />
        </View>
    );
  }

  //jos taso on 1, eli 1-2lk
  else if (difficulty === 1) {
    const time = 50
    return (
        <View style={styles.container}>
<View style={styles.right}>
            <Pressable
            style={styles.change}
            title='change'
            onPress={() => {
              resetLevel();
            }} >
            <MaterialCommunityIcons
              name='swap-vertical'
              size={25}
              color={'black'}
            >
            </MaterialCommunityIcons>
            <Text style={styles.changeText}>
              Taso
            </Text>
          </Pressable>
        </View>
          <SentencesTable sentences={sentences} time={time} />
          <Footer done={done} />
        </View>
    );
  }

  //jos taso on 2, eli 3-4lk
  else if (difficulty === 2) {
    const time = 40
    return (
        <View style={styles.container}>
          <View style={styles.right}>
            <Pressable
            style={styles.change}
            title='change'
            onPress={() => {
              resetLevel();
            }} >
            <MaterialCommunityIcons
              name='swap-vertical'
              size={25}
              color={'black'}
            >
            </MaterialCommunityIcons>
            <Text style={styles.changeText}>
              Taso
            </Text>
          </Pressable>
        </View>
          <SentencesTable sentences={sentences} time={time} />
          <Footer done={done} />
        </View>
    );
  }

  //jos taso on 3, eli 5-6lk
  else if (difficulty === 3) {
    const time = 30
    return (
        <View style={styles.container}>
          <View style={styles.right}>
            <Pressable
            style={styles.change}
            title='change'
            onPress={() => {
              resetLevel();
            }} >
            <MaterialCommunityIcons
              name='swap-vertical'
              size={25}
              color={'black'}
            >
            </MaterialCommunityIcons>
            <Text style={styles.changeText}>
              Taso
            </Text>
          </Pressable>
        </View>
          <SentencesTable sentences={sentences} time={time} />
          <Footer done={done} />
        </View>
    );
  }
}


