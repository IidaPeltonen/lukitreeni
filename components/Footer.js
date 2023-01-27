import React, {useState, useEffect} from 'react';
import { Text, View, ScrollView } from 'react-native';
import styles from "../styles/styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

export default function Footer({  done }) {
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
  console.log('done: ' + done)

  if (done === 0 || done === '' ) {
    return (
      <View style={styles.footer}>
        <Text style={styles.doer}> {studentPic}: {firstname}   </Text>
      </View>
    )
  }
  else {
    return (
      <View style={styles.footer}>
        <View style={styles.nextTo}>
          <Text style={styles.doer}> {studentPic}: {firstname}    </Text>
          <Text style={styles.doer}> {donePic}: {done} </Text>
        </View>
      </View>
    )
  }


}