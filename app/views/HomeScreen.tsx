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
import Ionicons from 'react-native-vector-icons/Ionicons';

import Evento from '../components/evento/evento';


/*
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

  {
    id: 4,
    title: 'Exhibición de arte',
    place: 'Museo de Arte de Lima',
    date: '29 de julio de 2023',
    image: 'https://picsum.photos/id/239/200/300',
  },

  {
    id: 5,
    title: 'Exhibición de arte',
    place: 'Museo de Arte de Lima',
    date: '29 de julio de 2023',
    image: 'https://picsum.photos/id/239/200/300',
  },

  {
    id: 6,
    title: 'Exhibición de arte',
    place: 'Museo de Arte de Lima',
    date: '29 de julio de 2023',
    image: 'https://picsum.photos/id/239/200/300',
  },

  {
    id: 7,
    title: 'Exhibición de arte',
    place: 'Museo de Arte de Lima',
    date: '29 de julio de 2023',
    image: 'https://picsum.photos/id/239/200/300',
  },

];
;${SERVER_URL}/events
*/

interface Event {
  _id: string;
  denominacio: string;
  adress: string;
  dataIni: string;
}

export default function HomeScreen ({ navigation } : {navigation: any}) {
  const exampleEvents = [
    {
      _id: '1',
      adress: 'Calle del Sol, 23',
      dataIni: '2023-04-01T19:00:00.000Z',
      denominacio: 'Concierto de rock'
    },
    {
      _id: '2',
      adress: 'Plaza Mayor, 5',
      dataIni: '2023-04-02T18:30:00.000Z',
      denominacio: 'Obra de teatro'
    },
    {
      _id: '3',
      adress: 'Calle del Mar, 7',
      dataIni: '2023-04-05T11:00:00.000Z',
      denominacio: 'Exposición de arte'
    }
  ];

  const [events, setEvents] = useState<Event[]>([]);
  const SERVER_URL = 'http://192.168.1.38:8080';

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