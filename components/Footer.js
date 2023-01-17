import React, {useState, useEffect} from 'react';
import { Text, View, ScrollView } from 'react-native';
import styles from "../styles/styles";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Footer() {
  const [firstname, setFirstname] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const firstname = await AsyncStorage.getItem('@firstname');
      console.log(firstname);
      if (firstname !== null) {
        setFirstname(firstname);
      }
    } catch(e) {
      console.log('error: ' + e)
    }
  }

    return (
      <ScrollView>
      <View style={styles.footer}>
        <Text style={styles.doer}>Oppilas: {firstname}</Text>
      </View>
      </ScrollView>
    )
}