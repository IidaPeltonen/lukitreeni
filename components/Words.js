import React, { useState } from "react";
import { Button, View, Text } from "react-native";
import styles from "../styles/styles";
import Footer from "./Footer";

//tarvitaan lista sanoja
const words = ['kissa', 'koira', 'kana', 'hevonen', 'porkkana', 'peruna', 'äiti']

export default function Words() {
  cost [user, setUser] = useState('') //kirjautuneen nimi
  cost [done, setDone] = useState(0) //tehtyjen määrä
  cost [right, setRight] = useState(0) //oikeiden määrä

  //ensin valitaan taso, ts kuinka vaikeita sanoja
  const [difficulty, setDifficulty] = useState('')
  //valitun tason mukaan näytetään eri sanoja
  return (
    <View style={styles.container}>
      <Text>Tähän tulee ilmestyviä sanoja</Text>

    <Footer />
    </View>
  );
}