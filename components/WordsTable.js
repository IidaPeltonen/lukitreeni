import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import Timer from './Timer';
import styles from "../styles/styles";

//tarvitaan lista sanoja
const words1 = ['savu', 'sinä', 'kana', 'talo', 'aave', 'ovi', 'auto']
const words2 = ['kissa', 'koira', 'koulu', 'kaali', 'sukka', 'talvi', 'silta']
const words3 = ['apina', 'saavutus', 'kolina', 'hevonen', 'porkkana', 'peruna', 'kaappi', 'sitruuna']

export default function WordsTable({ difficulty, time }) {

    let fixedTime = (Number(time) * 1000)
    const [timer, setTimer] = useState(fixedTime) //kauanko sana näkyy, määräytyy vaikeustason mukaan
    const [words, setWords] = useState([])
    const [showable, setShowable] = useState(false); // näytettävä sana

    console.log('fixedTime: ' + (fixedTime))

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
        printWords(tempRandArr)
    }

    function printWords(wordsForPrinting) {
        //meillä on taulukollinen sanoja
        //tähän useEffect?
        //theniin aikakatkaisu?
        //for-looppi?
        for (let i = 0; i < wordsForPrinting.length; i++) {
        console.log('print: ' + i)
            setShowable(wordsForPrinting[i])
            setTimeout(() => {
                setShowable(null)
            }, fixedTime)
        }
    }

    return (
        <ScrollView>
        <View style={styles.WordsTable}>
            <Text style={styles.show}>{showable}</Text>
            <Text style={styles.Clock}>Aikaa jäljellä : {time}s </Text>
        </View>
        </ScrollView>
    )
}