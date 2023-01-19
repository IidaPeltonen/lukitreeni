import React, { useState, useEffect } from "react";
import { Pressable, View, Text, Image, ScrollView } from "react-native";
import styles from "../styles/styles";
import Footer from "./Footer";
import WordsTable from "./WordsTable";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Words() {
  const [firstname, setFirstname] = useState('');
  const [done, setDone] = useState(0) //tehtyjen määrä
  const [right, setRight] = useState(0) //oikeiden määrä
  const [difficulty, setDifficulty] = useState(0) //ensin valitaan taso, ts kuinka vaikeita sanoja

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

  //funktio tason muuttujan nollaukseen
  function resetLevel() {
    setDifficulty(0)
  }

  //jos tasoa ei ole valittu
  if (difficulty === 0) {
    return (
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('./logo.jpg')} style={styles.logoHomepage} />
        </View>
        <View style={styles.welcome}>
          <Text style={styles.textHeader}>Lue sanoja</Text>
          <Text style={styles.textHeader2}>Valitse vaikeustaso</Text>
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
        <Footer firstname={firstname} done={done} right={right} />
      </View>
      </ScrollView>
    );
  }

  //jos taso on 1, eli 1-2lk
  else if (difficulty === 1) {
    const time= 30
    return (
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.welcome}>
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
        <WordsTable difficulty={difficulty} time={time} />
        <Footer firstname={firstname} done={done} right={right} />
      </View>
      </ScrollView>
    );
  }

  //jos taso on 2, eli 3-4lk
  else if (difficulty === 2) {
    const time= 20
    return (
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.welcome}>
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
        <WordsTable difficulty={difficulty} time={time} />
        <Footer firstname={firstname} done={done} right={right} />
      </View>
      </ScrollView>
    );
  }

  //jos taso on 3, eli 5-6lk
  else if (difficulty === 3) {
    const time= 15
    return (
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.welcome}>
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
        <WordsTable difficulty={difficulty} time={time} />
        <Footer firstname={firstname} done={done} right={right} />
      </View>
      </ScrollView>
    );
  }
}


