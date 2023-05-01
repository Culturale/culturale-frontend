import axios, { AxiosResponse } from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Calendario from '~/components/calendario/calendar';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Modal
} from 'react-native';

export default function EventsScreen ({ navigation } : {navigation: any}) {
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
          <Text style={styles.title}>Mis Eventos</Text>
      </View>
      <TouchableOpacity style={styles.iconContainer} onPress={toggleCalendar}>
          <Ionicons color="black" name="calendar-outline" size={24} />  
      </TouchableOpacity>      
      <View style={styles.eventContainer}></View>

      <Modal visible={showCalendar}>
        <View style={styles.calendarContainer}></View>
          <Calendario   />
        <Button title="Cerrar" onPress={toggleCalendar} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    marginTop: 44
  },
  eventContainer: {
    flex: 1,
    width: '100%'
  },
  title: {
    fontFamily: 'Helvetica',
    fontSize: 24,
    fontWeight: 'bold'
  },

  titleContainer: {
    justifyContent: 'center'
  },

  iconContainer: {
    alignSelf: 'flex-end',
    marginRight: 20,
  },

  calendarContainer: {
    marginTop: 44
  },


});
