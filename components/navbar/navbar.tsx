import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity
} from "react-native";

import HomeScreen from '../../views/HomeScreen';
import MapScreen from '../../views/MapScreen';
import EventsScreen from '../../views/EventsScreen';
import ProfileScreen from '../../views/ProfileScreen';

const homeName = 'Inicio';
const mapName = 'Mapa';
const eventsName = 'Mis eventos';
const profileName = 'Perfil';

const Tab = createBottomTabNavigator();


export default function NavBar () {
  return(
    <NavigationContainer>
      <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({route}) => ({ headerShown: false, tabBarActiveTintColor: '#000',
        tabBarIcon: ({focused, color, size}) => {
          let iconName:string = '';
          let rn = route.name;
          color = 'black';

          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline'
          } else if (rn === mapName) {
            iconName = focused ? 'map' : 'map-outline'
          } else if (rn === eventsName) {
            iconName = focused ? 'list' : 'list-outline'
          } else if (rn === profileName) {
            iconName = focused ? 'person' : 'person-outline'
          }

          return <Ionicons name={iconName} size={size} color={color}/>

        },
      })}>

        <Tab.Screen name={homeName} component={HomeScreen}/>
        <Tab.Screen name={mapName} component={MapScreen}/>
        <Tab.Screen name={eventsName} component={EventsScreen}/>
        <Tab.Screen name={profileName} component={ProfileScreen}/>

      </Tab.Navigator>    
    </NavigationContainer>
  )
}