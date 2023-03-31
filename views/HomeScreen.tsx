import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
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



  
  

interface Event {
  _id: string;
  url: string;
  denominacio: string;
  adress: string;
  dataIni: string;
}




export default function HomeScreen ({navigation} : {navigation: any}) {

  



    const [events, setEvents] = useState<Event[]>([]);
    const SERVER_URL = 'http://172.20.10.8:8080'
    


    useEffect(() => {
      axios.get(`${SERVER_URL}/events`)
      .then(response => {
        setEvents(response.data.events);
      })
        .catch(error => {
          console.log(error);
        });
    }, []);

    const renderItem = ({ item } : {item: any}) => (
      <Evento
        event={{
          url: item.url,
          denominacio: item.denominacio,
          adress: item.adress,
          dataIni: item.dataIni,
        }}
        key={item._id}
      />
    );




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
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
        </View>
      </View>
    );
  };

  
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



