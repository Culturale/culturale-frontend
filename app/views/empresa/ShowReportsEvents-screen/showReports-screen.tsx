import { observer } from 'mobx-react-lite';
import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';

import {Review } from '~/components';
import type { IReview } from '~/domain';
import { useApplicationLayer } from '~/hooks';

import { ShowReportsScreenStyles as styles } from './showReports-screen.styles';

export const ShowReportsScreen = observer(() => {
  const { controllers } = useApplicationLayer();
  const { EventController } = controllers;

  const [results, setResults] = useState<IReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchResults = async () => {
    setIsLoading(true);
    await EventController.getReviewsReport();
    const reviews = EventController.EventsReviewReport;
    setResults(reviews);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Informes reviews</Text>
      </View>

      {/* Renderiza los resultados */}
      <ScrollView style={styles.resultsContainer}>
        {results.map((review) => (
          <TouchableOpacity key={review._id} onPress={() => onPress(review)}>
            <Review review={review} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
});
