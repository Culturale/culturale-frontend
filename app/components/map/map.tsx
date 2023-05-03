import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';

export default function Mapa({ latitud, longitud }) {
//Agafem la info dels eventos:
  const [eventos, setEventos] = useState([]);

  const [region, setRegion] = useState({
    latitude: latitud,
    longitude: longitud,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

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

    // Aquí se obtiene la información de los eventos de una fuente externa
    // y se guarda en el estado de eventos
    const obtenerEventos = async () => {
        const respuesta = await fetch('https://ejemplo.com/eventos');
        const datos = await respuesta.json();
        setEventos(datos);
    };
    
    obtenerEventos();

  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
      {eventos.map(evento => (
        <Marker key={evento.id} coordinate={{ latitude: evento.latitud, longitude: evento.longitud }} />
      ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
