import React, { useState, useEffect } from "react";
import { Pressable, View, Text, Image, Dimensions } from "react-native";
import styles from "../styles/styles";
import Footer from "./Footer";
import NumbersTable from "./NumbersTable";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

let right = 0
let done = 0
const height = (Dimensions.get('window').height)
const tableHeight = height * 0.51
const swapPicSize = tableHeight / 5

//tarvitaan lista numeroita
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
    '13', '14', '15', '16', '17', '18', '19', '20']

export default function Numbers() {
    const [firstname, setFirstname] = useState('');
    const [number, setNumber] = useState([])
    const [isStarted, setIsStarted] = useState(false)
    let time = 5

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

    //funktio tason muuttujan nollaukseen
    function resetLevel() {
        setIsStarted(false)
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
            <View style={styles.frontContainer}>
                <View style={styles.header}>
                    <Image source={require('./logo.jpg')} style={styles.logoHomepage} />
                </View>
                <Text style={styles.textHeader2}>Tunnista numerot</Text>
                <Text style={styles.plain}>Seuraavalla sivulla lue numerot ääneen.</Text>
                <Pressable
                    title='Aloita!'
                    onPress={startGame}
                    style={styles.start}>
                    <Text style={styles.startText}>Aloita!</Text>
                </Pressable>
                <Footer done={done} right={right} />
            </View>
        );
    }
    else {
        return (
            <View style={styles.frontContainer}>
                <View style={styles.right}>
                    <Pressable
                        style={styles.change}
                        title='change'
                        onPress={() => {
                            resetLevel();
                        }} >
                        <MaterialCommunityIcons
                            name='restart'
                            size={swapPicSize}
                            color={'black'}
                        >
                        </MaterialCommunityIcons>
                    </Pressable>
                </View>
                <NumbersTable numbers={number} time={time} />
                <Footer done={done} right={right} />
            </View>
        );
    }

}


