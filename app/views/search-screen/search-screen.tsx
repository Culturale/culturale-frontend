import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import type React from 'react';
import { useEffect, useState } from 'react';
import { Text, View, FlatList, TextInput, TouchableOpacity, Button, StatusBar } from 'react-native';
import DatePickerModal from 'react-native-modal-datetime-picker';
import Slider from 'react-native-slider';

import { Event } from '~/components';
import type { IEvent, IUser } from '~/domain';
import { useApplicationLayer } from '~/hooks';

import type { SearchScreenProps as Props } from './search-screen.props';
import { SearchScreenStyles as styles } from './search-screen.styles';

export const SearchScreen: React.FC<Props> = observer(() => {
  const { controllers: { EventController } } = useApplicationLayer();

  // Lista de resultados a mostrar:
  const [searchResults, setSearchResults] = useState<IEvent[]>([]);

  // CERCA DE EVENTOS SEGÚN EL FILTRO:
  // Denominación:
  const [searchText, setSearchText] = useState('');
  // Fecha Inicio:
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  // Fecha Fin:
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  // Descripción:
  const [searchDescription, setSearchDescription] = useState('');
  // Precio:
  const [priceRangeMax, setPriceRangeMax] = useState('');

  // Para saber si quieren buscar usuarios o eventos:
  const [searchType, setSearchType] = useState<'usuarios' | 'eventos'>('eventos');
  // Para mostrar en el input, buscar usuario/evento:
  const [userSearch, setUserSearch] = useState(false);

  // Estado para controlar la visibilidad del menú de filtros
  const [showFilters, setShowFilters] = useState(false);
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const [showPickerIni, setShowPickerIni] = useState(false);
  const [showPickerEnd, setShowPickerEnd] = useState(false);

  const showDatePickerIni = () => {
    setShowPickerIni(true);
  };

  const handleDateChangeIni = (date: Date) => {
    setSelectedStartDate(date);
    setShowPickerIni(false);
  };

  const showDatePickerEnd = () => {
    setShowPickerEnd(true);
  };

  const handleDateChangeEnd = (date: Date) => {
    setSelectedEndDate(date);
    setShowPickerEnd(false);
  };

  const UserSearchButton = ({ selected, onPress }: { selected: boolean; onPress: () => void }) => {
    return (
      <TouchableOpacity
        style={[
          styles.searchButton,
          styles.userSearchButton,
          selected && styles.selectedButton,
        ]}
        onPress={() => {
          onPress();
        }}
      >
        <Ionicons color={selected ? '#fff' : '#333'} name="person-outline" size={24} />
        <Text style={[styles.buttonText, selected && styles.selectedText]}> Usuarios</Text>
      </TouchableOpacity>
    );
  };

  const EventSearchButton = ({ selected, onPress }: { selected: boolean; onPress: () => void }) => {
    return (
      <TouchableOpacity
        style={[
          styles.searchButton,
          styles.eventSearchButton,
          selected && styles.selectedButton,
        ]}
        onPress={() => {
          onPress();
        }}
      >
        <Ionicons color={selected ? '#fff' : '#333'} name="calendar-outline" size={24} />
        <Text style={[styles.buttonText, selected && styles.selectedText]}> Eventos</Text>
      </TouchableOpacity>
    );
  };

  const handleSearch = () => {
    if (searchType === 'usuarios') {
      // Realizar búsqueda de usuarios
    } else if (searchType === 'eventos') {
      const formattedStartDate = selectedStartDate ? format(selectedStartDate, 'yyyy-MM-dd') : '';
      const formattedEndDate = selectedEndDate ? format(selectedEndDate, 'yyyy-MM-dd') : '';

      EventController.fetchEventsByFilters(searchText, searchDescription, formattedStartDate, formattedEndDate, searchDescription, priceRangeMax);

      const events = EventController.SearchEvents;
      setSearchResults(events);
    }
  };

  const renderResult = ({ item }: { item: IEvent }) => {
    if (searchResults.length === 0) {
      return (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No se encontraron resultados.</Text>
        </View>
      );
    } else if (searchType === 'eventos') {
      
      return (
        
          <Event key={item.id} event={item} />
        
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Búsqueda</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchTextContainer}>
          <Ionicons color="#aaa" name="search" size={24} style={styles.searchIcon} />
          <TextInput
            placeholder={`Buscar ${userSearch ? 'usuarios por username' : 'eventos por denominación'}`}
            placeholderTextColor="#aaa"
            style={styles.input}
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={() => handleSearch()}
          />
        </View>
        <View style={styles.searchTypeContainer}>
          <EventSearchButton
            selected={searchType === 'eventos'}
            onPress={() => {
              setSearchType('eventos');
              setUserSearch(false);
              setSearchResults([]);
            }}
          />
          <UserSearchButton
            selected={searchType === 'usuarios'}
            onPress={() => {
              setSearchType('usuarios');
              setUserSearch(true);
              setSearchResults([]);
            }}
          />
        </View>
      </View>
      <TouchableOpacity onPress={toggleFilters}>
        <Ionicons color="black" name="filter-outline" size={24} />
      </TouchableOpacity>
      {showFilters && (<View style={styles.filter}>
        <Button title="Seleccionar fecha de inicio" onPress={showDatePickerIni} />
        <DatePickerModal
          isVisible={showPickerIni}
          mode="date"
          onCancel={() => setShowPickerIni(false)}
          onConfirm={(date: Date) => handleDateChangeIni(date)}
        />
        <Button title="Seleccionar fecha de fin" onPress={showDatePickerEnd} />
        <DatePickerModal
          isVisible={showPickerEnd}
          mode="date"
          onCancel={() => setShowPickerEnd(false)}
          onConfirm={(date: Date) => handleDateChangeEnd(date)}
        />

        <Text>Precio máximo:</Text>
        <TextInput
          placeholderTextColor="#aaa"
          style={styles.input}
          value={priceRangeMax}
          onChangeText={setPriceRangeMax}
          onSubmitEditing={() => handleSearch()}
        />

        <TouchableOpacity onPress={handleSearch}>
          <Text>Aplicar filtros</Text>
        </TouchableOpacity>
      </View>
       )}
      <View style={styles.resultContainer}>
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={renderResult}
        />
      </View>
    </View>
  );
});
