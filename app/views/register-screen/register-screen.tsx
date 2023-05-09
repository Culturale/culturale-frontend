import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import { observer } from 'mobx-react-lite';
import type React from 'react';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { useApplicationLayer } from '~/hooks';
import type { RootParamList } from '~/navigation';

import type { RegisterScreenProps as Props } from './register-screen.props';
import { RegisterScreenStyles as styles } from './register-screen.styles';

type RegisterScreenNavigation = StackNavigationProp<RootParamList, 'Signup'>;

export const RegisterScreen: React.FC<Props> = observer(() => {
  const {
    useCases: { Signup },
  } = useApplicationLayer();
  const navigation = useNavigation<RegisterScreenNavigation>();

  function handleRegister() {
    Signup(user, nom, password, email, telf, value, image).subscribeToRequest({
      onCompleteRequest: () => navigation.navigate('Login'),
    });
  }

  const [nom, setNom] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [telf, setTelf] = useState('');

  const [image, setImage] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([
    { label: 'Particular', value: 'usuario' },
    { label: 'Empresa', value: 'empresa' },
  ]);

  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      mediaTypes: ImagePicker.MediaTypeOptions.All,
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

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <Image
        source={require('../../../assets/logo.png')}
        style={styles.image}
      />
      <StatusBar style='auto' />
      <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        <Pressable style={styles.button} onPress={pickImage}>
          <Text style={styles.textButton}>Selecciona una imagen</Text>
        </Pressable>
        {image && (
          <Image source={{ uri: image }} style={{ height: 125, width: 125 }} />
        )}
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder='Nombre'
          placeholderTextColor='#003f5c'
          style={styles.TextInput}
          onChangeText={(nom) => setNom(nom)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder='Usuario'
          placeholderTextColor='#003f5c'
          style={styles.TextInput}
          onChangeText={(user) => setUser(user)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          placeholder='Contraseña'
          placeholderTextColor='#003f5c'
          style={styles.TextInput}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder='Email'
          placeholderTextColor='#003f5c'
          style={styles.TextInput}
          onBlur={validateEmail}
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      {emailError ? <Text style={{ color: 'red' }}>{emailError}</Text> : null}
      <View style={styles.inputView}>
        <TextInput
          placeholder='Teléfono'
          placeholderTextColor='#003f5c'
          style={styles.TextInput}
          onBlur={validatePhone}
          onChangeText={(telf) => setTelf(telf)}
        />
      </View>
      {phoneError ? <Text style={{ color: 'red' }}>{phoneError}</Text> : null}
      <DropDownPicker
        items={items}
        open={open}
        setItems={setItems}
        setOpen={setOpen}
        setValue={setValue}
        style={{
          alignSelf: 'center',
          backgroundColor: '#D2FFE6',
          marginBottom: 20,
          width: '70%',
        }}
        value={value}
      />
      <TouchableOpacity
        style={styles.registerBtn}
        onPress={() => handleRegister()}
      >
        <Text style={styles.registerText}>CONFIRMAR</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
});
