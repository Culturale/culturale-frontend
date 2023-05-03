import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';


export default function Evento({ event } : {event: any}) {
  const dataIni: Date = new Date(event.dataIni);
  const data: string = dataIni.toLocaleDateString();
  return (
    <View style={styles.container}>
      <Image source={{ uri: event.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{event.denominacio}</Text>
            <View style={styles.subtitleContainer}>
            <Ionicons color="#888" name="location-outline" size={16} />
            <Text style={styles.subtitle}>{event.adress}</Text>
            </View>
            <View style={styles.subtitleContainer}>
            <Ionicons color="#888" name="calendar-outline" size={16} />
            <Text style={styles.subtitle}>{data}</Text>
            </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>¡Apúntate!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end',
    backgroundColor: '#34b38a',
    borderBottomRightRadius: 16,
    bottom: 46,
    paddingHorizontal: 16,
    marginBottom: -10,
    paddingVertical: 5,
    position: 'absolute',
    right: 0
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    height: 100,
    margin: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },

  details: {
    flex: 1,
    padding: 10
  },

  image: {
    height: '100%',
    width: 80
  },
  subtitle: {
    color: '#666',
    fontSize: 14,
    marginLeft: 4
  },
  subtitleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 4
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});
