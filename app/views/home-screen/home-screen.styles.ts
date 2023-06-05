import { StyleSheet } from 'react-native';

export const HomeScreenStyles = StyleSheet.create({
  bottomContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 16,
    width: '100%',
  },
  loadingIndicator: {
    marginVertical: 10,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    // marginTop: 44,
  },
  eventContainer: {
    flex: 1,
    width: '100%',
  },
  hoyContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  subTitle: {
    fontFamily: 'Helvetica',
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
