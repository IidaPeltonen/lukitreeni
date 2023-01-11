// App.js
import * as React from "react";
import { View, Text } from "react-native";
import "react-native-gesture-handler"; //this should be the first import in your code
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./components/Homescreen";
import AboutScreen from "./components/Aboutscreen";
import ContactScreen from './components/ContactScreen';
import styles from "./styles/styles";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
<Drawer.Navigator initialRouteName="Home">
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="About" component={AboutScreen} />
  <Stack.Screen name="Contact" component={ContactScreen} />
</Drawer.Navigator>

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}