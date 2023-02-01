import React, { useState, useEffect } from "react";
import { Pressable, View, Text, Image, TextInput, ScrollView } from "react-native";
import styles from "../styles/styles";
import Footer from "./Footer";
import DicesTable from "./DicesTable";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

let right = 0

export default function Dices() {
    const [firstname, setFirstname] = useState('');
    const [dice, setDice] = useState('') //näytettävä
    const [diceNum, setDiceNum] = useState('') //noppa numerona
    const [dice2, setDice2] = useState('') //näytettävä
    const [diceNum2, setDiceNum2] = useState('') //noppa numerona
    const [notStarted, setNotStart] = useState(true) //ei vielä aloitettu
    const [input, setInput] = useState('') //käyttäjän syöte
    const [wrong, setWrong] = useState('') //käyttäjän syötteen alert-kenttä
    const [refresh, setRefresh] = useState(''); // <- Add if your view not Rerender
    const [done, setDone] = useState(0) //tehtyjen määrä
    const [oneOrTwo, setOneOrTwo] = useState(0) //tehtyjen määrä

   useEffect(() => {
        getData();
    }, []);

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
        console.log('noppa1: ' + random)
        let randomName = 'dice-' + random
        setDice(<MaterialCommunityIcons
            name={randomName}
            key={random}
            size={250}
            color={'steelblue'}>
        </MaterialCommunityIcons>)
        setDiceNum(Number(random))

        let random2 = randomIntFromInterval(1, 6)
        console.log('noppa2: ' + random2)
        let randomName2 = 'dice-' + random2
        setDice2(<MaterialCommunityIcons
            name={randomName2}
            key={random2}
            size={250}
            color={'steelblue'}>
        </MaterialCommunityIcons>)
        setDiceNum(Number(random))
        setDiceNum2(Number(random2))
        setDone(done + 1)
    }

    function checkDice(text) {
        //jos vastaus on oikein
        console.log('text: ' + text)
        console.log('diceNum: ' + diceNum)
        //varmistetaan, että syöte on numero
        text = Number(text)

        if (text === diceNum) {
            right = right + 1
            setInput('')
            setDice('')
            setDiceNum('')
            setRefresh(Math.random()); //refressaa syötteen
            getDice()
        }
        //jos ei 
        else {
            setWrong('  Yritä uudelleen!')
        }
    }

    function checkDiceSum(text) {
        //jos vastaus on oikein
        //varmistetaan, että syöte on numero
        text = Number(text)

        let sum = diceNum + diceNum2
        console.log('sum: '+ sum)

        if (text === sum) {
            right = right + 1
            setInput('')
            setDice('')
            setDiceNum('')
            setRefresh(Math.random()); //refressaa syötteen
            getDice()
        }
        //jos ei 
        else {
            setWrong('  Yritä uudelleen!')
        }
    }

    //jos noppien määrää ei ole valittu
    if (oneOrTwo === 0) {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image source={require('./logo.jpg')} style={styles.logoHomepage} />
                    </View>
                    <View style={styles.center}>
                        <View style={styles.center}>
                            <Text style={styles.textHeader2}>Tunnista numerot</Text>
                            <Text style={styles.plainText}>Valitse montaako noppaa haluat käyttää:</Text>
                            <View style={styles.chooseLvl}>
                                <Pressable
                                    title='1'
                                    onPress={() => {
                                        let helper = 1
                                        setOneOrTwo(helper)
                                        startGame()
                                    }}>
                                    <Text style={styles.choice}>1 noppa - kirjoita silmäluku</Text>
                                </Pressable>
                                <View style={styles.line} />
                                <Pressable
                                    title='2'
                                    onPress={() => {
                                        let helper = 2
                                        setOneOrTwo(helper)
                                        startGame()
                                    }}>
                                    <Text style={styles.choice}>2 noppaa - laske silmäluvut yhteen </Text>
                                </Pressable>
                                <View style={styles.line} />
                            </View>
                        </View>
                    </View>
                    <Footer done={done} right={right} />
                </View>
            </ScrollView>
        );
    }
    if (oneOrTwo === 1) {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.LetterContainer}>
                        <View style={styles.center}>
                            <View style={styles.nextTo}>
                                <Text style={styles.dices}>{dice}</Text>
                                <TextInput
                                    placeholder=""
                                    value={input}
                                    maxLength={1}
                                    autoCapitalize='none'
                                    style={styles.letters}
                                    onChangeText={checkDice}
                                />
                                <Text style={styles.wrong}>{wrong}</Text>
                            </View>
                        </View>
                    </View>
                    <Footer done={done} right={right} />
                </View>
            </ScrollView>
        );
    }


    if (oneOrTwo === 2) {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.LetterContainer}>
                        <View style={styles.center}>
                            <View style={styles.nextTo}>
                                <Text style={styles.dices}>{dice}</Text>
                                <Text style={styles.dices}> + </Text>
                                <Text style={styles.dices}>{dice2}</Text>
                                <TextInput
                                    placeholder=""
                                    value={input}
                                    maxLength={1}
                                    autoCapitalize='none'
                                    style={styles.letters}
                                    onChangeText={checkDiceSum}
                                />
                                <Text style={styles.wrong}>{wrong}</Text>
                            </View>
                        </View>
                    </View>
                    <Footer done={done} right={right} />
                </View>
            </ScrollView>
        );
    }
}