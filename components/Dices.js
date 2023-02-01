import React, { useState, useEffect } from "react";
import { Pressable, View, Text, Image, TextInput, ScrollView } from "react-native";
import styles from "../styles/styles";
import Footer from "./Footer";
import DicesTable from "./DicesTable";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

let right = 0
const times = 15 // joka kerralle 15 arvausta

export default function Dices() {
    const [firstname, setFirstname] = useState('');
    const [dice, setDice] = useState('') //näytettävä
    const [diceNum, setDiceNum] = useState('') //noppa numerona
    const [notStarted, setNotStart] = useState(true) //ei vielä aloitettu
    const [input, setInput] = useState('') //käyttäjän syöte
    const [wrong, setWrong] = useState('') //käyttäjän syötteen alert-kenttä
    const [refresh, setRefresh] = useState(''); // <- Add if your view not Rerender
    const [done, setDone] = useState(0) //tehtyjen määrä

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
        console.log('random: ' + random)
        let randomName = 'dice-' + random
        setDice(<MaterialCommunityIcons
            name={randomName}
            key={random}
            size={250}
            color={'steelblue'}>
        </MaterialCommunityIcons>)
        setDiceNum(Number(random))
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

    //jos peli on juuri aloitettu
    if (notStarted == true) {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image source={require('./logo.jpg')} style={styles.logoHomepage} />
                    </View>
                    <View style={styles.center}>
                        <View style={styles.center}>
                            <Text style={styles.textHeader2}>Tunnista numerot</Text>
                            <Text style={styles.plainText}>Kun painat 'Aloita', ruudulle alkaa ilmestyä noppia.</Text>
                            <Text style={styles.plainText}>Kirjoita näkemäsi silmäluku viereiseen kenttään.</Text>
                            <View style={styles.center}>
                                <Pressable
                                    title='Aloita!'
                                    onPress={startGame}
                                    style={styles.start}>
                                    <Text style={styles.startText}>Aloita!</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    <Footer done={done} right={right} />
                </View>
            </ScrollView>
        );
    }

    //jos aloita on painettu
    //mutta yrityksiä on 15
    else if (done === 15) {
        return (
            // <ScrollView>
            <View style={styles.container}>
                <View style={styles.LetterContainer}>
                    <View style={styles.header}>
                        <Image source={require('./logo.jpg')} style={styles.logo} />
                    </View>
                    <View style={styles.center}>
                        <View style={styles.center}>
                            <Text style={styles.textHeader2}>Peli päättyi!</Text>
                            <Text style={styles.plainText}> </Text>
                            <Text style={styles.plainText}> </Text>
                            <Text style={styles.plainText}>Sait {right} oikein!</Text>
                        </View>
                    </View>
                    <Footer done={done} right={right} />
                </View>
            </View>
            // </ScrollView>
        );
    }
    else {
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
                            <Text style={styles.left}>Arvauksia jäljellä tällä kerralla : {times - done}</Text>
                        </View>
                        <View style={styles.center}>
                        </View>
                    </View>
                    <Footer done={done} right={right} />
                </View>
            </ScrollView>
        );
    }


}