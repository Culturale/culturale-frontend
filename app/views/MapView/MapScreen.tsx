import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import Mapa from '../../components/map/map';
import styles from './MapScreenStyles';


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