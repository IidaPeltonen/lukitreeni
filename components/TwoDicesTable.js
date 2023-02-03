import React, { useState, useEffect } from "react";
import { Pressable, View, Text, TextInput, Keyboard } from "react-native";
import styles from "../styles/styles";
import Footer from "./Footer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

let right = 0
let wrongAns = 0

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

    const plusPic =
        <MaterialCommunityIcons
            name='plus'
            size={60}
            color={'black'}>
        </MaterialCommunityIcons>

    const equalPic =
        <MaterialCommunityIcons
            name='equal'
            size={50}
            color={'black'}>
        </MaterialCommunityIcons>

    let alertPic =
        <MaterialCommunityIcons
            name='alert-decagram'
            size={35}
            color={'red'}>
        </MaterialCommunityIcons>

    useEffect(() => {
        getData()
        {text.length === sum.toString().length &&
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
        setDice(<MaterialCommunityIcons
            name={randomName}
            key={random}
            size={160}
            color={'black'}>
        </MaterialCommunityIcons>)
        setDiceNum(Number(random))

        let random2 = randomIntFromInterval(1, 6)
        let randomName2 = 'dice-' + random2
        setDice2(<MaterialCommunityIcons
            name={randomName2}
            key={random2}
            size={160}
            color={'black'}>
        </MaterialCommunityIcons>)
        setDiceNum(Number(random))
        setDiceNum2(Number(random2))
        let tempSum1 = random + random2
        setSum(tempSum1)
    }

    function checkDiceSum() {
        setWrong('')
        //jos vastaus on oikein
        //varmistetaan, että syöte on numero
        let userText = Number(text)
        let tempSum = diceNum + diceNum2

        if (userText === tempSum) {
            setWrong('')
            setWrongPic('')
            setWrong(' Oikein meni!')
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
            setWrong('')
            setWrongPic('')
            onChangeText('')
            wrongAns = wrongAns + 1
            setWrong('  Yritä uudelleen!')
            setWrongPic(alertPic)
        }
    }

    return (
<>
            <View style={styles.container}>
                <View style={styles.center}>
                    <Text style={styles.textHeader}>Kirjoita noppien yhteenlaskettu silmäluku</Text>
                </View>
                {done === 0 &&
                <View style={styles.center}>
                    <Pressable
                        title='Aloita'
                        onPress={getDice}
                        style={styles.checkNumber}>
                        <Text style={styles.startText}>Heitä nopat!</Text>
                    </Pressable>
                </View>
                }
                {done !== 0 &&
                    <View style={styles.LetterContainer}>
                        <View style={styles.center}>
                            <View style={styles.nextTo}>
                                <Text style={styles.dices}>{dice}</Text>
                                <Text style={styles.plus}>{plusPic}</Text>
                                <Text style={styles.dices}>{dice2}</Text>
                            </View>
                            <View style={styles.center}>
                                <View style={styles.nextTo}>
                                    <Text style={styles.equal}>{equalPic}</Text>
                                    <TextInput
                                        placeholder=""
                                        value={text}
                                        maxLength={2}
                                        style={styles.dicesAns}
                                        keyboardType='number-pad'
                                        onChangeText={(text) => { onChangeText(text) }}
                                    />
                                    <Text style={styles.wrongPic}>{wrongPic}</Text>
                                    <Text style={styles.wrong}>{wrong}</Text>
                                </View>
                                <View style={styles.center}>
                                    <Pressable
                                        title='Uudet'
                                        onPress={checkDiceSum}
                                        style={styles.checkNumber}>
                                        <Text style={styles.startText}>Tarkista!</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>
                }

            </View>
            <Footer done={done} right={right} />
            </>
        );
}