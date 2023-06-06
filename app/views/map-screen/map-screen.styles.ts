import { StyleSheet } from 'react-native';

export const MapScreenStyles =StyleSheet.create({
bottomContainer: {
    padding: 5,
  },
  button: {
    backgroundColor: '#34b38a',
    borderRadius: 5,
    left: 110,
    paddingHorizontal: 7,
    paddingVertical: 2,
    width:90,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  calloutContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 1,
    width: 200,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  iconContainer: {
    marginRight: 5,
  },
  infoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom:0,
  },
  infoText: {
    fontSize: 14,
  },
  locationButton: {
    backgroundColor: '#333',
    borderRadius: 50,
    bottom: 20,
    padding: 10,
    position: 'absolute',
    right: 20,
  },
  map: {
    flex: 1,
    zIndex: -1,
  },
  searchButton: {
    backgroundColor: '#34b38a',
    borderRadius: 15,
    padding: 3,
    paddingHorizontal: 3,
    position: 'absolute',
    right: 6,
  },
  searchContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    left: 10,
    paddingLeft: 10,
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 0,
  },
  searchInput: {
    color: '#333',
    flex: 1,
    fontSize: 16,
    height: 40,
    marginRight: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  titleContainer: {
    backgroundColor: '#34b38a',
    justifyContent: 'center',
    paddingBottom: 5,
    paddingHorizontal: 32,
    paddingTop: 20,
  },  
});