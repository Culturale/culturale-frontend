import {StyleSheet} from 'react-native';

export const UserStyles = StyleSheet.create({
    button: {
      alignSelf: 'flex-end',
      backgroundColor: '#34b38a',
      borderBottomRightRadius: 16,
      bottom: 0,
      paddingHorizontal: 16,
      paddingVertical: 8,
      position: 'absolute',
      right: 0,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    container: {
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 10,
      elevation: 5,
      flexDirection: 'row',
      height: 100,
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
  
    details: {
      flex: 1,
      margin: 10,
    },
  
    image: {
      height: '100%',
      width: 80,
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
      marginBottom:5,
      fontWeight: 'bold',
    },
  });