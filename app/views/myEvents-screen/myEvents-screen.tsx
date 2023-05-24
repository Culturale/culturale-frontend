import * as GoogleCalendar from 'expo-calendar';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';

import { Event } from '~/components';
import type { IEvent} from '~/domain';
import { useApplicationLayer } from '~/hooks';

import { MyEventsScreenStyles as styles} from './myEvents-screen.styles';

export const MyEventsScreen = observer(() => {
  const [selectedDay, setSelectedDay] = useState('');
  const {
    controllers: { UserController },
  } = useApplicationLayer();
  const eventSub: IEvent[] = UserController.userInfo.eventSub;
  console.log('eventSub', eventSub);
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
        const eventDetails: GoogleCalendar.Event = {
          alarms: [],
          allDay: false,
          availability: '',
          calendarId: defaultCalendar.id,
          endDate: event.dataFi,
          id: 'unique-event-id',
          location: event.adress,
          notes: 'Notas del evento',
          recurrenceRule: null,
          startDate: event.dataIni,
          status: '',
          timeZone: 'Europe/Madrid',
          title: event.denominacio
        };
        await GoogleCalendar.createEventAsync(defaultCalendar.id, eventDetails);
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
      {selectedDay ? (
       <ScrollView>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <TouchableOpacity key={event.id} onPress={() => handleAddToCalendar(event)}>
                <Event key={event.id} event={event} />
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noEvents}>No tienes eventos para el día seleccionado</Text>
          )}
        </ScrollView>
      ) : null}
    </View>
  );
});
