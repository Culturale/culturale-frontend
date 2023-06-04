import {StyleSheet} from 'react-native';

export const SearchScreenStyles =  StyleSheet.create({
  // CONTENIDOR DEL TITOL PRINCIPAL:
  titleContainer: {
    justifyContent: 'center',
    backgroundColor: '#34b38a',
    position:'absolute',
    width: '100%', // --> AMPLADA 
    height: 70, // --> ALTURA
  },
  // TITOL PRINCIPAL:
  title: {
    fontFamily: 'Helvetica',
    fontSize: 24,
    fontWeight: 'bold',
  },
  // CONTENIDOR DE CERCA: (BARA DE CERCA, BOTO FILTRES I BOTONS EVENTS I USERS)
  searchContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    top: 70,
    height: 90, // --> ALTURA
  },
  // CONTENIDOR TEXT CERCA 
  searchTextContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    borderRadius: 18,
    top: 10,
  },
  // BOTO DE CERCA (LUPA)
  searchIcon: {
    marginRight: 10,
    color: '#000',
  },
  // BOTO DE FILTRE:
  buttonfilter: {
    marginLeft:10,
    color: '#000',
  },
  // CONTENIDOR BOTONS EVENTOS, USUARIOS:
  searchTypeContainer: {
    flexDirection: 'row',
    marginTop: 10,
    zIndex: 1,
    top: 10,
  },
  // CONTENIDOR FILTRE EVENTOS:
  filterContainer: {
    backgroundColor: '#FFFFFF',
    borderColor: '#34B38A',
    borderRadius: 8,
    borderWidth: 2,
    elevation: 2,
    top: 160,
    
    zIndex: 1,
    height: 375, // --> ALTURA
    position: 'absolute',
    width: '100%', // --> AMPLADA 
    
  },
  // BOTO FILTRE DATA:
  filterData: {
    borderColor: '#34B38A',
    borderRadius: 8,
    borderWidth: 2,
    marginHorizontal: 9,
    marginBottom: 20,
    top: 23,
  },
  // TEXT BOTO FILTRE DATA:
  filterDataText: {
    fontFamily: 'Arial',
    paddingLeft: 3,
  },
  // BOTO APLICA ELS FILTRES:
  filterButton: {
    backgroundColor: '#34B38A',
    alignItems: 'center',
    borderRadius: 20,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    top: 100,
  },
  // TEXT BOTO APLICA ELS FILTRES:
  filterButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    alignContent: 'center',
  },
  // FILTRE CATEGORIA:
  filterCategoria: {
    fontFamily: 'Arial',
    borderColor: '#34B38A',
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
    top: 8,
    height: 65, // --> ALTURA
    marginHorizontal: 9,
    zIndex: 1,
    
  },
  // PICKER
  picker: {
    fontSize: 12,
    backgroundColor: '#FFFF',
    top: 0,
    marginHorizontal: 9,
    marginBottom: 0,
  },
  // FILTRE DE CADA EVENTOS:
  filter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
    marginBottom: 20,
  },
  // POSAR PREU FILTRE
  filterTextInput: {
    borderColor: '#34B38A',
    borderRadius: 8,
    borderWidth: 2,
    flex: 1,
    paddingHorizontal: 7,
    marginRight: 9,
  },
  // CONTAINER FILTRE PREU:
  filterpreu: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 9,
    top: 20,
  },
  // CONTENIDOR DE RESULTATS:
  resultContainer: {
    position:'relative',
    backgroundColor: '#fff',
    top: 70,
    width: '100%', // --> AMPLADA 
    height: 380, // --> ALTURA
  },
  // BOTO USUARIS:
  userSearchButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#34b38a',
    borderWidth: 1,
    marginHorizontal: 10,
  },
  // BOTO EVENTS:
  eventSearchButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#34b38a',
    borderWidth: 1,
  },
  // BOTO CERCA SELECCIONAT:
  selectedButton: {
    backgroundColor: '#34b38a',
  },
  // BOTO CERCA
  searchButton: {
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  // TEXT BOTO CERCA SELECCIONAT:
  selectedText: {
    color: '#fff',
  },
  // TEXT BOTO EVENTOS/USUARIOS SENSE APRETAR:
  buttonText: {
    color: '#333',
    fontWeight: '500',
  },
  // CONTAINER TEXT NO S'HAN TROBAT RESULTATS:
  noResultsContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  // TEXT NO S'HAN TROBAT RESULTATS:
  noResultsText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
});