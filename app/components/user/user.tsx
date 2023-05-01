import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function User({ user } : {user: any}) {
  return (
    <View style={styles.container}>
      
      <View style={styles.detalle}>
        <Text style={styles.nombre}>{user.name}</Text>
        <Text style={styles.username}>@{user.username}</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Seguir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end',
    backgroundColor: '#34b7f1',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#34b7f1',
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 6,
    position: 'absolute',
    right: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    margin: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  detalle: {
    flex: 1,
    padding: 10
  },
  imagenPerfil: {
    height: 80,
    width: 80
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  username: {
    color: '#666'
  }
});
