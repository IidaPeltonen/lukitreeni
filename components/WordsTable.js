import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Dimensions } from 'react-native';
import Timer from './Timer';
import styles from "../styles/styles";

//tarvitaan lista sanoja
const words1 = ['savu', 'sinä', 'kana', 'talo', 'aave', 'ovi', 'auto']
const words2 = ['kissa', 'koira', 'koulu', 'kaali', 'sukka', 'talvi', 'silta']
const words3 = ['apina', 'saavutus', 'kolina', 'hevonen', 'porkkana', 'peruna', 'kaappi', 'sitruuna']

export default function WordsTable({ difficulty, time }) {

    const [counter, setCounter] = useState(time) //kauanko sana näkyy, määräytyy vaikeustason mukaan
    const [words, setWords] = useState([])
    const [wordIndex, setWordIndex] = useState(1);

    useEffect(() => {
        getSelectedLvlWords()
    }, [])

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
        //kutsutaan randomizea, jotta saadaan sanat sekaisin
        randomizeWords(tempWords)
    }

    //arvotaan valitut sanat uuteen taulukkoon random-järjestykseen
    function randomizeWords(tempWords) {
        //tilapäinen array sanoille
        let tempRandArr = []
        //tarkistaa saatujen sanojen pituuden
        let length = (tempWords.length - 1)
        //arpoo numeron väliltä 0-pituus, kunnes laskuri on 0
        for (let usedWords = 0; usedWords <= length; usedWords++) {
            let random = Math.floor(Math.random() * (tempWords.length - 1))
            let randomWord = tempWords[random]
            tempRandArr.push(randomWord)
            tempWords.splice(random, 1)
            console.log('tempRandArr: ' + tempRandArr)
        }
        //kutsutaan tulostavaa funktiota
        setWords(tempRandArr)
        printWords(tempRandArr)
    }

    function printWords() {
        console.log('tulostetaan')
        console.log('words[1] : ' + words[1])
        console.log('words pituus: ' + words.length)
        console.log('counter: ' + counter)

/*         useEffect(() => {
            const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
            console.log('timer: ' + timer)
            console.log('counter: ' + counter)
            if (counter === 0 && wordIndex < words.length) {
                setCounter(time);
                setWordIndex(wordIndex + 1);
            }
            return () => clearInterval(timer);
        }, [counter]); */

    }

    return (
        <ScrollView>
            <View style={styles.WordsTable} maxHeight={Dimensions.get("window").height + 300}>
                <Text style={styles.show}>Word {wordIndex}: {words[wordIndex]}</Text>
                <Text style={styles.Clock}>Aikaa jäljellä : {counter}s </Text>
            </View>
        </ScrollView>
    )
}