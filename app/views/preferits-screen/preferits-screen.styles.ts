import { StyleSheet } from 'react-native';

export const PreferitsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 44,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Helvetica',
    fontSize: 24,
    fontWeight: 'bold',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontFamily: 'Helvetica',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },
  eventContainer: {
    flex: 1,
    width: '100%',
  },
});
