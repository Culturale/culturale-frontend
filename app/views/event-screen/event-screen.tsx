import { Ionicons } from '@expo/vector-icons';
import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import type React from 'react';
import { useState, useEffect} from 'react';
import { Image, Linking, Platform, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


import { Text as TraductionText } from '~/components';
import { useApplicationLayer } from '~/hooks';
import type { RootParamList } from '~/navigation';

import type { EventScreenProps as Props } from './event-screen.props';
import { EventScreenStyles as styles } from './event-screen.styles';

type EventScreenNavigation = StackNavigationProp<RootParamList, 'EventScreen'>;

export const EventScreen: React.FC<Props> = observer(() => {
  const navigation = useNavigation<EventScreenNavigation>();
  const { params } = useRoute<RouteProp<RootParamList, 'EventScreen'>>();
  const {
    controllers: { UserController, EventController },
  } = useApplicationLayer();
  const eventId = params.eventId;
  const enrolled: boolean = UserController.userInfo.eventSub.some((eventUser) => eventUser?.id === event.id);
  const [showSuccess, setShowSuccess] = useState(enrolled);
  const events = UserController.userInfo.preferits;
  const event = EventController.event;
  const price = event?.price?.includes('€') ? event.price?.match(/\d+/)?.[0] + '€' : '0 €';

  const handleOpenMaps = () => {
    const { lat, long } = event;
    const scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    const url = `${scheme}${lat},${long}`;
    Linking.openURL(url);
  };

  useEffect(() => {
    UserController.fetchAllFavourites();
    EventController.fetchEvent(eventId);
  }, [eventId]);
  

  const [isFavorite, setIsFavorite] = useState(event && events.some((item) => item._id === event._id));
  const handleReadMore = () => {
    navigation.navigate('DescriptionScreen', { description: event.descripcio, eventId: event.id });
  };

  function addParticipantEvent() {
    UserController.addEventSub(event);
    EventController.addParticipant(event, UserController.userInfo);
    setShowSuccess(true);
  }

  const toggleFavorite = () => {
    if (isFavorite) {
      UserController.removeFavourite(event.id, UserController.userInfo.username);
    }
    else {
      UserController.addFavourite(event.id, UserController.userInfo.username);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <View style={styles.backArrow}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Ionicons color="black" name="arrow-back" size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {event ? (
          <>
           <View style={styles.titleContainer}>
            <Text style={styles.title}>{event.denominacio}</Text>
            <View style={styles.heart}>
              <TouchableOpacity onPress={toggleFavorite}>
                <Ionicons
                  color={isFavorite ? 'red' : 'black'}
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          </View>
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
              <View  style={{ flexDirection: 'column', gap: 10}}>
              <Image
                source={{
                  uri: event.photo
                    ? event.photo
                    : 'https://archive.org/download/no-photo-available/no-photo-available.png',
                }}
                style={styles.photo}
              />
              <TouchableOpacity onPress={() => Linking.openURL(event.url)}>
                  <TraductionText style={styles.goButton} tx="eventScreen.information" />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <View style={styles.subtitleContainer}>
                  <Ionicons color="#888" name="location-outline" size={16} />
                  <Text style={styles.subtitle}>{event.adress}</Text>
                </View>
                <View style={styles.subtitleContainer}>
                  <Ionicons color="#888" name="calendar-outline" size={16} />
                  <Text style={styles.subtitle}>{event.dataIni.toLocaleDateString()}</Text>
                </View>
                <View style={styles.descriptionContainer}>
                  <Text numberOfLines={2} style={styles.description}>{event.descripcio}
                  </Text>
                </View>
                <TouchableOpacity onPress={handleReadMore}>
                <Text style={styles.readMore}>Leer más</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={() => Linking.openURL(event.url)}>
                  <TraductionText style={styles.goButton} tx="eventScreen.information" />
                </TouchableOpacity> */}
              </View>
            </View>
            <View style={styles.priceContainer}>
              <View
                style={{
                  flexDirection: 'column',
                  gap: 10,
                  justifyContent: 'flex-end',
                  marginTop: 10,
                }}
              >
                <Text style={styles.price}>{price}</Text>
                {!showSuccess ? (
                  <TouchableOpacity style={styles.buyButton} onPress={addParticipantEvent}>
                    {price !== '0 €' && (<TraductionText style={styles.buyButtonText} tx="eventScreen.BuyText" />)}
                    {price === '0 €' && (<TraductionText style={styles.buyButtonText} tx="eventScreen.Enroll" />)}
                  </TouchableOpacity>
                ) : (
                  <View style={styles.successContainer}>
                    <Ionicons color="green" name="checkmark-circle-outline" size={32} />
                    <Text style={styles.successText}>Compra realizada correctamente</Text>
                  </View>
                )}
              </View>
              <TouchableOpacity onPress={handleOpenMaps}>
                <TraductionText style={styles.goButton} tx="eventScreen.ComoLlegar" />
              </TouchableOpacity>
            </View>
            <View style={styles.mapContainer}>
              <MapView
                initialRegion={{
                  latitude: event.lat,
                  latitudeDelta: 0.02,
                  longitude: event.long,
                  longitudeDelta: 0.02,
                }}
                style={styles.map}
              >
                <Marker
                  coordinate={{
                    latitude: event.lat,
                    longitude: event.long,
                  }}
                />
              </MapView>
            </View>
          </>
        ) : (
          <Text>Loading event...</Text>
        )}
      </View>
    </>
  );
});
