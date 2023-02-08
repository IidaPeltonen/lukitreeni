import React, { useEffect, useState } from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import styles from "../styles/styles";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const height = (Dimensions.get('window').height)
const tableHeight = height * 0.51
const sideMargin = height / 5
const fontSize = tableHeight / 6

export default function SentencesTable({ sentences, time }) {
    const [senIndex, setSenIndex] = useState(0) //kauanko sana näkyy, määräytyy vaikeustason mukaan
    const [counter, setCounter] = useState(time) //kauanko sana näkyy, määräytyy vaikeustason mukaan
    const [info, setInfo] = useState('') //info sanoje loppumisesta

    useEffect(() => {
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        if (counter === 0 && senIndex < (sentences.length - 1)) {
            setCounter(time);
            setSenIndex(senIndex + 1);
        }
        else if (counter === 0 && senIndex === (sentences.length - 1)) {
            setSenIndex('')
            setInfo('Lauseet loppuivat!')
        }
        return () => clearInterval(timer);
    }, [counter]);

    return (
        <View style={styles.frontContainer} >
            <View style={style.SentencesTable} >
                {senIndex <= (sentences.length - 1) &&
                    <>
                        <Text style={style.showSen}>{sentences[senIndex]}</Text>
                        <Text style={styles.plain}>{info}</Text>
                        <Text style={styles.Clock}>
                            <MaterialCommunityIcons
                                name='timer-outline'
                                size={25}
                                color={'black'}>
                            </MaterialCommunityIcons>: {counter}
                        </Text>
                    </>
                }
                </View>
        </View>
    )
}

const style = StyleSheet.create({
    SentencesTable: {
         height: tableHeight,
         textAlign: 'center',
         alignItems: 'center',
         justifyContent: 'center',
         borderWidth: 5,
         marginLeft: sideMargin,
         marginRight: sideMargin,
         borderStyle: 'dashed',
     },
     showSen: {
         fontSize: fontSize,
         fontFamily: 'Roboto',
         fontWeight: 'bold',
       },
 });