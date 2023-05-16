import * as GoogleCalendar from 'expo-calendar';
import { observer } from 'mobx-react-lite';
import type React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
      const date = event.dataIni.split('T')[0];
      markedDates[date] = { dots: [{ color: 'blue' }] };
    });
  
    return markedDates;
  };
  // async function handleAddToCalendar(event: IEvent) {
  //   try {
  //     const { status } = await GoogleCalendar.requestCalendarPermissionsAsync();
  //     if (status === 'granted') {
  //       const calendars = await GoogleCalendar.getCalendarsAsync();
  //       const defaultCalendar = calendars.find((calendar) => calendar.allowsModifications);
  //       if (!defaultCalendar) {
  //         return;
  //       }
  //       const eventDetails: GoogleCalendar.Event = {
  //         alarms: [],
  //         allDay: false,
  //         availability: '',
  //         calendarId: defaultCalendar.id,
  //         endDate: event.dataFi,
  //         id: 'unique-event-id',
  //         location: event.adress,
  //         notes: 'Notas del evento',
  //         recurrenceRule: null,
  //         startDate: event.dataIni,
  //         status: '',
  //         timeZone: 'Europe/Madrid',
  //         title: event.denominacio
  //       };
  //       await GoogleCalendar.createEventAsync(defaultCalendar.id, eventDetails);
  //     } 
  //   } catch (error) {
  //     // eslint-disable-next-line no-console
  //     console.log('Error al agregar el evento al calendario:', error);
  //   }
  // }
  const filteredEvents = eventSub.filter((event) => event.dataIni.split('T')[0] === selectedDay);
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
        <View>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <TouchableOpacity key={event.id} onPress={()=>(event)}>
                <Event key={event.id} event={event} />
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noEvents}>No tienes eventos para el día seleccionado</Text>
          )}
        </View>
      ) : null}
    </View>
  );
});
