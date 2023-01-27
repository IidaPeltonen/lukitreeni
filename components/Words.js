import React, { useState, useEffect } from "react";
import { Pressable, View, Text, Image, ScrollView, Dimensions } from "react-native";
import styles from "../styles/styles";
import Footer from "./Footer";
import WordsTable from "./WordsTable";
import AsyncStorage from '@react-native-async-storage/async-storage';

//tarvitaan lista sanoja
const words1 = ['sa-vu', 'si-nä', 'ka-na', 'ta-lo', 'aa-ve', 'o-vi', 'au-to']
const words2 = ['savu', 'sinä', 'kana', 'talo', 'aave', 'ovi', 'auto']
const words3 = ['kis-sa', 'koi-ra', 'kou-lu', 'kaa-li', 'suk-ka', 'tal-vi', 'sil-ta']
const words4 = ['kissa', 'koira', 'koulu', 'kaali', 'sukka', 'talvi', 'silta']
const words5 = ['apina', 'saavutus', 'kolina', 'hevonen', 'porkkana', 'peruna', 'kaappi', 'sitruuna']
const words6 = ['huikaus', 'tankku', 'nepos', 'silkaa', 'marous', 'törä', 'enkke', 'toida']

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
    } catch (e) {
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
    if (difficulty === 4) {
      for (let i = 0; i < words4.length; i++) {
        tempWords.push(words4[i])
      }
    }
    if (difficulty === 5) {
      for (let i = 0; i < words5.length; i++) {
        tempWords.push(words5[i])
      }
    }
    if (difficulty === 6) {
      for (let i = 0; i < words6.length; i++) {
        tempWords.push(words6[i])
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
      setDone(done+1)
    }
    setWords(tempRandArr)
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
          <Text style={styles.plainText}>Seuraavalla sivulla lue sanat ääneen</Text>
        </View>
        <View style={styles.chooseLvl}>
          <Pressable
            title='1'
            onPress={() => {
              let helper = 1
              setDifficulty(helper)
              getSelectedLvlWords(helper);
            }}>
            <Text style={styles.choice}>1. Lyhyet, tavutetut sanat</Text>
          </Pressable>
          <View style={styles.line} />
          <Pressable
            title='2'
            onPress={() => {
              let helper = 2
              setDifficulty(helper)
              getSelectedLvlWords(helper);
            }}>
            <Text style={styles.choice}>2. Lyhyet sanat</Text>
          </Pressable>
          <View style={styles.line} />
          <Pressable
            title='3'
            onPress={() => {
              let helper = 3
              setDifficulty(helper)
              getSelectedLvlWords(helper);
            }}>
            <Text style={styles.choice}>3. Pidemmät, tavutetut sanat</Text>
          </Pressable>
          <View style={styles.line} />
          <Pressable
            title='4'
            onPress={() => {
              let helper = 4
              setDifficulty(helper)
              getSelectedLvlWords(helper);
            }}>
            <Text style={styles.choice}>4. Pidemmät sanat</Text>
          </Pressable>
          <View style={styles.line} />
          <Pressable
            title='5'
            onPress={() => {
              let helper = 5
              setDifficulty(helper)
              getSelectedLvlWords(helper);
            }}>
            <Text style={styles.choice}>5. Pitkät sanat</Text>
          </Pressable>
          <View style={styles.line} />
          <Pressable
            title='6'
            onPress={() => {
              let helper = 6
              setDifficulty(helper)
              getSelectedLvlWords(helper);
            }}>
            <Text style={styles.choice}>6. Epäsanat</Text>
          </Pressable>
          <View style={styles.line} />
        </View>
        <Footer done={done} />
      </View>
    );
  }

  //jos taso on 1
  else if (difficulty === 1) {
    const time = 30
    return (
      <View style={styles.container} >
        <View style={styles.right}>
          <Pressable
            style={styles.change}
            title='change'
            onPress={() => {
              resetLevel();
            }} >
            <Text style={styles.changeText}>Vaihda vaikeustasoa</Text>
          </Pressable>
        </View>
        <WordsTable words={words} time={time} />
        <Footer firstname={firstname} done={done} />
      </View>
    );
  }

  //jos taso on 2
  else if (difficulty === 2) {
    const time = 20
    return (
      <View style={styles.container} >
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
        <Footer firstname={firstname} done={done}  />
      </View>
    );
  }

  //jos taso on 3
  else if (difficulty === 3) {
    const time = 15
    return (
      <View style={styles.container}>
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
        <Footer firstname={firstname} done={done} />
      </View>
    );
  }
  //jos taso on 4
  else if (difficulty === 4) {
    const time = 15
    return (
      <View style={styles.container}>
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
        <Footer firstname={firstname} done={done}  />
      </View>
    );
  }
  //jos taso on 5
  else if (difficulty === 5) {
    const time = 15
    return (
      <View style={styles.container}>
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
        <Footer firstname={firstname} done={done}  />
      </View>
    );
  }
  //jos taso on 6
  else if (difficulty === 6) {
    const time = 15
    return (
      <View style={styles.container}>
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
        <Footer firstname={firstname} done={done}  />
      </View>
    );
  }
}


