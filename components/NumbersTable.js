import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import styles from "../styles/styles";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

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
            <View style={styles.NumbersTable} >
                {numIndex <= (numbers.length - 1) &&
                    <>
                        <Text style={styles.showWord}>{numbers[numIndex]}</Text>
                        <Text style={styles.plain}>{info}</Text>
                        {/*                     <Text style={styles.Clock}>
                        <MaterialCommunityIcons
                            name='timer-outline'
                            size={25}
                            color={'black'}>
                        </MaterialCommunityIcons>: {counter}
                    </Text> 
                    Kelloa tuskin kannattaa näyttää tässä?*/}
                    </>
                }
            </View>
        </View>
    )
}


