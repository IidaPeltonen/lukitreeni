import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Keyboard, Pressable, Dimensions, StyleSheet } from "react-native";
import styles from "../styles/styles";
import Footer from "./Footer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { ScrollView } from "react-native-gesture-handler";

let right = 0
let wrongAns = 0
const height = (Dimensions.get('window').height)
const ansBoxHeight = height / 100 * 25
const marginTop = ansBoxHeight / 100 * 15
const plusPicSize = height / 100 * 10
const fontSize = ansBoxHeight / 2
const wrongFontSize = fontSize / 3

export default function DicesTable() {
    const [firstname, setFirstname] = useState('');
    const [dice, setDice] = useState('') //näytettävä
    const [diceNum, setDiceNum] = useState('') //noppa numerona
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
        getData();
        Keyboard.dismiss()
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
        onChangeText('')
        setDone(done + 1)
        let random = randomIntFromInterval(1, 6)
        let randomName = 'dice-' + random
        setDice(<MaterialCommunityIcons
            name={randomName}
            key={random}
            size={ansBoxHeight}
            color={'black'}>
        </MaterialCommunityIcons>)
        setDiceNum(Number(random))
    }

    function checkDice() {
        let textAsNum = Number(text)
        setWrong('')
        setWrongPic('')
        if (textAsNum === diceNum) {
            setWrong(' Oikein meni!')
            setWrongPic(rightPic)
            right = right + 1
            onChangeText('')
            setDice('')
            setDiceNum('')
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
        <ScrollView>
        <View style={styles.frontContainer}>
            <View>
                <Text style={style.textHeader}>Kirjoita nopan silmäluku</Text>
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
                            <Text>{dice}</Text>
                            <Text style={style.plus}>{equalPic}</Text>
                            <TextInput
                                placeholder=""
                                value={text}
                                maxLength={1}
                                style={style.input}
                                keyboardType='number-pad'
                                onChangeText={(text) => { onChangeText(text) }}
                            />
                        </View>
                        <View style={styles.nextTo}>
                            <Pressable
                                title='Uudet'
                                onPress={checkDice}
                                style={style.checkDice}>
                                <Text style={styles.startText}>Tarkista!</Text>
                            </Pressable>
                            <Text style={style.wrong}>{wrong} {wrongPic}</Text>
                        </View>
                    </View>
                }
            </View>
        </View>
        </ScrollView>
    );
}

const style = StyleSheet.create({
    input: {
        height: ansBoxHeight,
        width: ansBoxHeight,
        borderWidth: 2,
        fontSize: fontSize,
        backgroundColor: 'white',
        textAlign: 'center',
        marginLeft: 40,
        marginTop: marginTop
    },
    plus: {
        marginTop: marginTop * 2
    },
    wrong: {
        fontSize: wrongFontSize,
        fontFamily: 'Roboto',
        color: 'red',
        marginTop: wrongFontSize * 1.5
    },
    checkDice: {
        width: ansBoxHeight * 2,
        backgroundColor: '#023020',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 20,
        marginRight: 10,
        alignSelf: 'center',
        marginTop: wrongFontSize
    },
    textHeader: {
        fontSize: 20,
        fontFamily: 'Roboto',
        alignSelf: 'center',
        fontWeight: 'bold',
        margin: 0,
        padding: 0
    },
});