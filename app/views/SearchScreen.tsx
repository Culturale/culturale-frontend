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

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (text) => {
    setSearchText(text);
    // Aquí debes implementar la lógica para buscar eventos y usuarios
    // usando la API de tu aplicación y almacenar los resultados en searchResults
  }

  const renderResult = ({ item }) => {
    // Aquí debes implementar la lógica para mostrar cada resultado en la lista
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#aaa" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          value={searchText}
          onChangeText={handleSearch}
          placeholder="Buscar eventos o usuarios"
          placeholderTextColor="#aaa"
        />
      </View>
      <FlatList
        data={searchResults}
        renderItem={renderResult}
        keyExtractor={item => item.id}
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
});

export default SearchScreen;
