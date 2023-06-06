import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Text, View, Button, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';


import { useApplicationLayer } from '~/hooks';

import { NewEventScreenStyles as Styles } from './newEvent-screen.styles';
import { TimePicker } from './timePicker';
import { CategoryPicker } from './categoriaPicker';

export const NewEventScreen = observer(() => {
  const {
    controllers: { EventController },
  } = useApplicationLayer();
  const [denominacio, setDenominacio] = useState('');
  const [descripcio, setDescripcio] = useState('');
  const [codi, setCodi] = useState();

  const [preu, setPreu] = useState('');
  const [dataIni, setDataIni] = useState(null);
  const [dataFi, setDataEnd] = useState(null);
  const [adress, setAdress] = useState(null);
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [url, setUrl] = useState();
  const [categoria, setCategoria] = useState();

  const [showPopup, setShowPopup] = useState(false);

  const [horaIni, setHoraIni] = useState(null);
  const [horaFin, setHoraFin] = useState(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDateEndPicker, setShowDateEndPicker] = useState(false);

  useEffect(() => {
    EventController.getReviewsReport();
  }, []);

  const handleDateChange = (date: Date) => {
    setDataIni(date);
  };
  const handleDateEndChange = (date: Date) => {
    setDataEnd(date);
  };

  const handleCreateEvent = () => {
    EventController.createEvent(codi, denominacio, descripcio, preu, dataIni, dataFi, adress, lat, long, url, categoria, horaIni, horaFin);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      setDenominacio('');
      setDescripcio('');
      setCodi(null);
      setPreu('');
      setDataIni(null);
      setDataEnd(null);
      setAdress(null);
      setLat(null);
      setLong(null);
      setUrl(null);
      setCategoria(null);
      setHoraIni(null);
      setHoraFin(null);
      setShowDatePicker(false);
      setShowDateEndPicker(false);
    }, 2000);
  };

  return (
    <ScrollView style={Styles.container}>
      <View style={Styles.titleContainer}>
        <Text style={Styles.title}>Crear evento</Text>
      </View>
      <TextInput
        placeholder="Denominació"
        style={Styles.input}
        value={denominacio}
        onChangeText={setDenominacio}
      />
      <TextInput
        placeholder="Descripció"
        style={Styles.input}
        value={descripcio}
        onChangeText={setDescripcio}
      />
      <TextInput
        placeholder="Preu"
        style={Styles.input}
        value={preu}
        onChangeText={setPreu}
      />
      <TextInput
        placeholder="Codi"
        style={Styles.input}
        value={codi}
        onChangeText={setCodi}
        keyboardType="numeric" 
      />
       <TextInput
        placeholder="Adreça"
        style={Styles.input}
        value={adress}
        onChangeText={setAdress}
      />
       <TextInput
        placeholder="Latitiud"
        style={Styles.input}
        value={lat}
        onChangeText={setLat}
        keyboardType="numeric" 
      />
       <TextInput
        placeholder="Longitud"
        style={Styles.input}
        value={long}
        onChangeText={setLong}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Url"
        style={Styles.input}
        value={url}
        onChangeText={setUrl}
      />
      <View style={Styles.dateOps}>
        <TouchableOpacity onPress={() => setShowDatePicker(!showDatePicker)}>
          <Text style={Styles.dataIni}>
              Fecha Inicio
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <CalendarPicker
            containerStyle={{ width: 150 }} // Ancho personalizado del calendario
            customDatesStyles={[
              {
                date: new Date(), 
                style: { backgroundColor: 'pink' },
                textStyle: { color: 'white' },
              },
            ]}
            selectedDayColor="pink" // Color de fondo del día seleccionado
            selectedDayTextColor="white" // Color del texto del día seleccionado
            textStyle={{ color: 'black' }} // Color del texto en el calendario
            todayBackgroundColor="pink" // Color de fondo del día actual
            onDateChange={handleDateChange}
          />
        )}
      </View>
      <Modal visible={showPopup} transparent>
        <View style={Styles.popupContainer}>
          <View style={Styles.popup}>
            <Text style={Styles.popupText}>Evento creado!</Text>
            <Text style={Styles.popupTick}>✔</Text>
          </View>
        </View>
      </Modal>
      <View style={Styles.dateOps}>
        <TouchableOpacity onPress={() => setShowDateEndPicker(!showDateEndPicker)}>
          <Text style={Styles.dataIni}>
              Fecha Fin
          </Text>
        </TouchableOpacity>
        {showDateEndPicker && (
          <CalendarPicker
            containerStyle={{ width: 150 }} // Ancho personalizado del calendario
            customDatesStyles={[
              {
                date: new Date(), 
                style: { backgroundColor: 'pink' },
                textStyle: { color: 'white' },
              },
            ]}
            selectedDayColor="pink" // Color de fondo del día seleccionado
            selectedDayTextColor="white" // Color del texto del día seleccionado
            textStyle={{ color: 'black' }} // Color del texto en el calendario
            todayBackgroundColor="white" // Color de fondo del día actual
            onDateChange={handleDateEndChange}
          />
        )}
        <View style={Styles.dateOps}>
        <Text>Hora de inicio:</Text>
          <TimePicker
            options={['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']}
            selectedTime={horaIni}
            onSelect={setHoraIni}
          />
        </View>
        <View style={Styles.dateOpsEnd}>
          <Text>Hora de fin:</Text>
          <TimePicker
            options={['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']}
            selectedTime={horaFin}
            onSelect={setHoraFin}
          />
        </View>
        <View>
          <CategoryPicker selectedCategory={categoria} onSelectCategory={setCategoria} />
        </View>
      <View style={Styles.buttonSub}>
      <Button color="#D39FD5" title="Crear evento" onPress={handleCreateEvent}/>
      </View>
      </View>
    </ScrollView>
  );
});
