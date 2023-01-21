import React, { useState, useEffect } from "react";
import { Pressable, View, Text, Image, ScrollView, Dimensions } from "react-native";
import styles from "../styles/styles";
import Footer from "./Footer";
import SentencesTable from "./SentencesTable";
import AsyncStorage from '@react-native-async-storage/async-storage';

//tarvitaan lista sanoja
const sen1 = ['Ovi on auki.', 'Talo on iso.', 'Kissa on pieni.', 'Sinä olet kiva!']
const sen2 = ['Kissan nimi on Mauri.', 'Koulun ovi oli lukossa.', 'Kaali maistuu hyvältä.']
const sen3 = ['Apina söi puussa banaania.', 'Se oli hieno saavutus!', 'Kolina kuului kellarista.',
  'Hevonen syö mielellään porkkanaa.']

export default function Sentences() {
  const [firstname, setFirstname] = useState('');
  const [done, setDone] = useState(0) //tehtyjen määrä
  const [right, setRight] = useState(0) //oikeiden määrä
  const [difficulty, setDifficulty] = useState(0) //ensin valitaan taso, ts kuinka vaikeita lauseita
  const [sentences, setSentences] = useState([])

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
    let length = (sentences.length - 1)
    //arpoo numeron väliltä 0-pituus, kunnes laskuri on 0
    for (let usedSentences = 0; usedSentences <= length; usedSentences++) {
      let random = Math.floor(Math.random() * (sentences.length))
      let randomSen = sentences[random]
      tempRandArr.push(randomSen)
      tempSentences.splice(random, 1)
    }
    setSentences(tempSentences)
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
            <Text style={styles.textHeader2}>Lue virkkeitä</Text>
            <Text style={styles.textHeader2}>Valitse vaikeustaso</Text>
          </View>
          <View style={styles.chooseLvl}>
            <Pressable
              title='1-2 lk'
              onPress={() => {
                let helper = 1
                setDifficulty(helper)
                getSelectedLvlSentences(helper);
              }}>
              <Text style={styles.choice}>1-2 lk</Text>
            </Pressable>
            <View style={styles.line} />
            <Pressable
              title='3-4 lk'
              onPress={() => {
                let helper = 2
                setDifficulty(helper)
                getSelectedLvlSentences(helper);
              }}>
              <Text style={styles.choice}>3-4 lk</Text>
            </Pressable>
            <View style={styles.line} />
            <Pressable
              title='5-6 lk'
              onPress={() => {
                let helper = 3
                setDifficulty(helper)
                getSelectedLvlSentences(helper);
              }}>
              <Text style={styles.choice}>5-6 lk</Text>
            </Pressable>
          </View>
          <Footer firstname={firstname} done={done} right={right} />
        </View>
    );
  }

  //jos taso on 1, eli 1-2lk
  else if (difficulty === 1) {
    const time = 50
    return (
      <ScrollView>
        {/* <View style={styles.container} height={Dimensions.get("window").height -100}> */}
        <View style={styles.container}>
          <View style={styles.center}>
            <Text style={styles.textHeader}>Lue lause ääneen</Text>
          </View>
          <View style={styles.right}>
            <Pressable
              style={styles.change}
              title='change'
              onPress={() => {
                let helper = 3
                setDifficulty(helper)
                getSelectedLvlSentences(helper);
              }}>
              <Text style={styles.plain}>Vaihda vaikeustasoa</Text>
            </Pressable>
          </View>
          <SentencesTable sentences={sentences} time={time} />
          <Footer firstname={firstname} done={done} right={right} />
        </View>
      </ScrollView>
    );
  }

  //jos taso on 2, eli 3-4lk
  else if (difficulty === 2) {
    const time = 40
    return (
      <ScrollView>
        {/* <View style={styles.container} height={Dimensions.get("window").height -100}> */}
        <View style={styles.container}>
          <View style={styles.center}>
            <Text style={styles.textHeader}>Lue lause ääneen</Text>
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
          <SentencesTable sentences={sentences} time={time} />
          <Footer firstname={firstname} done={done} right={right} />
        </View>
      </ScrollView>
    );
  }

  //jos taso on 3, eli 5-6lk
  else if (difficulty === 3) {
    const time = 30
    return (
      <ScrollView>
        {/* <View style={styles.container} height={Dimensions.get("window").height -100}> */}
        <View style={styles.container}>
          <View style={styles.center}>
            <Text style={styles.textHeader}>Lue lause ääneen</Text>
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
          <SentencesTable sentences={sentences} time={time} />
          <Footer firstname={firstname} done={done} right={right} />
        </View>
      </ScrollView>
    );
  }
}


