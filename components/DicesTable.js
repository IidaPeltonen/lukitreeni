import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, Keyboard, Pressable, Dimensions, StyleSheet } from "react-native";
import styles from "../styles/styles";
import Footer from "./Footer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

let right = 0
let wrongAns = 0
const height = (Dimensions.get('window').height)
const ansBoxHeight = height / 100 * 25
const marginTop = ansBoxHeight / 100 * 20

export default function DicesTable() {
    const [firstname, setFirstname] = useState('');
    const [dice, setDice] = useState('') //näytettävä
    const [diceNum, setDiceNum] = useState('') //noppa numerona
    const [number, onChangeNumber] = useState('') //käyttäjän syöte
    const [wrong, setWrong] = useState('') //käyttäjän syötteen alert-kenttä
    const [wrongPic, setWrongPic] = useState('') //käyttäjän syötteen alert-kenttä, kuva
    const [refresh, setRefresh] = useState(''); // <- Add if your view not Rerender
    const [done, setDone] = useState(0) //tehtyjen määrä
    const [notStarted, setNotStart] = useState(true) //ei vielä aloitettu

    let alertPic =
        <MaterialCommunityIcons
            name='alert-decagram'
            size={35}
            color={'red'}>
        </MaterialCommunityIcons>

    let ePicSize = height / 100 * 10

    const equalPic =
        <MaterialCommunityIcons
            name='equal'
            size={ePicSize}
            color={'black'}>
        </MaterialCommunityIcons>

    useEffect(() => {
        getData();
        Keyboard.dismiss()
        checkDice()
        onChangeNumber('')
    }, [number]);

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

    function startGame() {
        setNotStart(false)
        getDice()
    }

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    function getDice() {
        let random = randomIntFromInterval(1, 6)
        let randomName = 'dice-' + random
        let size = height / 100 * 25
        setDice(<MaterialCommunityIcons
            name={randomName}
            key={random}
            size={size}
            color={'black'}>
        </MaterialCommunityIcons>)
        setDiceNum(Number(random))
    }

    function checkDice() {
        setDone(done + 1)

        if (number !== '') {
            console.log('syöte annettu')
            if (number === diceNum) {
                console.log('oikein')
                setWrong('')
                right = right + 1
                startGame()
            }
            //jos ei 
            else {
                console.log('väärin')
                setWrong('  Yritä uudelleen!')
                wrongAns = wrongAns + 1
                setWrongPic(alertPic)
            }
        }
        else {
            console.log('ei syötettä')
            startGame()
        }

        setRefresh(Math.random()); //refressaa syötteen
    }

    return (
        <View style={styles.frontContainer}>
            <View>
                <Text style={styles.textHeader}>Kirjoita nopan silmäluku</Text>
            </View>
            <View style={styles.DiceTable}>
                <View style={styles.nextTo}>
                    <Text>{dice}</Text>
                    <Text style={style.plus}>{equalPic}</Text>
                    <TextInput
                        placeholder=""
                        value={number}
                        maxLength={1}
                        style={style.input}
                        keyboardType='number-pad'
                        onChangeNumber={onChangeNumber}
                    />
                </View>
                <Text style={styles.wrongDice}>{wrongPic} {wrong}tässä</Text>
            </View>
            <Footer done={done} right={right} />
        </View>
    );
}

const style = StyleSheet.create({
    input: {
        height: ansBoxHeight,
        width: ansBoxHeight,
        borderWidth: 2,
        fontSize: 60,
        justifyContent: 'center',
        marginLeft: 40,
        backgroundColor: 'white',
        marginTop: marginTop
    },
    plus: {
        marginTop: marginTop + 20
    }
});