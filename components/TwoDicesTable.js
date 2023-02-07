import React, { useState, useEffect } from "react";
import { Pressable, View, Text, TextInput, Keyboard, Dimensions, StyleSheet } from "react-native";
import styles from "../styles/styles";
import Footer from "./Footer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

let right = 0
let wrongAns = 0
const height = (Dimensions.get('window').height)
const ansBoxHeight = height / 100 * 25
const marginTop = ansBoxHeight / 100 * 15
const plusPicSize = height / 100 * 10
const fontSize = ansBoxHeight / 2
const wrongFontSize = fontSize / 4

export default function TwoDicesTable() {
    const [firstname, setFirstname] = useState('');
    const [dice, setDice] = useState('') //näytettävä
    const [diceNum, setDiceNum] = useState('') //noppa numerona
    const [dice2, setDice2] = useState('') //näytettävä
    const [diceNum2, setDiceNum2] = useState('') //noppa numerona
    const [sum, setSum] = useState(0) //noppa yhteensä
    const [text, onChangeText] = useState('') //käyttäjän syöte
    const [wrong, setWrong] = useState('') //käyttäjän syötteen alert-kenttä
    const [wrongPic, setWrongPic] = useState('') //käyttäjän syötteen alert-kenttä, kuva
    const [refresh, setRefresh] = useState(''); // <- Add if your view not Rerender
    const [done, setDone] = useState(0) //tehtyjen määrä

    const alertPic =
        <MaterialCommunityIcons
            name='alert-decagram'
            size={wrongFontSize}
            color={'red'}>
        </MaterialCommunityIcons>

    const plusPic =
        <MaterialCommunityIcons
            name='plus'
            size={plusPicSize}
            color={'black'}>
        </MaterialCommunityIcons>

    const equalPic =
        <MaterialCommunityIcons
            name='equal'
            size={plusPicSize}
            color={'black'}>
        </MaterialCommunityIcons>

    const rightPic =
        <MaterialCommunityIcons
            name='flower-poppy'
            size={wrongFontSize}
            color={'red'}>
        </MaterialCommunityIcons>

    useEffect(() => {
        getData()
        {
            text.length === sum.toString().length &&
                Keyboard.dismiss()
        }
    }, [text]);

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
        setSum(0)
        setDone(done + 1)
        let random = randomIntFromInterval(1, 6)
        let randomName = 'dice-' + random
        setDice(
            <MaterialCommunityIcons
                name={randomName}
                key={random}
                size={ansBoxHeight}
                color={'black'}>
            </MaterialCommunityIcons>)
        setDiceNum(Number(random))

        let random2 = randomIntFromInterval(1, 6)
        let randomName2 = 'dice-' + random2
        setDice2(
            <MaterialCommunityIcons
                name={randomName2}
                key={random2}
                size={ansBoxHeight}
                color={'black'}>
            </MaterialCommunityIcons>)
        setDiceNum(Number(random))
        setDiceNum2(Number(random2))
        let tempSum1 = random + random2
        setSum(tempSum1)
    }

    function checkDiceSum() {
        setWrong('')
        setWrongPic('')
        let userText = Number(text)
        let tempSum = diceNum + diceNum2

        if (userText === tempSum) {
            setWrong(' Oikein meni!')
            setWrongPic(rightPic)
            right = right + 1
            onChangeText('')
            setDice('')
            setDiceNum('')
            setDice2('')
            setDiceNum2('')
            setRefresh(Math.random()); //refressaa syötteen
            getDice()
        }
        //jos ei 
        else {
            onChangeText('')
            wrongAns = wrongAns + 1
            setWrong('  Yritä uudelleen!')
            setWrongPic(alertPic)
        }
    }

    return (
        <View style={styles.frontContainer}>
            <View>
                <Text style={styles.textHeader}>Kirjoita noppien yhteenlaskettu silmäluku</Text>
            </View>
            <View style={styles.DiceTable}>
                {done === 0 &&
                    <View>
                        <Pressable
                            title='Aloita'
                            onPress={getDice}
                            style={styles.checkNumber}>
                            <Text style={styles.startText}>Heitä nopat!</Text>
                        </Pressable>
                    </View>
                }
                {done !== 0 &&
                    <View>
                        <View style={styles.nextToDices}>
                            <Text style={style.dice}>{dice}</Text>
                            <Text style={style.plus}>{plusPic}</Text>
                            <Text style={style.dice}>{dice2}</Text>
                            <Text style={style.plus}>{equalPic}</Text>
                            <TextInput
                                placeholder=""
                                value={text}
                                maxLength={2}
                                style={style.input}
                                keyboardType='number-pad'
                                onChangeText={(text) => { onChangeText(text) }}
                            />
                        </View>
                        <View style={styles.nextTo}>
                            <Pressable
                                title='Check'
                                onPress={checkDiceSum}
                                style={styles.checkNumber}>
                                <Text style={styles.startText}>Tarkista!</Text>
                            </Pressable>
                            <Text style={style.wrong}> {wrong} {wrongPic}</Text>
                        </View>
                    </View>
                }
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
        backgroundColor: 'white',
        textAlign: 'center',
        marginTop: marginTop
    },
    plus: {
        paddingTop: marginTop * 2
    },
    wrong: {
        fontSize: wrongFontSize,
        fontFamily: 'Roboto',
        color: 'red',
        justifyContent: 'center'
    },
});