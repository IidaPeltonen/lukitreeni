import React, { useState, useEffect } from "react";
import { Pressable, View, Text, Image, Dimensions, StyleSheet } from "react-native";
import styles from "../styles/styles";
import Footer from "./Footer";
import DicesTable from "./DicesTable";
import TwoDicesTable from "./TwoDicesTable";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { ScrollView } from "react-native-gesture-handler";

const height = (Dimensions.get('window').height)
const tableHeight = height * 0.51
const swapPicSize = tableHeight / 5
const diceSize = tableHeight / 4

export default function Dices() {
    const [firstname, setFirstname] = useState('');
    const [done, setDone] = useState(0) //tehtyjen määrä
    const [oneOrTwo, setOneOrTwo] = useState(0) //tehtyjen määrä
    const [notStarted, setNotStarted] = useState(true) //onko peli aloitettu

    const dicePicOne =
        <MaterialCommunityIcons
            name='dice-1'
            size={diceSize}
            color={'black'}>
        </MaterialCommunityIcons>

    const dicePicTwo =
        <MaterialCommunityIcons
            name='dice-2'
            size={diceSize}
            color={'black'}>
        </MaterialCommunityIcons>

    useEffect(() => {
        getData();
    },);

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
        setNotStarted(false)
    }

      //funktio tason muuttujan nollaukseen
  function resetLevel() {
    setOneOrTwo(0)
  }


    //jos peliä ei ole aloitettu
    if (oneOrTwo === 0) {
        return (
            <View style={styles.frontContainer}>
                <View style={styles.header}>
                    <Image source={require('./logo.jpg')} style={styles.logoHomepage} />
                </View>
                    <Text style={styles.plain}>Valitse montaako noppaa haluat käyttää:</Text>
                    <View style={styles.chooseLvl}>
                        <Pressable
                            title='1'
                            onPress={() => {
                                let helper = 1
                                setOneOrTwo(helper)
                                startGame()
                            }}>
                            <Text style={style.choiceDice}> {dicePicOne} </Text>
                        </Pressable>
                        <Pressable
                            title='2'
                            onPress={() => {
                                let helper = 2
                                setOneOrTwo(helper)
                                startGame()
                            }}>
                            <Text style={style.choiceDice}> {dicePicTwo}{dicePicTwo}  </Text>
                        </Pressable>
                        <Text></Text>
                    </View>
                <Footer done={done} />
            </View>
        );
    }
    else if (notStarted === false && oneOrTwo === 1) {
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
                            name='swap-vertical'
                            size={swapPicSize}
                            color={'black'}
                        >
                        </MaterialCommunityIcons>
                    </Pressable>
                </View>
                <DicesTable />
            </View>
        );
    }
    else if (notStarted === false && oneOrTwo === 2) {
        return (
            <ScrollView>
                <View style={styles.frontContainer}>
                    <View style={styles.right}>
                        <Pressable
                            style={styles.change}
                            title='change'
                            onPress={() => {
                                resetLevel();
                            }} >
                            <MaterialCommunityIcons
                                name='swap-vertical'
                                size={swapPicSize}
                                color={'black'}
                            >
                            </MaterialCommunityIcons>
                        </Pressable>
                    </View>
                    <TwoDicesTable />
                </View>
            </ScrollView>
        );
    }
}

const style = StyleSheet.create({
  choiceDice: {
    alignSelf: 'center',
    swapPicSize: 12,
    marginBottom: 2
  },
});

