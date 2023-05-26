import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react';
import { Text, TouchableOpacity, TextInput, View } from 'react-native';
import * as Location from 'react-native-location';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Text as TraductionText } from '~/components';
import { useApplicationLayer } from '~/hooks';

import type { MapScreenProps as Props } from './map-screen.props';
import { MapScreenStyles as styles } from './map-screen.styles';


export const MapScreen: React.FC<Props> = observer(() => {
    const {
        controllers: { EventController },
    } = useApplicationLayer();
    const events = EventController.events;

    const [showCallout, setShowCallout] = useState(false);
    
    // Lloc a buscar:
    const [searchTerm, setSearchTerm] = useState('');
    const [region, setRegion] = useState({
        latitude: 41.3851,
        latitudeDelta: 0.09,
        longitude: 2.1734,
        longitudeDelta: 0.09,
    });
    
    useEffect(() => {
        // Obtiene la ubicación actual del dispositivo y actualiza la región del mapa
        (async () => {
          await Location.requestForegroundPermissionsAsync();
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            return;
          }
    
          const location = await Location.getCurrentPositionAsync({});
  
          // NO ENTRA, NO demana permis per la ubi...
          setRegion({
            latitude: location.coords.latitude,
            latitudeDelta: 0.09,
            longitude: location.coords.longitude,
            longitudeDelta: 0.09,
          });
        })();
    }, []);

    const closeCallout = () => {
        setShowCallout(false);
      };
  
    const onPressLocation = async () => {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            return;
          }
        
          const location = await Location.getCurrentPositionAsync({});
          setRegion({
            latitude: location.coords.latitude,
            latitudeDelta: 0.09,
            longitude: location.coords.longitude,
            longitudeDelta: 0.09,
          });
      };

    const searchEvents = async () => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchTerm}&key=AIzaSyCj7cgW6zZL9aN1gEZtRXxjM3jcsDXIKTQ`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 'OK') {
            const location = data.results[0].geometry.location;
            setRegion({
              latitude: location.lat,
              latitudeDelta: 0.09,
              longitude: location.lng,
              longitudeDelta: 0.09,
            });
            setSearchTerm('');
        }
        else {
            alert('No se encontró la ubicación deseada');
        }
    };

    const markers = events.map((event) => (
        <Marker
          key={`${event.lat}-${event.long}`}
          coordinate={{ latitude: event.lat, longitude: event.long }}
          title={event.denominacio}
        >
          <Callout style={styles.calloutContainer}>
                                <View style={styles.container}>
                                    <Text style={styles.subTitle}>{event.denominacio}</Text>
                                    <Text style={styles.eventName}>{event.descripcio}</Text>
                                    <View style={styles.infoContainer}>
                                        <View style={styles.iconContainer}>
                                            <Ionicons name="time" size={18} color="#888" />
                                            <Text style={styles.infoText}>{event.horari}</Text>
                                            <Ionicons name="calendar" size={18} color="#888" />
                                            <Text style={styles.infoText}>{event.dataIni.toLocaleDateString()}</Text>
                                            <Ionicons name="location" size={18} color="#888" />
                                            <Text style={styles.infoText}>{event.adress}</Text>
                                            <Ionicons name="card" size={18} color="#888" />
                                            <Text>{event.price}</Text>
                                            <TouchableOpacity>
                                                <Text style={styles.buttonText}>Ver evento</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Callout>
        </Marker>
      ));

    return (
        <View style={styles.container}>
    
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Mapa</Text>
            </View>
    
            <View style={styles.bottomContainer}>
                    <Text style={styles.subTitle}>Eventos interesantes cerca de mí...</Text>
            </View>
            
            <View style={styles.map}>
                <MapView style={styles.map} region={region} provider={PROVIDER_GOOGLE}/>
                    <View style={styles.searchContainer}>
                        <TextInput style={styles.searchInput} placeholder="Introduce el lugar del evento"
                                   placeholderTextColor="#000" value={searchTerm}
                                   onChangeText={(text) => setSearchTerm(text)} onSubmitEditing={searchEvents}/>        
                        <TouchableOpacity style={styles.searchButton} onPress={searchEvents}>
                            <Ionicons name="search" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    {markers}
    
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
});