import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import styles from "../styles/styles";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const height = (Dimensions.get('window').height)
const tableHeight = height * 0.51
const sideMargin = height / 4.7
const fontSize = tableHeight / 4.4

export default function WordsTable({ words, time }) {
    const [wordIndex, setWordIndex] = useState(0);
    const [counter, setCounter] = useState(time) //kauanko sana näkyy, määräytyy vaikeustason mukaan
    const [info, setInfo] = useState('') //info sanoje loppumisesta

    useEffect(() => {
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        if (counter === 0 && wordIndex < (words.length - 1)) {
            setCounter(time);
            setWordIndex(wordIndex + 1);
        }
        else if (counter === 0 && wordIndex === (words.length - 1)) {
            setWordIndex('')
            setInfo('Sanat loppuivat!')
        }
        return () => clearInterval(timer);
    }, [counter]);

    return (
        <View style={styles.frontContainer}>
            <View style={style.WordsTable} >
                {wordIndex <= (words.length - 1) &&
                    <>
                        <Text style={style.showWord}>{words[wordIndex]}</Text>
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
    WordsTable: {
        height: tableHeight,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5,
        marginLeft: sideMargin,
        marginRight: sideMargin,
        borderStyle: 'dashed',
    },
    showWord: {
        fontSize: fontSize,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
    },
});