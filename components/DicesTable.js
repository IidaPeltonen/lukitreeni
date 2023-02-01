/* import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import styles from "../styles/styles";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

export default function Dicestable({ dices }) {
    const [diceIndex, setDiceIndex] = useState(0);
    const [counter, setCounter] = useState(time) //kauanko sana näkyy, määräytyy vaikeustason mukaan
    const [info, setInfo] = useState('') //info sanoje loppumisesta

    return (
          <View style={styles.container}>
            <View style={styles.LetterContainer}>
              <View style={styles.center}>
                <View style={styles.nextTo}>
                  <Text style={styles.letters}>{big}</Text>
                  <TextInput
                    placeholder=""
                    value={input}
                    maxLength={1}
                    autoCapitalize='none'
                    style={styles.letters}
                    onChangeText={checkLetter} 
                  />
                  <Text style={styles.wrongPic}>{wrongPic}</Text>
                  <Text style={styles.wrong}>{wrong}</Text>
                </View>
                <Text style={styles.left}>Arvauksia jäljellä tällä kerralla : {times - done}</Text>
              </View>
            <View style={styles.center}>
  </View>
            </View>
            <Footer done={done} right={right} />
          </View>
} */