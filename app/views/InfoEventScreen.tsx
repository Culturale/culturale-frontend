import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function EventInfoScreen (navigation: any) {
    const { event } = navigation.route.params;
    return (
        <View style={styles.container}> 
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{event.denominacio}</Text>
          </View>
          <View style={styles.subtitleContainer}>
          <Ionicons color="#888" name="location-outline" size={16} />
          <Text style={styles.subtitle}>{event.adress}</Text>
          </View>
          <View style={styles.subtitleContainer}>
          <Ionicons color="#888" name="calendar-outline" size={16} />
          <Text style={styles.subtitle}>{event.dataIni}</Text>
          </View>
          <Text style={styles.description}>{event.descripcio}</Text>
          <Image source={{ uri: event.url }} style={styles.image} />
          <View style={styles.priceContainer}>
            <Text style={styles.price}>22,10€</Text>
            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Comprar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.reviewContainer}>
            <Text style={styles.reviewTitle}>Reviews</Text>
            <View style={styles.starContainer}>
              <Image source={require('../../assets/filled-star--v1.png')} style={styles.star} />
              <Image source={require('../../assets/filled-star--v1.png')} style={styles.star} />
              <Image source={require('../../assets/filled-star--v1.png')} style={styles.star} />
              <Image source={require('../../assets/filled-star--v1.png')} style={styles.star} />
              <Image source={require('../../assets/descarga.png')} style={styles.star} />
            </View>
          </View>
          <View style={styles.reviewDetailsContainer}>
            <View style={styles.reviewCont}>
              <View>
                <Text style={styles.reviewDetailsTitle}>"¡Excelente!"</Text>
                <Text style={styles.reviewDetailsAuthor}>Juan Pérez</Text>
                <View style={{ flexDirection: 'column'}}>
                  <Text style={styles.reviewDetailsRating}>4/5</Text>
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.reviewDetailsDescription}>
                      "Excelente producto, buena calidad y precio justo."
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    
    
  container: {
    alignItems: 'flex-start',
    padding: 20,
    marginTop: 74,
  },
  titleContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: '#666',
    marginLeft: 5,
    fontSize: 16,
  },
  descriptionContainer: {
    height: 120,
    width: '100%',
  },
  description: {
    textAlign: 'justify',
    fontSize: 16,
    lineHeight: 24,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },

  priceContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  price: {
    color: '#8A2BE2',
    marginRight: 10,
    fontSize: 26,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  buyButton: {
    backgroundColor: '#8A2BE2',
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  reviewContainer: {
    alignItems: 'flex-start',
    marginTop: 20,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  starContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  star: {
    width: 20,
    height: 20,
    marginRight: 5,
  },

  reviewDetailsContainer: {
    marginTop: 10,
  },

  reviewCont: {
    backgroundColor: '#cdcdcd',
    padding: 5,
    borderRadius: 5,
    margin: 5,
  },

  reviewDetailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reviewDetailsAuthor: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  reviewDetailsRating: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 5,
  },
  reviewDetailsDescription: {
    fontSize: 14,
  },
  
    

  });