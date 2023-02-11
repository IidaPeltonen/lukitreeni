// App.js
import * as React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./components/Homescreen";
import Words from "./components/Words";
import Sentences from './components/Sentences'
import Numbers from './components/Numbers'
import Memory from './components/Memory'
import Letters from './components/Letters'
import Dices from "./components/Dices";
import styles from "./styles/styles";
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    'Roboto': require('./assets/fonts/RobotoMono.ttf')
  })

  if(!fontsLoaded) {
    return null;
    }

  return (
    <NavigationContainer style={styles.navi}>
      <Drawer.Navigator initialRouteName="Home" screenOptions={{
        drawerStyle: {backgroundColor: '#c9f1fd'} 
      }}>
        <Stack.Screen name="Etusivu" component={HomeScreen} style={styles.navi} />
        <Stack.Screen name="Sanat" component={Words} style={styles.navi} />
        <Stack.Screen name="Virkkeet" component={Sentences} style={styles.navi} />
        <Stack.Screen name="Numerot" component={Numbers} style={styles.navi} />
        <Stack.Screen name="Työmuisti" component={Memory} style={styles.navi} />
        <Stack.Screen name="Kirjaimet" component={Letters} style={styles.navi} />
        <Stack.Screen name="Nopat" component={Dices} style={styles.navi} />
        <Stack.Screen name=" " component={''} />
        <Stack.Screen name="  " component={''} />
        </Drawer.Navigator>
    </NavigationContainer>
  );
}