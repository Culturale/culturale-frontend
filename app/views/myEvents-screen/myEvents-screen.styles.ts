import { StyleSheet } from 'react-native';

export const MyEventsScreenStyles = StyleSheet.create({
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
      eventDot: {
        backgroundColor: 'red',
        borderRadius: 3,
        height: 6,
        marginTop: 2,
        width: 6,
      },
      noEvents: {
        alignSelf: 'center',
        color: 'red',
        fontSize: 10,
        paddingTop: 10,
    },
});