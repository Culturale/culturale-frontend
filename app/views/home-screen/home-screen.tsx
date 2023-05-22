import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import type React from 'react';
import { useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity} from 'react-native';

import { Text as TraductionText , Event } from '~/components';
import type { IEvent } from '~/domain';
import {  useApplicationLayer } from '~/hooks';
import type { RootParamList } from '~/navigation';

import type { HomeScreenProps as Props } from './home-screen.props';
import { HomeScreenStyles as styles } from './home-screen.styles';

type HomeNavigation = StackNavigationProp<RootParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = observer(() => {
  const {
    controllers: { EventController, UserController },
  } = useApplicationLayer();
  const events = EventController.events;
  const navigation = useNavigation<HomeNavigation>();

  useEffect(() => {
    EventController.fetchAllEvents();
  }, []);

  const renderItem = ({ item }: { item: IEvent }) => {
    const handleEventClick = () => {
      navigation.navigate('EventScreen', { eventId : item.id });
    };
    return (
      <TouchableOpacity onPress={handleEventClick}>
        <Event key={item.id} event={item} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TraductionText style={styles.title} tx="home.inicio"/>
      </View>
      <View style={styles.bottomContainer}>
        <View>
          <TraductionText style={styles.subTitle} tx="home.near"/>
        </View>
        <View style={styles.hoyContainer}>
          <TraductionText style={styles.subTitle} tx="home.today"/>
          <Ionicons color="black" name="filter-outline" size={24} />
        </View>
      </View>
      <View style={styles.eventContainer}>
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
});
