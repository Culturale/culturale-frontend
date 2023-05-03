import axios, { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Evento from '../components/evento/evento';
import Usuario from '../components/user/user';
import qs from 'qs';

interface Event {
    _id: string;
    denominacio: string;
    adress: string;
    dataIni: string;
}
interface User {
    _id: string;
    username: string;
    name: string;
    telefon: string;
    numFollowers: number;
}

const SearchScreen = () => {
  //Text que introdueix l'usuari per a buscar:
  const [searchText, setSearchText] = useState('');
  //Llista de resultats a mostrar:
  const [searchResults, setSearchResults] = useState<User[] | Event[]>([]);
  //Per saber si volen buscar usuaris o events:
  const [searchType, setSearchType] = useState(null);
  //Per que surti al input, buscar usuari/evento:
  const [userSearch, setUserSearch] = useState(false);

  const UserSearchButton = ({ selected, onPress }) => {
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
        <Ionicons name="person-outline" size={24} color={selected ? '#fff' : '#333'} />
        <Text style={[styles.buttonText, selected && styles.selectedText]}> Usuarios</Text>
      </TouchableOpacity>
    );
  };
  
  const EventSearchButton = ({ selected, onPress }) => {
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
        <Ionicons name="calendar-outline" size={24} color={selected ? '#fff' : '#333'} />
        <Text style={[styles.buttonText, selected && styles.selectedText]}> Eventos</Text>
      </TouchableOpacity>
    );
  };

  //URL del servidor
  const SERVER_URL = 'http://192.168.8.101:8080';

  const handleSearch = () => {
    if (searchType === 'usuarios') {
        const params = {
          username: searchText
        };
        console.log('HOLA1');
        axios.get(`${SERVER_URL}/users/username`, { params: qs.stringify(params) })
        .then(response => {
            //AQUI PETA
            console.log('HOLA2');
          const modifiedUsers = response.data.user.map((user: User, index: number) => {
            console.log('HOLA3');
            user._id = (index + 1).toString();
            return user;
          })
          setSearchResults(modifiedUsers);
        })
        .catch(error => {
            console.log(error);
        });
    }      
    else if (searchType === 'eventos') {
        axios.get(`${SERVER_URL}/events/denominacio/${searchText}`)
        .then(response => {
          const modifiedEvents = response.data.event.map((event: Event, index: number) => {
              event._id = (index + 1).toString();
              return event;
          });
          setSearchResults(modifiedEvents);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const renderResult = ({ item } : {item: any}) =>{
    if (searchType === 'usuarios') {
        return (
            <Usuario
                user={{
                    username: item.username,
                    name: item.name,
                    telefon: item.telefon,
                    numFollowers: item.numFollowers
                }}
            />
        );
    }
    else if (searchType === 'eventos') {
        return (
            <Evento
                event={{
                adress: item.adress,
                dataIni: item.dataIni,
                denominacio: item.denominacio
            }}
        />
        );
    }
    else console.log('HOLA');
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#aaa" style={styles.searchIcon} />
        <TextInput
            style={styles.input}
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={() => handleSearch(searchText)}
            placeholder={`Buscar ${userSearch ? 'usuarios por username' : 'eventos por categoria'}`}
            placeholderTextColor="#aaa"
            userSearch={userSearch}
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

      <FlatList
        data={searchResults}
        renderItem={renderResult}
        keyExtractor={(item) => item._id}
        style={styles.resultList}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#eee',
      paddingHorizontal: 10,
      borderRadius: 20,
      marginHorizontal: 10,
      marginBottom: 10,
    },
    searchIcon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      height: 40,
      color: '#333',
      fontSize: 16,
      fontWeight: '500',
      paddingVertical: 10,
    },
    resultList: {
      flex: 1,
      marginHorizontal: 10,
    },
    searchTypeContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10,
      marginBottom: 10,
    },
    searchButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
      marginRight: 10,
    },
    userSearchButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#34b38a',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    eventSearchButton: {
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#34b38a',
      alignItems: 'center',
    },
    buttonText: {
      color: '#333',
      fontWeight: '500',
    },
    selectedButton: {
      backgroundColor: '#34b38a',
    },
    selectedText: {
      color: '#fff',
    },
  });

export default SearchScreen;
