import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import styles from "../styles/styles";

const height = (Dimensions.get('window').height)
const tableHeight = height * 0.51
const sideMargin = height / 4.7
const fontSize = tableHeight / 4.4

export default function NumbersTable({ numbers, time }) {
    const [numIndex, setNumIndex] = useState(0);
    const [counter, setCounter] = useState(time) //kauanko luku näkyy
    const [info, setInfo] = useState('') //info sanoje loppumisesta

    useEffect(() => {
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        if (counter === 0 && numIndex < (numbers.length - 1)) {
            setCounter(time);
            setNumIndex(numIndex + 1);
        }
        else if (counter === 0 && numIndex === (numbers.length - 1)) {
            setNumIndex('')
            setInfo('Luvut loppuivat!')
        }
        return () => clearInterval(timer);
    }, [counter]);

    return (
        <View style={styles.frontContainer}>
            <View style={style.NumbersTable} >
                {numIndex <= (numbers.length - 1) &&
                    <>
                        <Text style={style.showWord}>{numbers[numIndex]}</Text>
                        <Text style={styles.plain}>{info}</Text>
                    </>
                }
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    NumbersTable: {
         height: tableHeight,
         textAlign: 'center',
         alignItems: 'center',
         justifyContent: 'center',
         borderWidth: 5,
         marginLeft: sideMargin,
         marginRight: sideMargin,
         borderStyle: 'dashed',
         marginTop: sideMargin /2
     },
     showWord: {
         fontSize: fontSize,
         fontFamily: 'Roboto',
         fontWeight: 'bold',
       },
 });


