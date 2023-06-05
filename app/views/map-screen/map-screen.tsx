import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import * as Location from 'expo-location';
import { observer } from 'mobx-react-lite';
import { useState, useEffect, useRef} from 'react';
import { Text, TouchableOpacity, TextInput, View, Button } from 'react-native';
import MapView, { LatLng, Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Text as TraductionText } from '~/components';
import type { IEvent } from '~/domain/entities';
import { useApplicationLayer } from '~/hooks';
import type { RootParamList } from '~/navigation';

import type { MapScreenProps as Props } from './map-screen.props';
import { MapScreenStyles as styles } from './map-screen.styles';




export const MapScreen: React.FC<Props> = observer(() => {
    const [mapBounds, setMapBounds] = useState<{
        lowerLeft: LatLng | null;
        topRight: LatLng | null;
      }>({
        lowerLeft: null,
        topRight: null,
      });
      
    const {
        controllers: { EventController },
    } = useApplicationLayer();
    
    const events = EventController.eventsmap;

    useEffect(() => {
        if (mapBounds.lowerLeft && mapBounds.topRight) {
          EventController.fetchMapEvents(
            mapBounds.lowerLeft.latitude,
            mapBounds.lowerLeft.longitude,
            mapBounds.topRight.latitude,
            mapBounds.topRight.longitude
          );
        }
      }, [mapBounds]);

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
        const getLocationAsync = async () => {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            // El usuario no ha concedido los permisos de ubicación
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
        getLocationAsync();
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

    const mapRef = useRef<MapView | null>(null);

    type MapNavigation = StackNavigationProp<RootParamList, 'MapScreen'>;

    const navigation = useNavigation<MapNavigation>();

    const handleEventClick = (event: IEvent) => {
        navigation.navigate('EventScreen', { eventId : event.id });
    };

    let markers = null;
    if (events) {
      markers = events.map((event) => (
        <Marker
          key={`${event.lat}-${event.long}`}
          coordinate={{ latitude: event.lat, longitude: event.long }}
          title={event.denominacio}
        >
          <Callout style={styles.calloutContainer} onPress={() => handleEventClick(event)}>
                    <Text style={styles.subTitle}>{event.denominacio}</Text>
                    <View style={styles.infoContainer}>
                        <View style={styles.iconContainer}>
                            <Ionicons color="#888" name="time" size={18} />
                        </View>
                        <Text style={styles.infoText}>{event.horari}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.iconContainer}>
                            <Ionicons color="#888" name="calendar" size={18} />
                        </View>
                        <Text style={styles.infoText}>{event.dataIni.toLocaleDateString()}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.iconContainer}>
                            <Ionicons color="#888" name="location" size={18} />
                        </View>
                        <Text style={styles.infoText}>{event.adress}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.iconContainer}>
                            <Ionicons color="#888" name="card" size={18} />
                        </View>
                        <Text>{event.price}</Text>
                    </View>
                    <View style={styles.buttonText}>
                        <Button title= 'Ver evento' onPress={() => handleEventClick(event)}/>
                    </View>
            </Callout>
        </Marker>
      ));
    }
    return (
        <View style={styles.container}>
    
            <View style={styles.titleContainer}>
            <TraductionText style={styles.title} tx = 'MapScreen.titol'/>
            </View>
    
            <View style={styles.bottomContainer}>
                    <TraductionText style={styles.subTitle} tx = 'MapScreen.subtitol'/>
            </View>
            
            <View style={styles.map}>
                <MapView provider={PROVIDER_GOOGLE} region={region} style={styles.map}
                onLayout={({ nativeEvent }) => {
                    const { width, height } = nativeEvent.layout;
                    const corners = {
                      lowerLeft: { x: 0, y: height },
                      topRight: { x: width, y: 0 },
                    };
                    const lowerLeftPromise = mapRef.current?.coordinateForPoint(corners.lowerLeft);
                    const topRightPromise = mapRef.current?.coordinateForPoint(corners.topRight);
                
                    Promise.all([lowerLeftPromise, topRightPromise]).then(([lowerLeft, topRight]) => {
                      setMapBounds({ lowerLeft, topRight });
                    });
                    if (mapBounds.lowerLeft && mapBounds.topRight) {
                        EventController.fetchMapEvents(
                          mapBounds.lowerLeft.latitude,
                          mapBounds.lowerLeft.longitude,
                          mapBounds.topRight.latitude,
                          mapBounds.topRight.longitude
                        );
                    }
                  }}
                  ref={mapRef}
                >
                {markers}
                </MapView>
            
                    <View style={styles.searchContainer}>
                        <TextInput placeholder="Introduce el lugar del evento" placeholderTextColor="#000"
                                   style={styles.searchInput} value={searchTerm}
                                   onChangeText={(text) => setSearchTerm(text)} onSubmitEditing={searchEvents}/>        
                        <TouchableOpacity style={styles.searchButton} onPress={searchEvents}>
                            <Ionicons color="white" name="search" size={24} />
                        </TouchableOpacity>
                    </View>
    
                <TouchableOpacity style={styles.locationButton} onPress={onPressLocation}>
                    <Ionicons color="white" name="md-locate" size={24} />
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