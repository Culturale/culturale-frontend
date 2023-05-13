import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import type React from 'react';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';

import type { RootParamList } from '~/navigation';

import type { EventScreenProps as Props } from './event-screen.props';
import { EventScreenStyles as styles } from './event-screen.styles';

type EventScreenNavigation = StackNavigationProp<RootParamList, 'EditProfile'>;

export const EventScreen: React.FC<Props> = observer((props: Props) => {
    const { event } = props.route.params;
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
            <Text style={[styles.description, { color: 'blue' }]}>+ Información</Text>
          </TouchableOpacity>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>22,10€</Text>
            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Comprar</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.reviewContainer}>
            <Text style={styles.reviewTitle}>Reviews</Text>
            <View style={styles.starContainer}>
              <Image source={require('../../assets/filled-star--v1.png')} style={styles.star} />
              <Image source={require('../../assets/filled-star--v1.png')} style={styles.star} />
              <Image source={require('../../assets/filled-star--v1.png')} style={styles.star} />
              <Image source={require('../../assets/filled-star--v1.png')} style={styles.star} />
              <Image source={require('../../assets/descarga.png')} style={styles.star} />
            </View>
          </View> */}
          {/* <View style={styles.reviewDetailsContainer}>
            <View style={styles.reviewCont}>
              <View>
                <Text style={styles.reviewDetailsTitle}>"¡Excelente!"</Text>
                <Text style={styles.reviewDetailsAuthor}>Juan Pérez</Text>
                <View style={{ flexDirection: 'column'}}>
                  <Text style={styles.reviewDetailsRating}>4/5</Text>
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.reviewDetailsDescription}>
                      "Excelente producto, buena calidad y precio justo."
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View> */}
        </View>
       </>
    );
});

