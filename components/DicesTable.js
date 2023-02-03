import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, Keyboard } from "react-native";
import styles from "../styles/styles";
import Footer from "./Footer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

let right = 0
let wrongAns = 0

export default function DicesTable() {
    const [firstname, setFirstname] = useState('');
    const [dice, setDice] = useState('') //näytettävä
    const [diceNum, setDiceNum] = useState('') //noppa numerona
    const [number, onChangeNumber] = useState('') //käyttäjän syöte
    const [wrong, setWrong] = useState('') //käyttäjän syötteen alert-kenttä
    const [wrongPic, setWrongPic] = useState('') //käyttäjän syötteen alert-kenttä, kuva
    const [refresh, setRefresh] = useState(''); // <- Add if your view not Rerender
    const [done, setDone] = useState(0) //tehtyjen määrä


    console.log('number yläällä: ' +  number)

    let alertPic =
        <MaterialCommunityIcons
            name='alert-decagram'
            size={35}
            color={'red'}>
        </MaterialCommunityIcons>

    useEffect(() => {
        getData();
        Keyboard.dismiss()
        checkDice()
        onChangeNumber('')
        setWrong('')
        setWrongPic('')
        startGame()
    }, [number]);

    function startGame() {
        getDice()
      }

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

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    function getDice() {
        let random = randomIntFromInterval(1, 6)
        let randomName = 'dice-' + random
        setDice(<MaterialCommunityIcons
            name={randomName}
            key={random}
            size={200}
            color={'black'}>
        </MaterialCommunityIcons>)
        setDiceNum(Number(random))
    }

    function checkDice() {
        setDone(done + 1)
        console.log('diceNum: ' + diceNum)
        console.log('Number: ' + number)

        //varmistetaan, että syöte on numero
        let tempText = Number(number)

        if (tempText === diceNum) {
            console.log('oikein')
            setWrong('')
            right = right + 1
            setDice('')
            setDiceNum('')
            setRefresh(Math.random()); //refressaa syötteen
            getDice()
        }
        //jos ei 
        else {
            console.log('väärin')
            setWrong('  Yritä uudelleen!')
            wrongAns = wrongAns + 1
            setWrongPic(alertPic)
        }
    }



    return (
            <View style={styles.container}>
                <View style={styles.center}>
                    <Text style={styles.textHeader}>Kirjoita nopan silmäluku</Text>
                </View>
                <View style={styles.LetterContainer}>
                    <View style={styles.center}>
                        <View style={styles.nextTo}>
                            <Text style={styles.dices}>{dice}</Text>
                            <TextInput
                                placeholder=""
                                value={number}
                                maxLength={1}
                                style={styles.letters}
                                keyboardType='number-pad'
                                onChangeNumber={onChangeNumber}
                            />
                            <Text style={styles.wrong}>näihin ei tuu mitään</Text>
                            <Text style={styles.wrongPic}>{wrongPic}</Text>
                            <Text style={styles.wrong}>{wrong}</Text>
                        </View>
                    </View>
                </View>
                <Footer done={done} right={right} />
            </View>
    );

}