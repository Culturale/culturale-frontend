import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Mapa from '../components/map/map';


export default function MapScreen ({ navigation } : {navigation: any}) {
  return (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Mapa</Text>
    </View>
    <View style={styles.bottomContainer}>
      <View>
        <Text style={styles.subTitle}>Eventos interesantes cerca de mí...</Text>
      </View>
    </View>
      <View style={styles.map}>
        <Mapa latitud={41.386230} longitud={2.170170} />
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
    paddingBottom: 5,
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
    padding: 5,
    width: '100%',
  },
  subTitle: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  map: {
    flex: 1,
    marginBottom:10,
  }
});