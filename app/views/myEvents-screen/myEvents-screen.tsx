import * as GoogleCalendar from 'expo-calendar';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { View, Text, ScrollView, Button, TouchableOpacity , Linking } from 'react-native';
import { Calendar } from 'react-native-calendars';

import { Event } from '~/components';
import type { IEvent } from '~/domain';
import { useApplicationLayer } from '~/hooks';

import { MyEventsScreenStyles as styles} from './myEvents-screen.styles';

export const MyEventsScreen = observer(() => {
  const [selectedDay, setSelectedDay] = useState('');
  const {
    controllers: { UserController },
  } = useApplicationLayer();
  const eventSub: IEvent[] = UserController.userInfo.eventSub;
  const handleDayPress = (day) => {
    setSelectedDay(day.dateString);
  };
  
  
  const getMarkedDates = (events: IEvent[]) => {
    const markedDates = {};
    events.forEach((event) => {
      const eventDate = event.dataIni.toISOString().split('T')[0];
      markedDates[eventDate] = { dots: [{ color: 'blue' }] };
    });
  
    return markedDates;
  };
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

        // Abrir la aplicación de Google Calendar
        setTimeout(() => {
          Linking.openURL(eventUrl);
        }, 0);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error al agregar el evento al calendario:', error);
    }
  }
  const filteredEvents = eventSub.filter((event) => { 
    const eventDate = event?.dataIni.toISOString().split('T')[0];
    return eventDate === selectedDay;
  });

  return (
    <View>
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
                <TouchableOpacity style={styles.buttonAdd} onPress={() => handleAddToCalendar(event)}>
                <View style={styles.buttonContent}>
                  <Text style={styles.buttonText}>+</Text>
                </View>
                </TouchableOpacity>
                <View style={styles.eventDetail}>
                  <Event event={event} />
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noEvents}>No tienes eventos para el día seleccionado</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
});
