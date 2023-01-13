import React, { useState } from "react";
import { Pressable, View, Text, Image } from "react-native";
import { StretchInX } from "react-native-reanimated";
import styles from "../styles/styles";
import Footer from "./Footer";

//tarvitaan lista sanoja
const words = ['kissa', 'koira', 'kana', 'hevonen', 'porkkana', 'peruna', 'äiti']


export default function Words() {
  const [user, setUser] = useState('') //kirjautuneen nimi //miten tää saadaan?
  const [done, setDone] = useState(0) //tehtyjen määrä
  const [right, setRight] = useState(0) //oikeiden määrä
  const [time, setTime] = useState(0) //kauanko sana näkyy, määräytyy vaikeustason mukaan

  //ensin valitaan taso, ts kuinka vaikeita sanoja
  const [difficulty, setDifficulty] = useState(0)
  //valitun tason mukaan näytetään eri sanoja

  //jos tasoa ei ole valittu
  if (difficulty === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('./logo.jpg')} style={styles.logo} />
        </View>
        <View style={styles.welcome}>
          <Text style={styles.textHeader}>Valitse vaikeustaso</Text>
          <View style={styles.lineBold} />
          <Pressable
            title='1-2 lk'
            onPress={() => {
              setDifficulty(1);
            }} >
            <Text style={styles.choise}>1-2 lk</Text>
          </Pressable>
          <View style={styles.line} />
          <Pressable
            title='3-4 lk'
            onPress={() => {
              setDifficulty(2);
            }} >
            <Text style={styles.choise}>3-4 lk</Text>
          </Pressable>
          <View style={styles.line} />
          <Pressable
            title='5-6 lk'
            onPress={() => {
              setDifficulty(3);
            }} >
            <Text style={styles.choise}>5-6 lk</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  //jos taso on 1, eli 1-2lk
  else if (difficulty === 1) {
    let time= 30
    console.log('difficulty: ' + difficulty)
    console.log('time: ' + time)
    return (
      <View style={styles.container}>
        <View style={styles.welcome}>
          <Text style={styles.textHeader}>tässä alkaa tulla 1-2lk sanoja</Text>
        </View>
        <Footer done={done} right={right} />
      </View>
    );
  }

  //jos taso on 2, eli 3-4lk
  else if (difficulty === 2) {
    let time= 20
    console.log('difficulty: ' + difficulty)
    console.log('time: ' + time)
    return (
      <View style={styles.container}>
        <View style={styles.welcome}>
          <Text style={styles.textHeader}>tässä alkaa tulla 3-4lk sanoja</Text>
        </View>
        <Footer done={done} right={right} />
      </View>
    );
  }

  //jos taso on 3, eli 5-6lk
  else if (difficulty === 3) {
    let time= 15
    console.log('difficulty: ' + difficulty)
    console.log('time: ' + time)
    return (
      <View style={styles.container}>
        <View style={styles.welcome}>
          <Text style={styles.textHeader}>tässä alkaa tulla 5-6lk sanoja</Text>
        </View>
        <Footer done={done} right={right} />
      </View>
    );
  }
}


