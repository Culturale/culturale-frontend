import {StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const SearchScreenStyles =  StyleSheet.create({
  // CONTENIDOR DEL TITOL PRINCIPAL:
  titleContainer: {
    justifyContent: 'center',
    backgroundColor: '#34b38a',
    position:'absolute',
    width: '100%', // --> AMPLADA 
    height: 70, // --> ALTURA
    paddingHorizontal: 32,

  },
  // TITOL PRINCIPAL:
  title: {
    fontFamily: 'Helvetica',
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
  },
  // CONTENIDOR DE CERCA: (BARA DE CERCA, BOTO FILTRES I BOTONS EVENTS I USERS)
  searchContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    top: screenHeight * 0.1,
    height: screenHeight * 0.15,
  },
  // CONTENIDOR TEXT CERCA 
  searchTextContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    borderRadius: 18,
    top: screenHeight * 0.02,
  },
  // BOTO DE CERCA (LUPA)
  searchIcon: {
    marginRight: screenWidth * 0.02,
    color: '#000',
  },
  // BOTO DE FILTRE:
  buttonfilter: {
    marginLeft: screenWidth * 0.02,
    color: '#000',
  },
  // CONTENIDOR BOTONS EVENTOS, USUARIOS:
  searchTypeContainer: {
    flexDirection: 'row',
    marginTop: screenHeight * 0.02,
    zIndex: 1,
    top: screenHeight * 0.02,
  },
  // CONTENIDOR FILTRE EVENTOS:
  filterContainer: {
    backgroundColor: '#FFFFFF',
    borderColor: '#34B38A',
    borderRadius: 8,
    borderWidth: 2,
    elevation: 2,
    top: screenHeight * 0.32,
    zIndex: 1,
    height: screenHeight * 0.5,
    position: 'absolute',
    width: screenWidth,
  },
  // BOTO FILTRE DATA:
  filterData: {
    borderColor: '#34B38A',
    borderRadius: 8,
    borderWidth: 2,
    marginHorizontal: screenWidth * 0.02,
    marginBottom: screenHeight * 0.04,
    top: screenHeight * 0.04,
  },
  // TEXT BOTO FILTRE DATA:
  filterDataText: {
    fontFamily: 'Arial',
    paddingLeft: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  // BOTO APLICA ELS FILTRES:
  filterButton: {
    backgroundColor: '#34B38A',
    alignItems: 'center',
    borderRadius: 20,
    marginRight: screenWidth * 0.02,
    paddingHorizontal: screenWidth * 0.02,
    paddingVertical: screenHeight * 0.01,
    top: screenHeight * 0.1,
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
    top: screenHeight * 0.01,
    height: screenHeight * 0.1,
    marginHorizontal: screenWidth * 0.02,
    zIndex: 1,
  },
  // PICKER
  picker: {
    fontSize: 12,
    backgroundColor: '#FFFF',
    top: 0,
    marginHorizontal: screenWidth * 0.02,
    marginBottom: 0,
  },
  // FILTRE DE CADA EVENTOS:
  filter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: screenWidth * 0.01,
    marginBottom: screenHeight * 0.04,
  },
  // POSAR PREU FILTRE
  filterTextInput: {
    borderColor: '#34B38A',
    borderRadius: 8,
    borderWidth: 2,
    flex: 1,
    paddingHorizontal: screenWidth * 0.01,
    marginRight: screenWidth * 0.02,
  },
  // CONTAINER FILTRE PREU:
  filterpreu: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: screenWidth * 0.02,
    top: screenHeight * 0.04,
  },
  // CONTENIDOR DE RESULTATS:
  resultContainer: {
    position: 'relative',
    backgroundColor: '#fff',
    top: screenHeight * 0.1,
    width: screenWidth,
    height: screenHeight * 0.6,
  },
  // BOTO USUARIS:
  userSearchButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#34b38a',
    borderWidth: 1,
    marginHorizontal: screenWidth * 0.02,
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
    marginRight: screenWidth * 0.02,
    paddingHorizontal: screenWidth * 0.02,
    paddingVertical: screenHeight * 0.01,
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
    marginTop: screenHeight * 0.04,
    textAlign: 'center',
  },
});