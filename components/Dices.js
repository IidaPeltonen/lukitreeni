import React, { useState, useEffect } from "react";
import { Pressable, View, Text, Image, TextInput, ScrollView, Keyboard } from "react-native";
import styles from "../styles/styles";
import Footer from "./Footer";
import DicesTable from "./DicesTable";
import TwoDicesTable from "./TwoDicesTable";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

export default function Dices() {
    const [done, setDone] = useState(0) //tehtyjen määrä
    const [oneOrTwo, setOneOrTwo] = useState(0) //tehtyjen määrä
    const [notStarted, setNotStarted] = useState(true) //onko peli aloitettu

    const dicePic =
    <MaterialCommunityIcons
        name='dice-1'
        size={50}
        color={'black'}>
    </MaterialCommunityIcons>

    useEffect(() => {
        getData();
      }, );

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
        console.log('startgame')
        setNotStarted(false)
    }


    //jos peliä ei ole aloitettu
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
                                    <Text style={styles.choice}> {dicePic}{dicePic}  </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    <Footer done={done}  />
                </View>
            </ScrollView>
        );
    }
    else if (notStarted === false && oneOrTwo === 1){
        return (
            <ScrollView>
                <View style={styles.container}>
                   <DicesTable />
                </View>
            </ScrollView>
        );
    }
    else if (notStarted === false && oneOrTwo === 2){
        return (
            <ScrollView>
                <View style={styles.container}>
                   <TwoDicesTable />
                </View>
            </ScrollView>
        );
    }


}