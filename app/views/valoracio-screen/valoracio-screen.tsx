import { Ionicons } from '@expo/vector-icons';
import type { RouteProp} from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import  React, {useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import type { IEvent } from '~/domain';
import { useApplicationLayer } from '~/hooks';
import type { RootParamList } from '~/navigation';

import {ValoracioScreenStyles as styles} from './valoracio-screen.styles';

type ValoracioScreenNavigation = StackNavigationProp<RootParamList, 'ValoracioScreen'>;


export const ValoracioScreen = observer(() => {

    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const navigation = useNavigation<ValoracioScreenNavigation>();
    const { params } = useRoute<RouteProp<RootParamList, 'ValoracioScreen'>>();
    const event: IEvent = params.event;
    const {
      controllers: { EventController, UserController },
    } = useApplicationLayer();
    
    const handleCommentChange = (text) => {
        setComment(text);
      };

    const handleStarPress = (value) => {
    if (rating === value) {
        setRating(0);
    } else {
        setRating(value);
    }
    };
    const handleSubmit = () => {
      
      // eslint-disable-next-line no-console
      console.log('Valoración:', rating);
      // eslint-disable-next-line no-console
      console.log('Comentario:', comment);
      const userId = UserController.userInfo._id;
      EventController.addReview(event._id, userId, rating, comment);
      navigation.navigate('MyEventsScreen');
    };

  return (
    <>
    <View style={styles.backArrow}>
          <TouchableOpacity onPress={() => navigation.navigate('MyEventsScreen')}>
              <Ionicons color="black" name="arrow-back" size={24} />
            </TouchableOpacity>
        </View>
    <View style={styles.ratingPage}>
      <Text style={styles.heading}>Nueva valoración</Text>
      <Text style={styles.subtitle}>{event.denominacio}</Text>

      <View style={styles.ratingStars}>
        {[1, 2, 3, 4, 5].map((value) => (
            <TouchableOpacity
            key={value}
            onPress={() => handleStarPress(value)}
            >
            <Text 
            style={[styles.star, value <= rating ? styles.filledStar : null]}>&#9733;</Text>
            </TouchableOpacity>
        ))}
      </View>
      <TextInput
        multiline
        placeholder="Comparte detalles de tu experiencia en este evento"
        style={styles.commentInput}
        value={comment}
        onChangeText={handleCommentChange}
      />
      <TouchableOpacity disabled={rating === 0} style={[
    styles.submitButton,
    (rating === 0) && styles.disabledButton
    ]} onPress={handleSubmit}>
        <Text  style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
    </>
  );
});
