import React from 'react';
import { Text, View } from 'react-native';
import styles from "../styles/styles";

export default function Footer({ name }) {

    return (
      <View style={styles.footer}>
        <Text style={styles.doer}>Oppilas: {name}</Text>
{/*         <Text style={styles.done}>Tehty: {done}</Text>
        <Text style={styles.done}>Oikein: {right} </Text> */}
      </View>

    )
}