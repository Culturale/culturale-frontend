import axios, { AxiosResponse } from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
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
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Evento from '../components/evento/evento';
import { Background } from '@react-navigation/elements';

interface Event {
  _id: string;
  denominacio: string;
  adress: string;
  dataIni: string;
}

export default function HomeScreen ({ navigation } : {navigation: any}) {

  const [events, setEvents] = useState<Event[]>([]);
  const SERVER_URL = 'http://192.168.8.101:8080';

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
          denominacio: item.denominacio
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 32,
    backgroundColor: '#34b38a',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  bottomContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 16,
    width: '100%',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  hoyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  eventContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
});