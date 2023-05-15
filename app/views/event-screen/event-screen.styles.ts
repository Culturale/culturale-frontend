import { StyleSheet } from 'react-native';

export const EventScreenStyles =StyleSheet.create({
    backArrow: {
      display: 'flex',
      paddingTop: 30,
    },
    buyButton: {
      alignSelf: 'flex-end',
      backgroundColor: '#8A2BE2',
      borderRadius: 5,
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
      marginTop: 0,
      padding: 20,
    },
    description: {
      fontSize: 16,
      lineHeight: 24,
      textAlign: 'justify',
    },
    descriptionContainer: {
      height: 120,
      width: '100%',
    },
    image: {
      height: 50,
      marginTop: 10,
      maxWidth: 50,
      width: '100%',
    },
    photo: {
      height: 50,
      resizeMode: 'cover',
      width: 50,
    },
    price: {
      alignSelf: 'flex-end',
      color: '#8A2BE2',
      fontSize: 26,
      fontWeight: 'bold',
      marginRight: 10,
    },
    priceContainer: {
      flexDirection: 'column',
      justifyContent: 'flex-end',
      marginTop: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '100%',
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
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'left',
    },
    titleContainer: {
      alignSelf: 'center',
      marginBottom: 10,
    },
});