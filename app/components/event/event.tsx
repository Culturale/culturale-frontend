import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IEvent } from '~/domain';
import { EventStyles as styles } from './event.styles';

interface Props {
  event: IEvent;
}

export const Event: React.FC<Props> = ({ event }) => {
  return (
    <View style={styles.container}>
      {/* <Image source={{ uri: event.image }} style={styles.image} /> */}
      <View style={styles.details}>
        <Text style={styles.title}>{event.denominacio}</Text>
        <View style={styles.subtitleContainer}>
          <Ionicons color="#888" name="calendar-outline" size={16} />
          <Text style={styles.subtitle}>{event.dataIni.toLocaleDateString()}</Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Ionicons color="#888" name="time-outline" size={16} />
          <Text style={styles.subtitle}>{event.horari}</Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Ionicons color="#888" name="location-outline" size={16} />
          <Text style={styles.subtitle}>{event.adress}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>¡Ver evento!</Text>
      </TouchableOpacity>
    </View>
  );
};