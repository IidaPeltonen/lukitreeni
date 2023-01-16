import React, { useState } from "react";
import { Pressable, View, Text, Image } from "react-native";
import { StretchInX } from "react-native-reanimated";
import styles from "../styles/styles";
import Footer from "./Footer";
import WordsTable from "./WordsTable";

export default function Words() {
  const [user, setUser] = useState('') //kirjautuneen nimi //miten tää saadaan?
  const [done, setDone] = useState(0) //tehtyjen määrä
  const [right, setRight] = useState(0) //oikeiden määrä
  const [difficulty, setDifficulty] = useState(0) //ensin valitaan taso, ts kuinka vaikeita sanoja

  //funktio tason muuttujan nollaukseen
  function resetLevel() {
    setDifficulty(0)
  }

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
    const time= 30
    return (
      <View style={styles.container}>
        <View style={styles.welcome}>
          <Text style={styles.textHeader}>Lue sana ääneen</Text>
          {/* käytetään sanoja words1
              sanat ilmestyy randomisti eri puolilta
              aika on määritetty, se näkyy loppuu asti, samoin laskuri */}
            <Pressable
            style={styles.change}
              title='change'
              onPress={() => {
                resetLevel();
              }} >
            <Text style={styles.plain}>Vaihda vaikeustasoa</Text>
          </Pressable>
        </View>
        <WordsTable difficulty={difficulty} time={time} />
        <Footer done={done} right={right} />
      </View>
    );
  }

  //jos taso on 2, eli 3-4lk
  else if (difficulty === 2) {
    const time= 20
    return (
      <View style={styles.container}>
        <View style={styles.welcome}>
          <Text style={styles.textHeader}>tässä alkaa tulla 3-4lk sanoja</Text>
          <Pressable
            style={styles.change}
              title='change'
              onPress={() => {
                resetLevel();
              }} >
            <Text style={styles.plain}>Vaihda vaikeustasoa</Text>
          </Pressable>
        </View>
        <WordsTable difficulty={difficulty} time={time} />
        <Footer done={done} right={right} />
      </View>
    );
  }

  //jos taso on 3, eli 5-6lk
  else if (difficulty === 3) {
    const time= 15
    return (
      <View style={styles.container}>
        <View style={styles.welcome}>
          <Text style={styles.textHeader}>tässä alkaa tulla 5-6lk sanoja</Text>
          <Pressable
            style={styles.change}
              title='change'
              onPress={() => {
                resetLevel();
              }} >
            <Text style={styles.plain}>Vaihda vaikeustasoa</Text>
          </Pressable>
        </View>
        <WordsTable difficulty={difficulty} time={time} />
        <Footer done={done} right={right}  />
      </View>
    );
  }
}


