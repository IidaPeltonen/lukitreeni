import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { diff } from 'react-native-reanimated';
import styles from "../styles/styles";

//tarvitaan lista sanoja
const words1 = ['savu', 'sinä', 'kana', 'talo', 'aave', 'ovi', 'auto']
const words2 = ['kissa', 'koira', 'koulu', 'kaali', 'sukka', 'talvi', 'silta']
const words3 = ['apina', 'saavutus', 'kolina', 'hevonen', 'porkkana', 'peruna', 'kaappi', 'sitruuna']

export default function WordsTable({ difficulty, time }) {
    const [timer, setTimer] = useState(time) //kauanko sana näkyy, määräytyy vaikeustason mukaan
    const [words, setWords] = useState([])
    const [isLoading, setIsLoading] = useState(false); // jotta useEffect toimii
    const [showable, setShowable] = useState(false); // näytettävä sana


    //haetaan sopivan tason sanat
    function getSelectedLvlWords() {
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
        setWords(tempWords)
        showWords(tempWords)
    }

    //näytetään sanoja kunnes taulu on tyhjä

    function showWords(words) {
        //tarkistaa saatujen sanojen pituuden
        let length = (words.length - 1)

        //arpoo numeron väliltä 0-pituus, kunnes laskuri on 0
        for (let usedWords = 0; usedWords <= length; usedWords++) {
            let random = Math.floor(Math.random() * (words.length - 1))
            console.log('sana: ' + words[random])
            // tämän pitäisi kestää niin kauan kuin on aikaa
            setShowable(words[random])
            words.splice(random, 1)
            //jos sanay loppui, piiloitetaan vika ruudulta
            if (words.length === 0) {
                setShowable('')
            }
            console.log('words: ' + words)
        }
    }


    useEffect(() => {
        setIsLoading(true);
        getSelectedLvlWords()
    }, [])

    return (
        <View style={styles.WordsTable}>
            <Text style={styles.show}>{showable}</Text>
            <Text style={styles.Clock}>Aikaa jäljellä : {time}s </Text>
        </View>
    )
}