import React, {useState} from 'react';
import { Calendar } from 'react-native-calendars';
import Evento from '../evento/evento';

export default function Calendario () {

    const eventos = {
  "events": [
    {
      "participants": [],
      "_id": "64256677216e6a37786e609a",
      "adress": "carrer paralel 154",
      "dataFi": "2023-03-30T10:30:00.000Z",
      "dataIni": "2023-03-31T10:30:00.000Z",
      "denominacio": "junior",
      "descripcio": "obra de teatre",
      "horari": "08:00",
      "url": "rubitor5.com",
      "__v": 0
    },
    {
      "participants": [],
      "_id": "64256c49216e6a37786e60aa",
      "adress": "carrer paralel 154",
      "dataFi": "2023-03-30T10:30:00.000Z",
      "dataIni": "2023-03-30T10:30:00.000Z",
      "denominacio": "bresh",
      "descripcio": "disco",
      "horari": "08:00",
      "url": "rubitor5.com",
      "__v": 0
    }]}


    const [selectedDate, setSelectedDate] = useState('');
    const onDayPress = (day: any) => {
      setSelectedDate(day.dateString);
    };
    const eventDates = eventos.events.reduce((obj: any, event: any) => {
      const date = event.dataIni.split('T')[0];
      return {
        ...obj,
        [date]: {
          marked: true,
          dotColor: '#34b38a',
          selected: selectedDate === date
        }
      };
    }, {});

  return (
    <>
    <Calendar 
      markedDates={eventDates}
      onDayPress={onDayPress}
    />
    {selectedDate && eventos.events.filter((event: any) => event.dataIni.split('T')[0] === selectedDate).map((event: any) => (
      <Evento key={event._id} event={event} />
    ))}
    </>
  );
}


