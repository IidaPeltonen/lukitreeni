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
const ePicSize = height / 100 * 10

export default function DicesTable() {
    const [firstname, setFirstname] = useState('');
    const [dice, setDice] = useState('') //näytettävä
    const [diceNum, setDiceNum] = useState('') //noppa numerona
    const [text, onChangeText] = useState('') //käyttäjän syöte
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

    const equalPic =
        <MaterialCommunityIcons
            name='equal'
            size={ePicSize}
            color={'black'}>
        </MaterialCommunityIcons>

let rightPic =
<MaterialCommunityIcons
  name='flower-poppy'
  size={35}
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
        console.log('check + text: ' + text)
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
        <View style={styles.frontContainer}>
            <View>
                <Text style={styles.textHeader}>Kirjoita nopan silmäluku</Text>
            </View>
            <View style={styles.DiceTable}>
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
                    <>
                        <View style={styles.nextTo}>
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
                            <Text style={styles.wrongDice}>{wrong} {wrongPic}</Text>
                        </View>
                        <Pressable
                            title='Uudet'
                            onPress={checkDice}
                            style={styles.checkNumber}>
                            <Text style={styles.startText}>Tarkista!</Text>
                        </Pressable>
                    </>}
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