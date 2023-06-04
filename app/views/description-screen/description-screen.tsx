import { Ionicons } from '@expo/vector-icons';
import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import type React from 'react';
import { View, Text, TouchableOpacity, ScrollView} from 'react-native';

import type { RootParamList } from '~/navigation';

import type { DescriptionScreenProps as Props } from './description-screen.props';
import { styles } from './description-screen.styles';

type DescriptionNavigation = StackNavigationProp<RootParamList, 'DescriptionScreen'>;


export const DescriptionScreen: React.FC<Props> = observer(() => {
  const { params } = useRoute<RouteProp<RootParamList, 'DescriptionScreen'>>();
  const description = params.description;
  const eventId = params.eventId;
  const navigation = useNavigation<DescriptionNavigation>();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.backArrow}>
        <TouchableOpacity onPress={() => navigation.navigate('EventScreen', {eventId: eventId})}>
          <Ionicons color="black" name="arrow-back" size={24} />
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>{description}</Text>
    </ScrollView>
  );
});
