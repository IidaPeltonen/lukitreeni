// App.js
import * as React from "react";
import "react-native-gesture-handler"; //this should be the first import in your code
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./components/Homescreen";
import Words from "./components/Words";
import Sentences from './components/Sentences'
import Numbers from './components/Numbers'
import Letters from './components/Letters'
import styles from "./styles/styles";
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    'Calibri-bold': require('./assets/fonts/calibri-bold.ttf'),
    'Calibri': require('./assets/fonts/calibri-regular.ttf'),
    'Franklin': require('./assets/fonts/Franklin.ttf'),
    'Segoe-bold': require('./assets/fonts/Segoe-UI-Bold.ttf'),
    'Segoe': require('./assets/fonts/Segoe-UI.ttf'),
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
        <Stack.Screen name="Kokonaissanahahmotus" component={Words} style={styles.navi} />
        <Stack.Screen name="Virkkeet" component={Sentences} style={styles.navi} />
        <Stack.Screen name="Työmuisti" component={Numbers} style={styles.navi} />
        <Stack.Screen name="Kirjaimet" component={Letters} style={styles.navi} />
        <Stack.Screen name=" " component={''} />
        <Stack.Screen name="  " component={''} />
        <Stack.Screen name="   " component={''} />
        <Stack.Screen name="    " component={''} />
        </Drawer.Navigator>
    </NavigationContainer>
  );
}