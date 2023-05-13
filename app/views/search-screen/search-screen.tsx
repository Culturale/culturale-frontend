import { observer } from 'mobx-react-lite';
import type React from 'react';
import { useEffect, useState } from 'react';
import { Text, View, FlatList, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useApplicationLayer } from '~/hooks';

import type { SearchScreenProps as Props } from './search-screen.props';
import { SearchScreenStyles as styles } from './search-screen.styles';
import { Event } from '~/components';
import type { IEvent, IUser } from '~/domain';

export const SearchScreen: React.FC<Props> = observer(() => {
    const {controllers:{EventController}} = useApplicationLayer();

    //Llista de resultats a mostrar:
    const [searchResults, setSearchResults] = useState<IEvent[]> ([]);

    //Text que introdueix l'usuari per a buscar:
    const [searchText, setSearchText] = useState('');

    //Per saber si volen buscar usuaris o events:
    const [searchType, setSearchType] = useState('eventos');

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

    const handleSearch = (searchText: string) => {
        if (searchType === 'usuarios') {
            // .then(response => {
            //   const modifiedUsers = response.data.user.map((user: User, index: number) => {
            //     user._id = (index + 1).toString();
            //     return user;
            //   })
            //   const user = users.
            //   setSearchResults(modifiedUsers);
            // })
            // .catch(error => {
            //     console.log(error);
            // });
        }

        else if (searchType === 'eventos') {
            EventController.fetchEventsByDenominacio(searchText);
            const events = EventController.events;
            setSearchResults(events);
        }
      };

      const renderResult = ({ item } : {item: any}) =>{
        // if (searchType === 'usuarios') {
        //     return (
        //         <Usuario
        //             user={{
        //                 username: item.username,
        //                 name: item.name,
        //                 telefon: item.telefon,
        //                 numFollowers: item.numFollowers
        //             }}
        //         />
        //     );
        // }
        if (searchResults.length === 0) {
            return (
            <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsText}>No se encontraron resultados</Text>
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
                    <Ionicons name="search" size={24} color="#aaa" style={styles.searchIcon} />
                    <TextInput
                        style={styles.input}
                        value={searchText}
                        onChangeText={setSearchText}
                        onSubmitEditing={() => handleSearch(searchText)}
                        placeholder={`Buscar ${userSearch ? 'usuarios por username' : 'eventos por denominacio'}`}
                        placeholderTextColor="#aaa"
                        //userSearch={userSearch}
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
            <View style={styles.resultContainer}>
                <FlatList
                    data={searchResults}
                    renderItem={renderResult}
                    keyExtractor={(item) => item.id}
                />
            </View>            
        
        </View>
      );
});