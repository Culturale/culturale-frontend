import { MapScreenStyles as styles } from './map-screen.styles';
import { useApplicationLayer } from '~/hooks';
import MapView, { Marker, Callout } from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import * as Location from 'expo-location';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function MapScreen({ latitud, longitud }) {

  const {controllers:{EventController}} = useApplicationLayer();
  const events = EventController.events;
  const [showCallout, setShowCallout] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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
        //NO ENTRA, NO demana permis per la ubi...
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.09,
        });
      })();
    }, []);

    const [region, setRegion] = useState({
        latitude: 41.3851,
        longitude: 2.1734,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
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
          latitudeDelta: 0.09,
          longitudeDelta: 0.09,
        });
    };

    const searchEvents = async () => {
        const filteredEvents = events.filter((event) =>
          event.denominacio.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredEvents);
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
             <View style={styles.searchContainer}>
        <TextInput
            style={styles.searchInput}
            placeholder="Introduce el lugar del evento"
            placeholderTextColor="#000"
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            onSubmitEditing={searchEvents}
        />
        <Ionicons style={{ zIndex: 0 }} name="search" size={24} color="transparent" />
        <TouchableOpacity style={styles.searchButton} onPress={searchEvents}>
            <Ionicons style={{ zIndex: 1 }} name="search" size={24} color="white" />
        </TouchableOpacity>
    </View>
        {events.map((event) => (
          <Marker 
            key={`${event.lat}-${event.long}`}
            coordinate={{ latitude: event.lat, longitude: event.long}}
            title={event.denominacio}>
           <Callout style={styles.calloutContainer}>
            <View style={styles.container}>
                <Text style={styles.eventName}>{event.denominacio}</Text>
                <Text style={styles.subTitle}>{event.descripcio}</Text>

                <View style={styles.infoContainer}>
                <View style={styles.iconContainer}>
                    <Ionicons name="time" size={18} color="#888" />
                </View>
                <Text style={styles.infoText}>{event.horari}</Text>
                </View>

                <View style={styles.infoContainer}>
                <View style={styles.iconContainer}>
                    <Ionicons name="calendar" size={18} color="#888" />
                </View>
                <Text style={styles.infoText}>{event.dataIni.toLocaleDateString()}</Text>
                </View>

                <View style={styles.infoContainer}>
                <View style={styles.iconContainer}>
                    <Ionicons name="location" size={18} color="#888" />
                </View>
                <Text style={styles.infoText}>{event.adress}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="card" size={18} color="#888" />
                    </View>
                    <Text>{event.price}</Text>
                    <TouchableOpacity style={styles.button}>
                     <Text style={styles.buttonText}>¡Apúntate!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Callout>
          </Marker>
        ))}
        {searchResults.map((event) => (
        <Marker 
            key={`${event.lat}-${event.long}`}
            coordinate={{ latitude: event.lat, longitude: event.long}}
            title={event.denominacio}>
            <Callout style={styles.calloutContainer}>
            <View>
                <Text style={styles.eventName}>{event.denominacio}</Text>
                <Text style={styles.eventDescription}>{event.horari}</Text>
                <Text style={styles.eventDescription}>{event.dataIni.toLocaleDateString()}</Text>
                <Text style={styles.eventDescription}>{event.adress}</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>¡Apúntate!</Text>
                </TouchableOpacity>
            </View>
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

/*          

SI poso aixo dins del callout pk es mostri la foto del event, al apretar es tanca la app, peta???
                <Image
                source={{uri: event.photo}}
                style={styles.image}
                resizeMode="cover"
                />
                */