import {StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const ShowReportsScreenStyles =  StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultsContainer: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  titleContainer: {
    backgroundColor: 'pink',
    justifyContent: 'center',
    marginBottom: 10,
    paddingBottom: 5,
    paddingHorizontal: 32,
    paddingTop: 20,
  },
});