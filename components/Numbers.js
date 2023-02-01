import React, { useState, useEffect } from "react";
import { Pressable, View, Text, Image, } from "react-native";
import styles from "../styles/styles";
import Footer from "./Footer";
import NumbersTable from "./NumbersTable";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

let right = 0
let done = 0

//tarvitaan lista numeroita
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
    '13', '14', '15', '16', '17', '18', '19', '20']

export default function Numbers() {
    const [firstname, setFirstname] = useState('');
    const [number, setNumber] = useState([])
    const [isStarted, setIsStarted] = useState(false)
    let time = 15

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
        setIsStarted(true)
        randomizeNumbers()
    }

    function randomizeNumbers() {
        const tempNum = []
        let length = (numbers.length - 1)
        //arpoo numeron väliltä 0-pituus, kunnes laskuri on 0
        for (let usedNum = 0; usedNum <= length; usedNum++) {
            let random = Math.floor(Math.random() * (numbers.length))
            let randomNum = numbers[random]
            tempNum.push(randomNum)
            numbers.splice(random, 1)
        }
        setNumber(tempNum)
    };

    //jos aloita ei ole painettu
    if (isStarted === false) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('./logo.jpg')} style={styles.logoHomepage} />
                </View>
                <View style={styles.center}>
                    <View style={styles.center}>
                        <Text style={styles.textHeader2}>Tunnista numerot</Text>
                        <Text style={styles.plainText}>Seuraavalla sivulla lue numerot ääneen.</Text>
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
        );
    }
    else {
        return (
            <View style={styles.container}>
                <NumbersTable numbers={number} time={time} />
                <Footer done={done} right={right} />
            </View>
        );
    }

}


