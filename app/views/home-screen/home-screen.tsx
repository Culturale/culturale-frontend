import { observer } from 'mobx-react-lite';
import type React from 'react';
import { useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Event } from '~/components';
import { useApplicationLayer } from '~/hooks';

import type { HomeScreenProps as Props } from './home-screen.props';
import { HomeScreenStyles as styles } from './home-screen.styles';

export const HomeScreen: React.FC<Props> = observer(() => {
  const {
    controllers: { EventController },
  } = useApplicationLayer();
  const events = EventController.events;
  console.log(events);

  useEffect(() => {
    EventController.fetchAllEvents();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <Event key={item.id} event={item} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Inicio</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.subTitle}>Cerca de ti</Text>
        </View>
        <View style={styles.hoyContainer}>
          <Text style={styles.subTitle}>Hoy</Text>
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
