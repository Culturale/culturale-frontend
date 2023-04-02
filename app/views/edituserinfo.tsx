import type { AxiosResponse } from 'axios';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { RadioButton } from 'react-native-paper';

export const EditProfileScreen = () => {
  const [name, setNom] = useState('');
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [telf, setTelf] = useState('');
  const [checked, setChecked] = React.useState('particular');
  const [image, setImage] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([
    { label: 'Particular', value: 'particular' },
    { label: 'Empresa', value: 'empresa' }
  ]);

  const handleEditProfile = async () => {
    const SERVER_URL = 'http://172.20.10.8:8080';
    const EditProfileData = {
      email: email,
      name: name,
      password: password,
      phoneNumber: telf,
      profilePicture: image,
      username: username,
      usertype: items
    };
    axios.post(`${SERVER_URL}/users/login`, EditProfileData)
      .then((response: AxiosResponse) => {
        console.log('Respuesta del servidor:', response.data);
      })
      .catch((error: any) => {
        console.error('Error al iniciar sesi�n:', error.response.data);
      });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.image} />
            <StatusBar style="auto" />

            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                <Pressable style={styles.button} onPress={pickImage}>
                    <Text style={styles.textButton}>Selecciona una imagen</Text>
                </Pressable>
                {image && <Image source={{ uri: image }} style={{ height: 125, width: 125 }} />}
            </View>

            <View style={styles.inputView}>
                <TextInput
                    placeholder="Nombre"
                    placeholderTextColor="#003f5c"
                    style={styles.TextInput}
                    onChangeText={(nom) => setNom(nom)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    placeholder="Usuario"
                    placeholderTextColor="#003f5c"
                    style={styles.TextInput}
                    onChangeText={(user) => setUser(user)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput secureTextEntry
                    placeholder="Contrase�a"
                    placeholderTextColor="#003f5c"
                    style={styles.TextInput}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#003f5c"
                    style={styles.TextInput}
                    onChangeText={(email) => setEmail(email)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    placeholder="Tel�fono"
                    placeholderTextColor="#003f5c"
                    style={styles.TextInput}
                    onChangeText={(telf) => setTelf(telf)}
                />
            </View>

            <DropDownPicker items={items}
                open={open}
                setItems={setItems}
                setOpen={setOpen}
                setValue={setValue}
                style={{ alignSelf: 'center', backgroundColor: '#D2FFE6', marginBottom: 20, width: '70%' }}
                value={value}
            />

            <TouchableOpacity style={styles.registerBtn}>
                <Text style={styles.registerText}>CONFIRMAR</Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({
  TextInput: {
    flex: 1,
    height: 50,
    padding: 10
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#34b38a',
    borderRadius: 4,
    height: 50,
    justifyContent: 'center',
    marginBottom: 12,
    width: 250
  },

  container: {
    alignItems: 'center',
    backgroundColor: '#76d7b8',
    flex: 1,
    justifyContent: 'center'
  },

  image: {
    height: 250,
    marginBottom: -70,
    width: 250
  },

  inputView: {
    alignItems: 'center',
    backgroundColor: '#D2FFE6',
    borderRadius: 30,
    height: 45,
    marginBottom: 20,
    width: '70%'
  },

  registerBtn: {
    alignItems: 'center',
    backgroundColor: '#34b38a',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 10,
    width: '80%'
  },

  registerText: {
    color: 'white',
    fontFamily: 'Helvetica'

  },

  textButton: {
    color: 'white',
    fontSize: 16,
    letterSpacing: 0.25,
    lineHeight: 21
  }
});

export default RegisterScreen;
