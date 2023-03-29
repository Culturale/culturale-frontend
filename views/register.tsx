import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from "react-native-dropdown-picker";
import axios, { AxiosResponse } from 'axios';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
} from "react-native";


export const RegisterScreen  = () => {
  const handleRegister = async () => {
    validateEmail();
    validatePhone();
    const SERVER_URL = '';
    const registerData = {
      name: nom,
      username: user,
      email: email,
      password: password,
      phoneNumber: telf,
      usertype: value,
      profilePicture: image
    };

    axios.post(`${SERVER_URL}/users/create`, registerData)
      .then((response: AxiosResponse) => {
        console.log('Respuesta del servidor:', response.data);
      })
      .catch((error: any) => {
        console.error('Error al registrar usuario:', error.response.data);
      });
};



    const [nom, setNom] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [telf, setTelf] = useState('');
    const [image, setImage] = useState('');
    const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([
    {label: 'Particular', value: 'usuario'},
    {label: 'Empresa', value: 'empresa'}
  ]);

  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

      const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          setEmailError('Ingresa un correo electrónico válido');
        } else {
          setEmailError('');
        }
      };
    
      const validatePhone = () => {
        const phoneRegex = /^[0-9]{9}$/;
        if (!phoneRegex.test(telf)) {
          setPhoneError('Ingresa un número de teléfono válido');
        } else {
          setPhoneError('');
        }
      };

      return(
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Image style={styles.image} source={require("../assets/logo.png")} />
          <StatusBar style="auto" />

          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Pressable style={styles.button} onPress={pickImage}>
              <Text style={styles.textButton}>Selecciona una imagen</Text>
            </Pressable>
            {image && <Image source={{ uri: image }} style={{ width: 125, height: 125 }} />}
          </View>

          <View style={styles.inputView}>
              <TextInput
              style={styles.TextInput}
              placeholder="Nombre"
              placeholderTextColor="#003f5c"
              onChangeText={(nom) => setNom(nom)}
              />
          </View>

          <View style={styles.inputView}>
              <TextInput
              style={styles.TextInput}
              placeholder="Usuario"
              placeholderTextColor="#003f5c"
              onChangeText={(user) => setUser(user)}
              />
          </View>

          <View style={styles.inputView}>
              <TextInput secureTextEntry={true}
              style={styles.TextInput}
              placeholder="Contraseña"
              placeholderTextColor="#003f5c"
              onChangeText={(password) => setPassword(password)}
              />
          </View>

          <View style={styles.inputView}>
              <TextInput
              style={styles.TextInput}
              placeholder="Email"
              onBlur={validateEmail}
              placeholderTextColor="#003f5c"
              onChangeText={(email) => setEmail(email)}
              />
          </View>
          {emailError ? <Text style={{color: 'red'}}>{emailError}</Text> : null}

          <View style={styles.inputView}>
              <TextInput
              style={styles.TextInput}
              placeholder="Teléfono"
              onBlur={validatePhone}
              placeholderTextColor="#003f5c"
              onChangeText={(telf) => setTelf(telf)}
              />
          </View>
          {phoneError ? <Text style={{color: 'red'}}>{phoneError}</Text> : null}

          
          <DropDownPicker style={{backgroundColor: "#D2FFE6", width: "70%", alignSelf: 'center', marginBottom: 20}}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />

          <TouchableOpacity onPress={ () => handleRegister()}  style={styles.registerBtn}>
            <Text style={styles.registerText}>CONFIRMAR</Text> 
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
    width: 250,
    height: 250,
    marginBottom: -70,
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

  registerText: {
    fontFamily: 'Helvetica',
    color: 'white'
    

  },

  registerBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 30,
    backgroundColor: "#34b38a",
  },

  button: {
    width: 250,
    height: 50,
    backgroundColor: '#34b38a',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom:12    
  },

  textButton: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default RegisterScreen;