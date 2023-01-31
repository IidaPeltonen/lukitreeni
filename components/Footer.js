import React, {useState, useEffect} from 'react';
import { Text, View, ScrollView } from 'react-native';
import styles from "../styles/styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

export default function Footer({ done, right }) {
  const [firstname, setFirstname] = useState('');

let studentPic = 
<MaterialCommunityIcons
    name= 'human-child'
    size={20}
    color={'black'}>
</MaterialCommunityIcons>

let donePic = 
<MaterialCommunityIcons
    name= 'check'
    size={20}
    color={'black'}>
</MaterialCommunityIcons>

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

  //jos tehtyjä ei ole
  if (done === 0 || done === '' ) {
    return (
      <View style={styles.footer}>
        <Text style={styles.doer}> {studentPic}: {firstname}   </Text>
      </View>
    )
  }
  //jos oikeita ei oo
  if (right === 0 || right === '') {
    return (
      <View style={styles.footer}>
        <Text style={styles.doer}> {studentPic}: {firstname}   </Text>
        <Text style={styles.doer}> tehty: {done} </Text>
      </View>
    )
  }
    
  else {
    return (
      <View style={styles.footer}>
        <View style={styles.nextTo}>
          <Text style={styles.doer}> {studentPic}: {firstname}    </Text>
          <Text style={styles.doer}> tehty: {done} </Text>
          <Text style={styles.doer}> oikein: {right} </Text>
        </View>
      </View>
    )
  }


}