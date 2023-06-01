import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import type React from 'react';
import { useEffect, useState } from 'react';
import { Text, View, FlatList, TextInput, TouchableOpacity, StatusBar} from 'react-native';
import DatePickerModal from 'react-native-modal-datetime-picker';

import { Event } from '~/components';
import { IEvent, IUser, User } from '~/domain';
import { useApplicationLayer } from '~/hooks';

import type { SearchScreenProps as Props } from './search-screen.props';
import { SearchScreenStyles as styles } from './search-screen.styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '~/navigation';
import { useNavigation } from '@react-navigation/native';

type HomeNavigation = StackNavigationProp<RootParamList, 'Home'>;

export const SearchScreen: React.FC<Props> = observer(() => {
  const { controllers: { EventController, UserController } } = useApplicationLayer();

  // Llista de resultats a mostrar eventos/users:
  const [searchResults, setSearchResults] = useState<(IEvent | IUser)[]>([]);
  const navigation = useNavigation<HomeNavigation>();

  // CERCA DE EVENTOS SEGÚN EL FILTRO:
  // Denominación:
  const [searchText, setSearchText] = useState('');
  // Fecha Inicio:
  const [selectedStartDate, setSelectedStartDate] = useState<any>();
  // Fecha Fin:
  const [selectedEndDate, setSelectedEndDate] = useState<any>();
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
  const [showEventFilters, setEventShowFilters] = useState(false);
  const [showUserFilters, setUserShowFilters] = useState(false);
  const toggleFilters = () => {
    // de eventos:
    if (searchType === 'eventos') {
      setEventShowFilters(!showEventFilters);
    }
    // de usuarios:
    else if (searchType === 'usuarios') {
      setUserShowFilters(!showUserFilters);
    }
  };

  // Estado para controlar la visibilidad del selector de fecha:
  const [showPickerIni, setShowPickerIni] = useState(false);
  const [showPickerEnd, setShowPickerEnd] = useState(false);
  
  // Controladores del selector de fechas: --> FILTRO EVENTO:
  const showDatePickerIni = () => {
    setShowPickerIni(true);
  };
  const showDatePickerEnd = () => {
    setShowPickerEnd(true);
  };
  const handleDateChangeIni = (date: Date) => {
    const formattedStartDate = date ? format(date, 'yyyy-MM-dd') : '';
    setSelectedStartDate(formattedStartDate);
    setShowPickerIni(false);
  };
  
  const handleDateChangeEnd = (date: Date) => {
    const formattedEndDate = date ? format(date, 'yyyy-MM-dd') : '';
    setSelectedEndDate(formattedEndDate);
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

  // QUAN ES CLICA A BUSCAR
  const handleSearch = () => {
    // Si s'estan mostrant els filtres de events, es tanquen
    if (showEventFilters) {
      setEventShowFilters(!showEventFilters);
    }
    // Si s'estan mostrant els filtres d'usuaris, es tanquen
    if (showUserFilters) {
      setUserShowFilters(!showUserFilters);
    }

    // Si es busquen usuaris....
    if (searchType === 'usuarios') {
      UserController.fetchAllUsers(searchText);
      const users = UserController.users;
      setSearchResults(users);
    }
    
    // Si es busquen events....
    else if (searchType === 'eventos') {
      // Crida api
      EventController.fetchEventsByFilters(
        searchText,
        selectedCateg,
        selectedStartDate ? format(new Date(selectedStartDate), 'yyyy-MM-dd') : '1990-01-01',
        selectedEndDate ? format(new Date(selectedEndDate), 'yyyy-MM-dd') : '2090-12-12',
        searchHorari,
        priceRangeMax
      );
      // events = RESULTAT CRIDA
      const events = EventController.SearchEvents;
      setSearchResults(events);
    }
  };

  const renderResult = ({ item }: { item: IEvent | IUser }) => {
    const handleEventClick = () => {
      navigation.navigate('EventScreen', { eventId : item._id});
    };
    if (searchResults.length === 0) {
      return (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No se encontraron resultados.</Text>
        </View>
      );
    }
    else if (searchType === 'eventos') {
      return (
        <TouchableOpacity onPress={() => handleEventClick()}>
          <Event key={item._id} event={item} />
        </TouchableOpacity>
      );
    }
    else if (searchType === 'usuarios') {
      console.log(item);
      return (
        <User key={item._id} user = {item} />
      );
    }
  };

  return (
    <View>
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
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={() => handleSearch()}
          />
          <TouchableOpacity style={styles.buttonfilter} onPress={toggleFilters}>
                <Ionicons color="black" name="filter-outline" size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchTypeContainer}>
              <EventSearchButton
                selected={searchType === 'eventos'}
                onPress={() => {
                  setSearchType('eventos');
                  setUserSearch(false);
                  setSearchResults([]);
                  setUserShowFilters(false);
                }}
              />
              <UserSearchButton
                selected={searchType === 'usuarios'}
                onPress={() => {
                  setSearchType('usuarios');
                  setUserSearch(true);
                  setSearchResults([]);
                  setEventShowFilters(false);
                }}
              />
        </View>
      </View>

      {searchType === 'eventos' && showEventFilters && (
      <View style={styles.filterContainer}>
        <View style={styles.filterCategoria}>
          <Picker
          selectedValue={selectedCateg}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedCateg(itemValue)}>
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
    
        <View style={[styles.filterData]}> 
          <TouchableOpacity onPress={showDatePickerIni}>
          <Text style={[styles.filterDataText]}>
          {selectedStartDate ? `Fecha de inicio seleccionada: ${selectedStartDate}` : 'Seleccionar fecha de inicio'}
        </Text>
          </TouchableOpacity>
          <DatePickerModal
            isVisible={showPickerIni}
            mode="date"
            onCancel={() => setShowPickerIni(false)}
            onConfirm={(date: Date) => handleDateChangeIni(date)}
          />
        </View>
      
        <View style={[styles.filterData]}> 
          <TouchableOpacity onPress={showDatePickerEnd}>
          <Text style={[styles.filterDataText]}>
          {selectedEndDate ? `Fecha de fin seleccionada: ${selectedEndDate}` : 'Seleccionar fecha de fin'}
        </Text>
          </TouchableOpacity>
          <DatePickerModal
            isVisible={showPickerEnd}
            mode="date"
            onCancel={() => setShowPickerEnd(false)}
            onConfirm={(date: Date) => handleDateChangeEnd(date)}
          />
        </View>
      
        <View style={styles.filterpreu}>
          <Text>Precio máximo:</Text>
          <TextInput
            placeholderTextColor="#AAA"
            style={styles.filterTextInput}
            value={priceRangeMax}
            onChangeText={setPriceRangeMax}
            onSubmitEditing={handleSearch}
          />
        </View>
      
        <View style={styles.filterButton}>
          <TouchableOpacity onPress={handleSearch}>
            <Text style={[styles.filterButtonText]}>Aplicar filtros</Text>
          </TouchableOpacity>
        </View>
      </View>
       )}

      <View style={styles.resultContainer}>
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item._id}
          renderItem={renderResult}
        />
      </View>
    </View>
  );
});
