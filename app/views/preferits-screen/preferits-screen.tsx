import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import type React from 'react';
import { useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';

import { Text as TraductionText, Event } from '~/components';
import type { IEvent } from '~/domain';
import { useApplicationLayer } from '~/hooks';
import type { RootParamList } from '~/navigation';

import type { PreferitsScreenProps as Props } from './preferits-screen.props';
import { PreferitsScreenStyles as styles } from './preferits-screen.styles';

type PreferitsNavigation = StackNavigationProp<RootParamList, 'PreferitsScreen'>;

export const PreferitsScreen: React.FC<Props> = observer(() => {
  const {
    controllers: { EventController, UserController },
  } = useApplicationLayer();
  const events = UserController.userInfo.preferits;
  const navigation = useNavigation<PreferitsNavigation>();

  useEffect(() => {
    UserController.fetchAllFavourites();
  }, []);

  const renderItem = ({ item }: { item: IEvent }) => {
    const handleEventClick = () => {
      navigation.navigate('EventScreen', { eventId: item.id });
    };
    return (
      <TouchableOpacity onPress={handleEventClick}>
        <Event key={item.id} event={item} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <Ionicons color="black" name="arrow-back" size={24} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <TraductionText style={styles.title} tx="preferits.titulo" />
        </View>
      </View>
      {events.length === 0 ? (
        <View style={styles.messageContainer}>
          <TraductionText style={styles.messageText} tx="preferits.error" />
        </View>
      ) : (
        <View style={styles.eventContainer}>
          <FlatList
            data={events}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </View>
      )}
    </View>
  );
});
