import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Evento({ event } : {event: any}) {


  return (
    <View style={styles.container}>
      <Image source={{ uri: event.url }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{event.denominacio}</Text>
            <View style={styles.subtitleContainer}>
            <Ionicons name="location-outline" size={16} color="#888" />
            <Text style={styles.subtitle}>{event.adress}</Text>
            </View>
            <View style={styles.subtitleContainer}>
            <Ionicons name="calendar-outline" size={16} color="#888" />
            <Text style={styles.subtitle}>{event.dataIni}</Text>
            </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>¡Apúntate!</Text>
      </TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 80,
    height: '100%',
  },
  details: {
    flex: 1,
    padding: 10,
  },

  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#34b38a',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderBottomRightRadius: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});