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
    const [input, setInput] = useState('') //käyttäjän syöte
    const [wrong, setWrong] = useState('') //käyttäjän syötteen alert-kenttä
    const [refresh, setRefresh] = useState(''); // <- Add if your view not Rerender
    const [done, setDone] = useState(0) //tehtyjen määrä
    const [oneOrTwo, setOneOrTwo] = useState(0) //tehtyjen määrä

    const dicePic = 
    <MaterialCommunityIcons
        name='dice-1'
        size={50}
        color={'black'}>
    </MaterialCommunityIcons>

    const plusPic =
    <MaterialCommunityIcons
        name='plus'
        size={80}
        color={'black'}>
    </MaterialCommunityIcons>

    const equalPic =
    <MaterialCommunityIcons
        name='equal'
        size={60}
        color={'black'}>
    </MaterialCommunityIcons>

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
        getDice()
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

        let random2 = randomIntFromInterval(1, 6)
        let randomName2 = 'dice-' + random2
        setDice2(<MaterialCommunityIcons
            name={randomName2}
            key={random2}
            size={200}
            color={'black'}>
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
            setInput('')
        }
    }

    function checkDiceSum() {
        setWrong('')
        //jos vastaus on oikein
        //varmistetaan, että syöte on numero
        let userInput = Number(input)
        let sum = diceNum + diceNum2
        console.log('sum: '+ sum)
        console.log('input: ' + input)

        if (userInput === sum) {
            setWrong(' Oikein meni!')
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
                            <Text></Text>
                            <View style={styles.chooseLvl}>
                                <Pressable
                                    title='1'
                                    onPress={() => {
                                        let helper = 1
                                        setOneOrTwo(helper)
                                        startGame()
                                    }}>
                                    <Text style={styles.choice}> {dicePic} </Text>
                                </Pressable>
                                <Text></Text>
                                <Pressable
                                    title='2'
                                    onPress={() => {
                                        let helper = 2
                                        setOneOrTwo(helper)
                                        startGame()
                                    }}>
                                    <Text style={styles.choice}> {dicePic} {dicePic}  </Text>
                                </Pressable>
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
                    <View style={styles.center}>
                        <Text style={styles.textHeader}>Kirjoita nopan silmäluku</Text>
                    </View>
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
                    <View style={styles.center}>
                        <Text style={styles.textHeader}>Kirjoita noppien yhteenlaskettu silmäluku</Text>
                    </View>
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
                                        value={input}
                                        maxLength={2}
                                        autoCapitalize='none'
                                        style={styles.dicesAns}
                                        onChangeText={Text => setInput(Text)}
                                    />
                                    <Text style={styles.wrong}>{wrong}</Text>
                                </View>
                                <Text></Text>
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
                    <Footer done={done} right={right} />
                </View>
            </ScrollView>
        );
    }
}