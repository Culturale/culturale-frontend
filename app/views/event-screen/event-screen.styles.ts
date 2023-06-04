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
      display: 'flex',
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
    goButton: {
      color: 'blue',
      fontSize: 16,
      lineHeight: 24,
      textAlign: 'justify' ,
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
      marginBottom: 70,
    },
    photo: {
      alignSelf: 'flex-end', 
      flexDirection: 'column', 
      height: 125,
      width: 125,
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
      backgroundColor: '#cdebe2',
      marginBottom: 10,
      borderRadius:30,
      paddingBottom:10,
     
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
      height: 30,
      marginRight: 2,
      width: 20,
      fontSize: 25,
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
      textAlign: 'left',
    },
    titleContainer: {
      alignSelf: 'center',
      marginBottom: 10,
    },
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    profilePicture: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
      marginLeft:20,
    },
    username: {
      fontWeight: 'bold',
      fontSize: 16,
      paddingTop: 7,
    },
    ratingContainer: {
      flexDirection: 'row',
    },
    filledStar: {
      color: 'gold',
    },
    comment: {
      marginLeft:20,
      marginRight:10,
      
    },
    listContainer:{
      flex: 0,
      maxHeight: 230,
  }
});