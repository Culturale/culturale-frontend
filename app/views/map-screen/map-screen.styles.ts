import { StyleSheet } from 'react-native';

export const MapScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    paddingTop: 50,
    paddingBottom: 5,
    paddingHorizontal: 32,
    backgroundColor: '#34b38a',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  bottomContainer: {
    padding: 5,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  map: {
    zIndex: -1,
    flex: 1,
  },
  calloutContainer: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight:20,
    paddingBottom: 30,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  eventName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  eventDescription: {
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  iconContainer: {
    marginRight: 5,
  },
  infoText: {
    fontSize: 14,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
  button: {
    right: 23,
    bottom:-30,
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#34b38a',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  locationButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#333',
  },
  searchContainer: {
    zIndex: 0,
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingLeft: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    marginRight: 10,
    color: '#333',
  },
  searchButton: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: '#34b38a',
    padding: 4,
    borderRadius: 10,
    right: 10,
  },  
});
