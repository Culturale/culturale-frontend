import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import type { IReview } from '~/domain';

interface Props {
  review: IReview;
  onPress?: () => void;
}

export const Review: React.FC<Props> = ({ review, onPress }) => {
  const commentText = review.comment ? review.comment : 'Sin comentarios';

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Text style={styles.title}>Review: {review._id}</Text>
        
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Id author:</Text>
          <Text style={styles.valor}> {review.authorId}</Text>
        </View>

        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Id evento:</Text>
          <Text style={styles.valor}> {review.eventId}</Text>
        </View>

        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Puntuacion:</Text>
          <Text style={styles.valor}> {review.puntuation}</Text>
        </View>

        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Comentario:</Text>
          <Text style={styles.valor}> {commentText}</Text>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderColor: 'pink',
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    margin: 5
  },

  details: {
    flex: 1,
    padding: 5,
  },
  
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    marginLeft: 10,
  },
  subtitleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 4,
  },
  subtitle: {
    color: '#000',
    fontSize: 10,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  valor: {
    color: '#000',
    fontSize: 10,
  },
  puntuation: {
    color: '#888',
    fontSize: 14,
  },
});
