import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
      eventName: {
        fontWeight: 'bold',
      },
      eventDescription: {
        flex: 1
      },
      callout: {
        padding: 10,
        minWidth: 150,
      },
      button: {
        alignSelf: 'flex-end',
        backgroundColor: '#34b38a',
        borderBottomRightRadius: 16,
        bottom: 0,
        paddingHorizontal: 9,
        marginBottom: -5,
        paddingVertical: 1,
        position: 'absolute',
        right: -5
      },
      buttonText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',
      },
});
    