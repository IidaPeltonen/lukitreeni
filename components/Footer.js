import React from 'react';
import { Text, View } from 'react-native';
import styles from "../styles/styles";

export default function Footer({ done, right, name }) {

  if (done = 'undefined') {
    return (
      <View style={styles.footer}>
        <Text style={styles.doer}>Lukija: {name}</Text>
      </View>
    )
  }
  else {
    return (
      <View style={styles.footer}>
        <Text style={styles.doer}>Lukija: {name}</Text>
        <Text style={styles.done}>Tehty: {done}</Text>
        <Text style={styles.right}>Oikein: {right} </Text>
      </View>

    )
  }
}