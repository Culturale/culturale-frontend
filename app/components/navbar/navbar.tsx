import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import EventsScreen from '../../views/EventsScreen';
import HomeScreen from '../../views/HomeScreen';
import MapScreen from '../../views/MapScreen';
import ProfileScreen from '../../views/ProfileScreen';

const homeName = 'Inicio';
const mapName = 'Mapa';
const eventsName = 'Mis eventos';
const profileName = 'Perfil';

const Tab = createBottomTabNavigator();

export default function NavBar () {
  return (
      <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#000',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';
          const rn = route.name;
          color = 'black';

          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === mapName) {
            iconName = focused ? 'map' : 'map-outline';
          } else if (rn === eventsName) {
            iconName = focused ? 'list' : 'list-outline';
          } else if (rn === profileName) {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons color={color} name={iconName} size={size}/>;
        }
      })}>

        <Tab.Screen component={HomeScreen} name={homeName}/>
        <Tab.Screen component={MapScreen} name={mapName}/>
        <Tab.Screen component={EventsScreen} name={eventsName}/>
        <Tab.Screen component={ProfileScreen} name={profileName}/>

      </Tab.Navigator>
  );
}
