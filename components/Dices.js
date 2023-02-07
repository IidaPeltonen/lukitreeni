import React, { useState, useEffect } from "react";
import { Pressable, View, Text, Image } from "react-native";
import styles from "../styles/styles";
import Footer from "./Footer";
import DicesTable from "./DicesTable";
import TwoDicesTable from "./TwoDicesTable";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { ScrollView } from "react-native-gesture-handler";

export default function Dices() {
    const [firstname, setFirstname] = useState('');
    const [done, setDone] = useState(0) //tehtyjen määrä
    const [oneOrTwo, setOneOrTwo] = useState(0) //tehtyjen määrä
    const [notStarted, setNotStarted] = useState(true) //onko peli aloitettu

    const dicePicOne =
        <MaterialCommunityIcons
            name='dice-1'
            size={50}
            color={'black'}>
        </MaterialCommunityIcons>

const dicePicTwo =
<MaterialCommunityIcons
    name='dice-2'
    size={50}
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


    //jos peliä ei ole aloitettu
    if (oneOrTwo === 0) {
        return (
            <View style={styles.frontContainer}>
                <View style={styles.header}>
                    <Image source={require('./logo.jpg')} style={styles.logoHomepage} />
                </View>
                <ScrollView>
                    <Text style={styles.textHeader2}>Tunnista numerot</Text>
                    <Text style={styles.plain}>Valitse montaako noppaa haluat käyttää:</Text>
                    <View style={styles.chooseLvl}>
                        <Pressable
                            title='1'
                            onPress={() => {
                                let helper = 1
                                setOneOrTwo(helper)
                                startGame()
                            }}>
                            <Text style={styles.choice}> {dicePicOne} </Text>
                        </Pressable>
                        <Pressable
                            title='2'
                            onPress={() => {
                                let helper = 2
                                setOneOrTwo(helper)
                                startGame()
                            }}>
                            <Text style={styles.choice}> {dicePicTwo}{dicePicTwo}  </Text>
                        </Pressable>
                        <Text></Text>
                    </View>
                </ScrollView>
                <Footer done={done} />
            </View>
        );
    }
    else if (notStarted === false && oneOrTwo === 1) {
        return (
                <View style={styles.container}>
                    <DicesTable />
                </View>
        );
    }
    else if (notStarted === false && oneOrTwo === 2) {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <TwoDicesTable />
                </View>
            </ScrollView>
        );
    }
}