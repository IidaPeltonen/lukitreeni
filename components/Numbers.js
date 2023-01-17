import React, { useState, useEffect } from "react";
import { Pressable, View, Text, Image, ScrollView } from "react-native";
import styles from "../styles/styles";
import Footer from "./Footer";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Numbers() {
  const [firstname, setFirstname] = useState('');
  const [done, setDone] = useState(0) //tehtyjen määrä
  const [right, setRight] = useState(0) //oikeiden määrä
  const [difficulty, setDifficulty] = useState(2) //taso alkaa aina kahdesta, max on 6
  const [notStarted, setNotStart] = useState(true) //taso alkaa aina kahdesta, max on 6
  

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

  function startGame() {
    setNotStart(false)
    console.log('Peli aloitettu')
  }

  //jos peli on juuri aloitettu
  if (notStarted == true) {
    return (
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('./logo.jpg')} style={styles.logo} />
        </View>
        <View style={styles.welcome}>
          <View style={styles.center}>
            <Text style={styles.textHeader}>Testaa työmuistiasi</Text>
            <Text style={styles.plain}>Kun painat 'Aloita', ruudulle ilmestyy numerosarja.</Text>
            <Text style={styles.plain}>Ajan loppuessa kirjoita se annettuun kenttään.</Text>
            <Text style={styles.plain}>Jos saat kaksi peräkkäin oikein, taso nousee.</Text>
            <Text style={styles.plain}>Jos saat kaksi peräkkäin väärin, taso laskee.</Text>
            <Text style={styles.plain}>Ylin taso on taso numero 6.</Text>

            <View style={styles.center}>
              <Pressable
                title='Aloita!'
                onPress={startGame}
                style={styles.start}>
                <Text style={styles.startText}>Aloita!</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      </ScrollView>
    );
  }

  //jos aloita on painettu
  else {
    const time = 50
    return (
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.welcome}>
          <Text style={styles.textHeader}>Numeroita tähän</Text>
          <Text style={styles.plain}>24 / tää katoaa kun aika loppuu</Text>
          <Text style={styles.plain}>24 / tää ilmestyy kun aika loppuu</Text>
          <Text style={styles.plain}>Aikaa jäljellä : 'times' </Text>
        </View>
        <Footer firstname={firstname} done={done} right={right} />
      </View>
      </ScrollView>
    );
  }

}