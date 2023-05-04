import React, { useState, useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import {View, Text, TouchableOpacity} from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import styles from './MapStyles';

export default function Mapa({ latitud, longitud }) {
  const [region, setRegion] = useState({
    latitude: latitud,
    longitude: longitud,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [eventos, setEventos] = useState([]);
  const [eventosMarkers, setEventosMarkers] = useState([]);
  const [showCallout, setShowCallout] = useState(false);

  const SERVER_URL = 'http://172.20.10.2:8080';

  useEffect(() => {
    // Obtiene la ubicación actual del dispositivo y actualiza la región del mapa
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();

    // Obtiene la información de los eventos y convierte las direcciones en coordenadas de latitud y longitud
    const obtenerEventos = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/events`);
        const eventosData = response.data.events;
        const eventosMarkersData = await Promise.all(
          eventosData.map(async (evento) => {
            const direccion = evento.adress;
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                direccion
              )}&key=AIzaSyCj7cgW6zZL9aN1gEZtRXxjM3jcsDXIKTQ`
            );
            const resultado = response.data.results[0];
            if (!resultado) {
              return null;
            }
            const { lat, lng } = resultado.geometry.location;
            const dataIni: Date = new Date(evento.dataIni);
            const data: string = dataIni.toLocaleDateString();
            return { latitude: lat, longitude: lng, title: evento.title, denominacio: evento.denominacio, dataIni: data, adress: evento.adress, horari: evento.horari};
          })
        );
        setEventosMarkers(eventosMarkersData.filter(Boolean));
        setEventos(eventosData);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerEventos();

  }, []);

  const closeCallout = () => {
    setShowCallout(false);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        {eventosMarkers.map((marker) => (
          <Marker 
            key={`${marker.latitude}-${marker.longitude}`}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}>
            <Callout style={styles.callout}>
              <View>
                <Text style={styles.eventName}>{marker.denominacio}</Text>
                <Text style={styles.eventDescription}>{marker.horari}</Text>
                <Text style={styles.eventDescription}>{marker.dataIni}</Text>
                <Text style={styles.eventDescription}>{marker.adress}</Text>
              </View>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>¡Apúntate!</Text>
              </TouchableOpacity>
            </Callout>
          </Marker>
        ))}
      </MapView>
      {showCallout && (
        <View>
          <TouchableOpacity onPress={closeCallout} />
        </View>
      )}
    </View>
  );
}