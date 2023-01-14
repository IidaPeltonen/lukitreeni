import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import styles from "../styles/styles";

//tarvitaan lista sanoja
const words1 = ['savu', 'sinä', 'kana', 'talo', 'aave', 'ovi', 'auto']
const words2 = ['kissa', 'koira', 'koulu', 'kaali', 'sukka', 'talvi', 'silta']
const words3 = ['apina', 'saavutus', 'kolina', 'hevonen', 'porkkana', 'peruna', 'kaappi', 'sitruuna']

export default function WordsTable({ difficulty, time }) {

    function getWords() {
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
        const [words, setWords] = useState(tempWords)
        console.log(words)
    }

    getWords()

   



    return (
        <View style={styles.WordsTable}>
            <Text></Text>
            <Text>Vaikeus on {difficulty} </Text>
            <Text style={styles.Clock}>Aikaa jäljellä : {time}s </Text>
        </View>
    )
}