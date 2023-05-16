import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import type React from 'react';
import { Image, Linking, Platform, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { Text as TraductionText } from '~/components';
import type { RootParamList } from '~/navigation';

import type { EventScreenProps as Props } from './event-screen.props';
import { EventScreenStyles as styles } from './event-screen.styles';

type EventScreenNavigation = StackNavigationProp<RootParamList, 'EditProfile'>;

export const EventScreen: React.FC<Props> = observer((props: Props) => {
    const { event } = props.route.params;
    const handleOpenMaps = () => {
      const { lat, long } = event;
      const scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
      const url = `${scheme}${lat},${long}`;
      Linking.openURL(url);
    };
    console.log(event.photo);
    const navigation = useNavigation<EventScreenNavigation>();
    return (
      <>
        <View style={styles.backArrow}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
              <Ionicons color="black" name="arrow-back" size={24} />
            </TouchableOpacity>
        </View>
        <View style={styles.container}> 
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{event.denominacio}</Text>
          </View>
          <View style={{flexDirection:'row', gap: 10, marginTop: 10}}>
          <Image source={{ uri: event.photo ? event.photo : 'https://archive.org/download/no-photo-available/no-photo-available.png'}} style={styles.photo}/>
          <View style={{flexDirection:'column'}}>
          <View style={styles.subtitleContainer}>
          <Ionicons color="#888" name="location-outline" size={16} />
          <Text style={styles.subtitle}>{event.adress}</Text>
          </View>
          <View style={styles.subtitleContainer}>
          <Ionicons color="#888" name="calendar-outline" size={16} />
          <Text style={styles.subtitle}>{event.dataIni.toLocaleDateString()}</Text>
          </View>
          <Text style={styles.description}>{event.descripcio}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(event.url)}>
            <TraductionText style={styles.goButton} tx='eventScreen.information'/>
          </TouchableOpacity>
          </View>
          </View>
          {/* <Image source={{ uri:'https://static.mfah.com/images/main-campus-18.15829485354753099698.jpg?width=1680'}} style={styles.photo}/> */}
          <View style={styles.priceContainer}>
            <View style={{flexDirection:'column', gap: 10, justifyContent: 'flex-end', marginTop: 10}}>
              <Text style={styles.price}>22,10€</Text>
              <TouchableOpacity style={styles.buyButton}>
                <TraductionText style={styles.buyButtonText} tx='eventScreen.BuyText'/>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleOpenMaps}>
              <TraductionText style={styles.goButton} tx='eventScreen.ComoLlegar'/>
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
        </View>
       </>
    );
});

