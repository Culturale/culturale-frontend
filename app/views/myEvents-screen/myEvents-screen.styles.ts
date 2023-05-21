import { StyleSheet } from 'react-native';

export const MyEventsScreenStyles = StyleSheet.create({
  buttonAdd: {
    height: 100,
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34b38a',
    borderRadius: 8,
    marginLeft: 10,
  },
    buttonContent: {
        alignItems: 'center',
        flexDirection: 'column',
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
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
      flex: 1
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
      noEvents: {
        alignSelf: 'center',
        color: 'red',
        fontSize: 10,
        paddingTop: 10,
    },
});