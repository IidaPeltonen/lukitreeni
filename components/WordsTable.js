import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Dimensions } from 'react-native';
import styles from "../styles/styles";

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
        <View style={styles.container} >
            {wordIndex <= (words.length - 1) &&
                <>
                    <View style={styles.WordsTable}>
                        <View style={styles.center} >
                            <Text style={styles.show}>{words[wordIndex]}</Text>
                            <Text style={styles.plain}>{info}</Text>
                        </View>
                        <Text style={styles.Clock}>Aikaa jäljellä : {counter} </Text>
                    </View>
                </>
            }
        </View>
    )
}