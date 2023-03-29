import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import axios, { AxiosResponse } from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Evento from "../components/evento/evento";

import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";


const events = [
  {
    id: 1,
    title: 'Concierto de rock',
    place: 'Estadio Nacional',
    date: '15 de julio de 2023',
    image: 'https://picsum.photos/id/237/200/300',
  },
  {
    id: 2,
    title: 'Feria gastronómica',
    place: 'Parque de la Exposición',
    date: '22 de julio de 2023',
    image: 'https://picsum.photos/id/238/200/300',
  },
  {
    id: 3,
    title: 'Exhibición de arte',
    place: 'Museo de Arte de Lima',
    date: '29 de julio de 2023',
    image: 'https://picsum.photos/id/239/200/300',
  },
];


export default function HomeScreen ({navigation} : {navigation: any}) {

  return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Inicio</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View>
            <Text style={styles.subTitle}>Cerca de ti</Text>
          </View>
          <View style={styles.hoyContainer}>
            <Text style={styles.subTitle}>Hoy</Text>
            <Ionicons name="filter-outline" size={24} color="black" />
          </View>
        </View>
        <View style={styles.eventContainer}>
          <FlatList
          data={events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Evento event={item} />}
          />
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex:1,
      marginTop: 44,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleContainer: {
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      fontFamily: 'Helvetica',
      fontWeight: 'bold',
    },
    bottomContainer: {
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      padding: 16,
    },

    hoyContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    subTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: 'Helvetica',
    },

    eventContainer: {
      flex: 1,
      width: '100%',
    }
  });



