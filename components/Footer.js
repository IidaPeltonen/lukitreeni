import React, {useState, useEffect} from 'react';
import { Text, View, ScrollView } from 'react-native';
import styles from "../styles/styles";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Footer({ counter}) {
  const [firstname, setFirstname] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const firstname = await AsyncStorage.getItem('@firstname');
      if (firstname !== null) {
        setFirstname(firstname);
      }
    } catch(e) {
      console.log('error: ' + e)
    }
  }

    return (
      <View style={styles.footer}>
        <Text style={styles.doer}>Oppilas: {firstname} </Text>
      </View>
    )
}