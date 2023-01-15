import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import styles from "../styles/styles";

export default function Timer({ word, time }) {
    const [timer, setTimer] = useState(0) //kauanko sana näkyy, määräytyy vaikeustason mukaan
   
    const timeCounter = Number(time + '0000')
    useEffect(() => {
        console.log('time: ' + timeCounter)
        if(timer){
          setInterval(() => {
            setTimer(timer - 1)
          }, timeCounter)
        }
      }, [timer]);

      return (
        <View>
            <Text style={styles.show}>{word}</Text>
        </View>
      )

  /*   return (
        <View style={styles.WordsTable}>
            <Text style={styles.show}>{showable}</Text>
            <Text style={styles.Clock}>Aikaa jäljellä : {time}s </Text>
        </View>
    ) */
}