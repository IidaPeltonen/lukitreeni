import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Dimensions } from 'react-native';
import styles from "../styles/styles";

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
        <View style={styles.container} >
            {senIndex <= (sentences.length - 1) &&
                <>
                    <View style={styles.SentencesTable}>
                        <View style={styles.center} >
                            <Text style={styles.showSen}>{sentences[senIndex]}</Text>
                            <Text style={styles.plainText}>{info}</Text>
                        </View>
                        <Text style={styles.Clock}>Aikaa jäljellä : {counter} </Text>
                    </View>
                </>
            }
        </View>
    )
}