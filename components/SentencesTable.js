import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import Timer from './Timer';
import styles from "../styles/styles";

//tarvitaan lista sanoja
const sen1 = ['Ovi on auki.', 'Talo on iso.', 'Kissa on pieni.', 'Sinä olet kiva!']
const sen2 = ['Kissan nimi on Mauri.', 'Koulun ovi oli lukossa.', 'Kaali maistuu hyvältä.']
const sen3 = ['Apina söi puussa banaania.', 'Se oli hieno saavutus!', 'Kolina kuului kellarista.', 
    'Hevonen syö mielellään porkkanaa.']

export default function SentencesTable({ difficulty, time }) {

    let fixedTime = (Number(time) * 1000)
    const [timer, setTimer] = useState(fixedTime) //kauanko sana näkyy, määräytyy vaikeustason mukaan
    const [sentences, setSentences] = useState([])
    const [isLoading, setIsLoading] = useState(false); // jotta useEffect toimii
    const [showable, setShowable] = useState(false); // näytettävä sana

    console.log('fixedTime: ' + (fixedTime+1))

    //haetaan sopivan tason sanat
    function getSelectedLvlSentences() {
        const tempSentences = []
        if (difficulty === 1) {
            for (let i = 0; i < sen1.length; i++) {
                tempSentences.push(sen1[i])
            }
        }
        if (difficulty === 2) {
            for (let i = 0; i < sen2.length; i++) {
                tempSentences.push(sen2[i])
            }
        }
        if (difficulty === 3) {
            for (let i = 0; i < sen3.length; i++) {
                tempSentences.push(sen3[i])
            }
        }
        setSentences(tempSentences)
        showSentences(tempSentences)
    }

    //näytetään sanoja kunnes taulu on tyhjä

    function showSentences(sentences) {
        //tarkistaa saatujen sanojen pituuden
        let length = (sentences.length - 1)

/*         function showOne(showable) {
            showOne(showable)
            // tämän pitäisi kestää niin kauan kuin on aikaa
            setShowable(showable)
            setTimeout(() => {
                setShowable('')
            }, fixedTime)
        } */

        //arpoo numeron väliltä 0-pituus, kunnes laskuri on 0
        for (let usedSentences = 0; usedSentences <= length; usedSentences++) {
            let random = Math.floor(Math.random() * (sentences.length - 1))
            let randomWord = sentences[random]       
            //showOne(randomWord)
            setShowable(randomWord)
            sentences.splice(random, 1)
            console.log('sentences: ' + sentences)
        }
    }


    useEffect(() => {
        setIsLoading(true);
        getSelectedLvlSentences()
    }, [])

    return (
        <ScrollView>
        <View style={styles.SentencesTable}>
            {/* <Timer word={showable} time={time}/> */}
            <Text style={styles.show}>{showable}</Text>
            <Text style={styles.Clock}>Aikaa jäljellä : {time}s </Text>
        </View>
        </ScrollView>
    )
}