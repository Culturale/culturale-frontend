import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import * as GoogleCalendar from 'expo-calendar';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity , Linking } from 'react-native';
import { Calendar } from 'react-native-calendars';

import { Text  as CustomText } from '~/components';
import type { IEvent } from '~/domain';
import { useApplicationLayer } from '~/hooks';
import { useLanguageContext  } from '~/hooks/use-language/use-language';
import type { RootParamList } from '~/navigation';

import { MyEventsScreenStyles as styles} from './myEvents-screen.styles';

type MyEventsNavigation = StackNavigationProp<RootParamList, 'MyEventsScreen'>;


export const MyEventsScreen = observer(() => {
  const navigation = useNavigation<MyEventsNavigation>();

  
  const [selectedDay, setSelectedDay] = useState('');
  const {
    controllers: { UserController },
  } = useApplicationLayer();
  const eventSub: IEvent[] = UserController.userInfo.eventSub;
  const handleDayPress = (day) => {
    setSelectedDay(day.dateString);
  };
  const { language } = useLanguageContext();  

  useEffect((() => {}), [language]);
  
  
  const getMarkedDates = (events: IEvent[]) => {
    const markedDates = {};
    events.forEach((event) => {
      // const eventDate = event.dataIni.toISOString().split('T')[0];
      const eventDate = new Date(event.dataIni);
      markedDates[eventDate.toISOString().split('T')[0]] = { dots: [{ color: 'blue' }] };
    });
  
    return markedDates;
  };
  const actDate = new Date().toISOString().split('T')[0];

  async function handleAddToCalendar(event: IEvent) {
    try {
      const { status } = await GoogleCalendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await GoogleCalendar.getCalendarsAsync();
        const defaultCalendar = calendars.find((calendar) => calendar.allowsModifications);
        if (!defaultCalendar) {
          return;
        }
  
        const eventDetails = {
          endDate: event.dataIni.toISOString(),
          notes: 'description22',
          startDate: event.dataIni.toISOString(),
          title: event.denominacio,
        };
  
        const eventOptions = {
          endDate: eventDetails.endDate,
          notes: eventDetails.notes,
          startDate: eventDetails.startDate,
          title: eventDetails.title,
        };
  
        const eventId = await GoogleCalendar.createEventAsync(defaultCalendar.id, eventOptions);

        // Obtener el enlace para abrir la aplicación de Google Calendar con el evento
        const eventUrl = `https://www.google.com/calendar/event?eid=${eventId}`;
        Linking.openURL(eventUrl);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error al agregar el evento al calendario:', error);
    }
  }
  function handleAddReview(event: IEvent){
    // eslint-disable-next-line no-console
    navigation.navigate('ValoracioScreen', { event : event });
  }
  const filteredEvents = eventSub.filter((event) => { 
    // const eventDate = event?.dataIni.toISOString().split('T')[0];
    const eventDate = new Date(event.dataIni);
    return eventDate.toISOString().split('T')[0] === selectedDay;
  });


  return (
    <View>
      <View style={styles.titleContainer}>
        <CustomText style={styles.titleMyEvents} tx="myEvents.inicio"/>
      </View>
      <Calendar
        current={selectedDay}
        markedDates={{
          ...getMarkedDates(eventSub),
          [selectedDay]: { dots: [{ color: 'green', selected: true }] },
        }}
        markingType="multi-dot"
        onDayPress={handleDayPress}
      />
      {selectedDay && (
        <ScrollView>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <View key={event.id} style={styles.eventList}>
                <View style={styles.eventDetail}>
                <View style={styles.container}>
                  <View style={styles.firstContent}>
                    <View style={styles.details}>
                      <Text style={styles.title}>{event.denominacio}</Text>
                      <View style={styles.subtitleContainer}>
                        <Text style={styles.subtitle}>{event.adress}</Text>
                      </View>
                      <View style={styles.subtitleContainer}>
                        <Ionicons color="#888" name="calendar-outline" size={16} />
                        <Text style={styles.subtitle}>{new Date(event.dataIni).toLocaleDateString()}</Text>
                      </View>
                    </View>
                    <Image source={{ uri: event.photo ? event.photo : 'https://archive.org/download/no-photo-available/no-photo-available.png'}} style={{alignSelf: 'flex-end', borderRadius: 5,height: 100, marginBottom: 15, width: 100}}/>
                  </View>
                  {actDate <= new Date(event.dataIni).toISOString().split('T')[0] ? 
                  <TouchableOpacity style={styles.buttonAdd} onPress={() => handleAddToCalendar(event)}>
                      <View style={styles.buttonContent}>
                          <CustomText style={styles.buttonText} tx="myEvents.calendar"/> 
                      </View>
                  </TouchableOpacity>:
                  <TouchableOpacity style={styles.buttonAddVal} onPress={() => handleAddReview(event)}>
                    <View style={styles.buttonContent}>
                        <CustomText style={styles.buttonText} tx="myEvents.valoration"/>
                    </View>
                  </TouchableOpacity>
                  }
                  </View>
                </View>
              </View>
            ))
          ) : (
            <CustomText style={styles.noEvents} tx="myEvents.noEvents"/>
          )}
        </ScrollView>
      )}
    </View>
  );
});
