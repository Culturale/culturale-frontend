import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity
} from "react-native";


export const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image style={styles.image} source={require("../assets/logo.png")} />
        <StatusBar style="auto" />
          <View style={styles.inputView}>
              <TextInput
              style={styles.TextInput}
              placeholder="Email"
              placeholderTextColor="#003f5c"
              onChangeText={(email) => setEmail(email)}
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

        <TouchableOpacity>
          <Text style={styles.register}>¿No estás registrado?</Text> 
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn}>
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