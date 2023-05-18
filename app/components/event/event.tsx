import type React from 'react';
import { View, Text , StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import type { IEvent } from '~/domain';
interface Props {
  event: IEvent;
}

export const Event: React.FC<Props> = ({ event }) => {
  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Text style={styles.title}>{event.denominacio}</Text>
        <View style={styles.subtitleContainer}>
          <Ionicons color="#888" name="location-outline" size={16} />
          <Text style={styles.subtitle}>{event.adress}</Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Ionicons color="#888" name="calendar-outline" size={16} />
          <Text style={styles.subtitle}>{new Date(event.dataIni).toLocaleDateString()}</Text>
        </View>
      </View>
      <Image source={{ uri: event.photo ? event.photo : 'https://archive.org/download/no-photo-available/no-photo-available.png'}} style={{alignSelf: 'flex-end',height: 125, width: 106}}/>
      {/* {! enrolled && <TouchableOpacity style={styles.button}>
        <TraductionText style={styles.buttonText} tx="event.join"/>
      </TouchableOpacity>} */}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end',
    backgroundColor: '#34b38a',
    borderBottomRightRadius: 10,
    bottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 8,
    position: 'absolute',
    right: 0,
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
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  details: {
    flex: 1,
    padding: 10,
  },

  image: {
    height: '100%',
    width: 80,
  },
  subtitle: {
    color: '#666',
    fontSize: 14,
    marginLeft: 4,
  },
  subtitleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
