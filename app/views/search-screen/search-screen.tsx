import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import type React from 'react';
import { useEffect, useState } from 'react';
import { Text, View, FlatList, TextInput, TouchableOpacity, Button, StatusBar} from 'react-native';
import DatePickerModal from 'react-native-modal-datetime-picker';

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
  // Precio:
  const [priceRangeMax, setPriceRangeMax] = useState('');
  // Categoria:
  const [selectedCateg, setSelectedCateg] = useState('');
  // Horari:
  const [searchHorari, setSearchHorari] = useState('');

  // Para saber si quieren buscar usuarios o eventos:
  const [searchType, setSearchType] = useState<'usuarios' | 'eventos'>('eventos');
  // Para mostrar en el input, buscar usuario/evento:
  const [userSearch, setUserSearch] = useState(false);

  // Estado para controlar la visibilidad del menú de filtros
  const [showFilters, setShowFilters] = useState(false);
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Estado para controlar la visibilidad del selector de fecha:
  const [showPickerIni, setShowPickerIni] = useState(false);
  const [showPickerEnd, setShowPickerEnd] = useState(false);
  
  // Controladores del selector de fechas:
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
      EventController.fetchEventsByFilters(searchText, selectedCateg, formattedStartDate, formattedEndDate, searchHorari, priceRangeMax);
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
    }
    else if (searchType === 'eventos') {
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
            style={styles.inputText}
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={() => handleSearch()}
          />
        </View>

        <TouchableOpacity onPress={toggleFilters}>
              <Ionicons color="black" name="filter-outline" size={24} />
        </TouchableOpacity>

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
      {showFilters && (
        <View style={styles.filterContainer}>
        <View style={styles.filter}>
          <Text>Categoría:</Text>
          <Picker style={styles.filter} selectedValue={selectedCateg} onValueChange={setSelectedCateg}>
            <Picker.Item label="Todas las categorías" value="" />
            <Picker.Item label="Actividades virtuales" value="agenda:categories/activitats-virtuals" />
            <Picker.Item label="Exposiciones" value="agenda:categories/exposicions" />
            <Picker.Item label="Teatro" value="agenda:categories/teatre" />
            <Picker.Item label="Festivales y muestras" value="agenda:categories/festivals-i-mostres" />
            <Picker.Item label="Rutas y visitas" value="agenda:categories/rutes-i-visites" />
            <Picker.Item label="Infantil" value="agenda:categories/infantil" />
            <Picker.Item label="Fiestas" value="agenda:categories/festes" />
            <Picker.Item label="Conferencias" value="agenda:categories/conferencies" />
            <Picker.Item label="Ferias y mercados" value="agenda:categories/fires-i-mercats" />
            <Picker.Item label="Danza y baile" value="agenda:categories/dansa" />
            <Picker.Item label="Ciclos" value="agenda:categories/cicles" />
          </Picker>
        </View>
      
        <View style={styles.filter}>
          <Button title="Fecha de inicio" onPress={showDatePickerIni} />
          <DatePickerModal
            isVisible={showPickerIni}
            mode="date"
            onCancel={() => setShowPickerIni(false)}
            onConfirm={(date: Date) => handleDateChangeIni(date)}
          />
        </View>
      
        <View style={styles.filter}>
          <Button title="Fecha de fin" onPress={showDatePickerEnd} />
          <DatePickerModal
            isVisible={showPickerEnd}
            mode="date"
            onCancel={() => setShowPickerEnd(false)}
            onConfirm={(date: Date) => handleDateChangeEnd(date)}
          />
        </View>
      
        <View style={styles.filter}>
          <Text>Precio máximo:</Text>
          <TextInput
            placeholderTextColor="#AAA"
            style={styles.filterTextInput}
            value={priceRangeMax}
            onChangeText={setPriceRangeMax}
            onSubmitEditing={handleSearch}
          />
        </View>
      
        <View style={styles.filter}>
          <TouchableOpacity onPress={handleSearch} style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Aplicar filtros</Text>
          </TouchableOpacity>
        </View>
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
