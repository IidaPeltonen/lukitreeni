// App.js
import * as React from "react";
import "react-native-gesture-handler"; //this should be the first import in your code
import { Image, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./components/Homescreen";
import Words from "./components/Words";
import Sentences from './components/Sentences'
import Numbers from './components/Numbers'
import Letters from './components/Letters'
import styles from "./styles/styles";
import logo from "./components/logo.jpg"

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

{/* <Drawer.Navigator initialRouteName="Home">
  <Stack.Screen name="Etusivu" component={HomeScreen} />
  <Stack.Screen name="Sanat" component={Words} />
  <Stack.Screen name="Lauseet" component={Sentences} />
  <Stack.Screen name="Numerot" component={Numbers} />
  <Stack.Screen name="Kirjaimet" component={Letters} />
</Drawer.Navigator> */}

export default function App() {
  return (
    <NavigationContainer style={styles.navi}>
      <Drawer.Navigator initialRouteName="Home" screenOptions={{
        drawerStyle: {backgroundColor: '#c9f1fd',
        drawerActiveTintColor: 'yellow'} //ei tee mitään
      }}>
        <Stack.Screen name="Etusivu" component={HomeScreen} />
        <Stack.Screen name="Sanat" component={Words} />
        <Stack.Screen name="Lauseet" component={Sentences} />
        <Stack.Screen name="Numerot" component={Numbers} />
        <Stack.Screen name="Kirjaimet" component={Letters} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}