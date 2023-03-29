import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from 'axios';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Animated,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity
} from "react-native";



export const LoginScreen = ({navigation}: {navigation: any}) => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [opacity] = useState(new Animated.Value(0));

    useEffect(() => {
      if (error) {
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start(() => {
            setError('');
          });
        }, 2000);
      }
    }, [error, opacity]);

    const handleLogin = async () => {
      const SERVER_URL = '';
      const loginData = {
        username: user,
        password: password};

      axios.post(`${SERVER_URL}/users/login`, loginData)
  .then((response: AxiosResponse) => {
    console.log('Respuesta del servidor:', response.data);

  })
  .catch((error: any) => {
    console.error('Error al iniciar sesión:', error.response.data);
    if (error.response.status == 400) setError('Usuario o contraseña incorrectas')
  });
    };

    

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image style={styles.image} source={require("../assets/logo.png")} />
        <StatusBar style="auto" />
          <View style={styles.inputView}>
              <TextInput
              style={styles.TextInput}
              placeholder="Usuario"
              placeholderTextColor="#003f5c"
              onChangeText={(user) => setUser(user)}
              />
              </View>


              <View style={styles.inputView}>
              <TextInput
              style={styles.TextInput}
              placeholder="Contraseña"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
              /> 
          </View>

        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Text style={styles.register}>¿No estás registrado?</Text> 
        </TouchableOpacity>

        <Animated.View style={{opacity}}>
          {error && <Text style={{color: 'red', fontSize: 16}}>{error}</Text>}
        </Animated.View>

        <TouchableOpacity onPress={ () => handleLogin()} style={styles.loginBtn}>
          <Text style={styles.loginText}>ENTRA</Text> 
        </TouchableOpacity> 

      </KeyboardAvoidingView>
      
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#76d7b8",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: '50%',
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#D2FFE6",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10
  },

  loginText: {
    fontFamily: 'Helvetica',
    color: 'white'
    

  },

  register: {
    height: 30,
    marginBottom: 20,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: "#34b38a",
  },
});

export default LoginScreen;