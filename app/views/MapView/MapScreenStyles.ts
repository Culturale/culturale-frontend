import {StyleSheet} from 'react-native';
export default StyleSheet.create({
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
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 5,
    width: '100%',
  },
  subTitle: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  map: {
    flex: 1,
    marginBottom:10,
  }
});