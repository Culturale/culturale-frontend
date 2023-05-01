import axios, { AxiosResponse } from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList
} from 'react-native';

import Evento from '../components/evento/evento';



interface Event {
  _id: string;
  denominacio: string;
  adress: string;
  dataIni: string;
  dataFi: string;
  horari: string;
  url: string;

}

export default function HomeScreen ({ navigation } : {navigation: any}) {
  

  const [events, setEvents] = useState<Event[]>([]);
  const SERVER_URL = 'http://192.168.1.38:8081';

  useEffect(() => {
    axios.get(`${SERVER_URL}/events`)
      .then(response => {
        const modifiedEvents = response.data.events.map((event: Event, index: number) => {
          event._id = (index + 1).toString();
          return event;
        });
        setEvents(modifiedEvents);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const renderItem = ({ item } : {item: any}) => (
      <Evento
        key={item._id}
        event={{
          adress: item.adress,
          dataIni: item.dataIni,
          denominacio: item.denominacio,
          dataFi: item.dataFi,
          descripcio: item.descripcio,
          horari: item.horari,
          url: item.url,

        }}
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
            <Ionicons color="black" name="filter-outline" size={24} />
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
}

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 16,
    width: '100%'
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 44
  },
  eventContainer: {
    flex: 1,
    width: '100%'
  },
  hoyContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  subTitle: {
    fontFamily: 'Helvetica',
    fontSize: 18,
    fontWeight: 'bold'
  },
  title: {
    fontFamily: 'Helvetica',
    fontSize: 24,
    fontWeight: 'bold'
  },

  titleContainer: {
    justifyContent: 'center'
  }
});
