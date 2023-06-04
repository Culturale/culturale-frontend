import { StyleSheet } from 'react-native';

export const EventScreenStyles =StyleSheet.create({
    backArrow: {
      display: 'flex',
      paddingLeft: 10,
      paddingTop: 30,
    },
    backButton: {
      backgroundColor: '#007AFF',
      borderRadius: 8,
      marginLeft: 16,
      paddingHorizontal: 16,
      paddingVertical: 10,
    },
    backButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    buyButton: {
      // alignSelf: 'flex-end',
      backgroundColor: '#34b38a',
      borderRadius: 5,
      marginBottom: 10,
      marginTop: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    buyButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    container: {
      display: 'flex',
      marginTop: 0,
      padding: 20
    },
    description: {
      fontSize: 16,
      lineHeight: 24,
      overflow: 'hidden',
      textAlign: 'justify',
    },
    descriptionContainer: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      maxWidth: 250,
    },
    goButton: {
      alignSelf: 'flex-start',
      color: '#34b38a',
      fontSize: 16,
      fontWeight: 'bold',
      paddingBottom: 1,
      paddingTop: 3,
      textAlign: 'justify',
    },
    heart: {
      alignSelf: 'flex-end',
      marginLeft: 5,
    },
    image: {
      height: 50,
      marginTop: 10,
      maxWidth: 50,
      width: '100%',
    },
    map: {
      borderRadius: 10,
      height: 100,
      width: '100%',
    },
    mapContainer: {
      alignItems: 'center',
      flex: 1,
      height: 5,
      justifyContent: 'center',
      marginTop: 50,
    },
    photo: {
      alignSelf: 'flex-start', 
      flexDirection: 'column', 
      height: 125,
      width: 125,
    },
    price: {
      // alignSelf: 'flex-end',
      color: 'black',
      fontSize: 26,
      fontWeight: 'bold',
      marginRight: 10,
    },
    priceContainer: {
      flexDirection: 'column',
      // justifyContent: 'flex-start',
      marginTop: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '100%',
    },
  
    readMore: {
      alignSelf: 'flex-end',
      color: '#34b38a',
    },
    reviewCont: {
      backgroundColor: '#cdcdcd',
      borderRadius: 5,
      margin: 5,
      padding: 5,
    },
  
    reviewContainer: {
      alignItems: 'flex-start',
      marginTop: 20,
    },
    reviewDetailsAuthor: {
      color: 'gray',
      fontSize: 14,
      marginBottom: 5,
    },
    reviewDetailsContainer: {
      marginTop: 10,
    },
    reviewDetailsDescription: {
      fontSize: 14,
    },
  
    reviewDetailsRating: {
      fontSize: 14,
      fontWeight: 'bold',
      marginRight: 5,
    },
  
    reviewDetailsTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    reviewTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    star: {
      height: 20,
      marginRight: 5,
      width: 20,
    },
    starContainer: {
      flexDirection: 'row',
      marginTop: 5,
    },
    subtitle: {
      color: '#666',
      fontSize: 16,
      marginLeft: 5,
    },
    subtitleContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 10,
    },
  
    successContainer: {
      alignItems: 'center',
      alignSelf: 'flex-end',
      flexDirection: 'row',
      paddingBottom: 10,
    },
    successText: {
      color: 'green',
      fontSize: 16,
      marginLeft: 8,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    titleContainer: {
      alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: 400,
    paddingBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
    },
});