import { MapScreenStyles as styles } from './map-screen.styles';
import { useApplicationLayer } from '~/hooks';
import MapView, { Marker, Callout } from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import * as Location from 'expo-location';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function MapScreen({ latitud, longitud }) {
  const {controllers:{EventController}} = useApplicationLayer();
  const events = EventController.events;
  const [showCallout, setShowCallout] = useState(false);
    useEffect(() => {
      // Obtiene la ubicación actual del dispositivo y actualiza la región del mapa
      (async () => {
        await Location.requestForegroundPermissionsAsync();
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        console.log("HOLA");
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      })();
    }, []);

    const [region, setRegion] = useState({
        latitude: latitud,
        longitude: longitud,
        latitudeDelta: 10.0922,
        longitudeDelta: 20.0421,
      });
  
    const closeCallout = () => {
      setShowCallout(false);
    };

    const onPressLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }
      
        let location = await Location.getCurrentPositionAsync({});
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 10.0922,
          longitudeDelta: 20.0421,
        });
    };

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
      <MapView style={styles.map}
        region={region}
        provider={PROVIDER_GOOGLE}
        >
        {events.map((event) => (
          <Marker 
            key={`${event.lat}-${event.long}`}
            coordinate={{ latitude: event.lat, longitude: event.long}}
            title={event.denominacio}>
            <Callout style={styles.callout}>
              <View>
                <Text style={styles.eventName}>{event.denominacio}</Text>
                <Text style={styles.eventDescription}>{event.horari}</Text>
                <Text style={styles.eventDescription}>{event.dataIni.toLocaleDateString()}</Text>
                <Text style={styles.eventDescription}>{event.adress}</Text>
              </View>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>¡Apúntate!</Text>
              </TouchableOpacity>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <TouchableOpacity style={styles.locationButton} onPress={onPressLocation}>
        <Ionicons name="md-locate" size={24} color="white" />
      </TouchableOpacity>
      {showCallout && (
        <View>
          <TouchableOpacity onPress={closeCallout} />
        </View>
      )}
    </View>
  </View>
  );
}