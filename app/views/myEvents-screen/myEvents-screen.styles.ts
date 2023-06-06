import { StyleSheet } from 'react-native';

export const MyEventsScreenStyles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end',
    backgroundColor: '#34b38a',
    borderRadius: 10,
    bottom: 0,
    position: 'absolute',
    right: 0,
  },
  buttonAdd: {
    alignItems: 'center',
    backgroundColor: '#34b38a',
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '95%',
  },
  buttonAddVal: {
    alignItems: 'center',
    backgroundColor: 'purple',
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '95%',
  },
  buttonContent: {
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'column',
    height: 150,
    margin: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dayContainer: {
    alignItems: 'center',
    borderRadius: 15,
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  dayText: {
    color: 'black',
    fontSize: 16,
  },
  details: {
    flex: 1,  
    padding: 10,
  },
  disabledDayContainer: {
    alignItems: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 15,
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  disabledDayText: {
      color: 'gray',
      fontSize: 16,
  },
  eventDetail:{
  flex: 1,
  paddingBottom: 10,
  },
  eventDot: {
    backgroundColor: 'red',
    borderRadius: 3,
    height: 6,
    marginTop: 2,
    width: 6,
  },
  eventList: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  firstContent: {
    flexDirection: 'row',
  },
  image: {
    height: '100%',
    width: 80,
  },
  noEvents: {
    alignSelf: 'center',
    color: 'red',
    fontSize: 10,
    paddingTop: 10,
},
  subtitle: {
    color: '#666',
    fontSize: 14,
    marginLeft: 4,
  },
  subtitleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleMyEvents: {
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