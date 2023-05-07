import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Animated,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { useApplicationLayer } from '~/hooks';
import { LoginScreenProps as Props } from './login-screen.props';
import { useNavigation } from '@react-navigation/native';
import { RootParamList } from '~/navigation';
import { StackNavigationProp } from '@react-navigation/stack';

type LoginScreenNavigation = StackNavigationProp<RootParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = observer(() => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [opacity] = useState(new Animated.Value(0));
  const {
    useCases: { Login },
  } = useApplicationLayer();
  const navigation = useNavigation<LoginScreenNavigation>();

  useEffect(() => {
    if (error) {
      Animated.timing(opacity, {
        duration: 500,
        toValue: 1,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        Animated.timing(opacity, {
          duration: 500,
          toValue: 0,
          useNativeDriver: true,
        }).start(() => {
          setError('');
        });
      }, 2000);
    }
  }, [error, opacity]);

  function handleLogin() {
    Login(user, password).subscribeToRequest({
      onCompleteRequest: () => navigation.navigate('Main'),
    });
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Image source={require('../../../assets/logo.png')} style={styles.image} />
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          placeholder="Usuario"
          placeholderTextColor="#003f5c"
          style={styles.TextInput}
          onChangeText={(user) => setUser(user)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          placeholder="Contraseña"
          placeholderTextColor="#003f5c"
          style={styles.TextInput}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.register}>¿No estás registrado?</Text>
      </TouchableOpacity>

      <Animated.View style={{ opacity }}>
        {error && <Text style={{ color: 'red', fontSize: 16 }}>{error}</Text>}
      </Animated.View>

      <TouchableOpacity style={styles.loginBtn} onPress={() => handleLogin()}>
        <Text style={styles.loginText}>ENTRA</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
});

const styles = StyleSheet.create({
  TextInput: {
    flex: 1,
    height: 50,
    padding: 10,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#76d7b8',
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    height: '50%',
    marginBottom: 40,
  },
  inputView: {
    alignItems: 'center',
    backgroundColor: '#D2FFE6',
    borderRadius: 30,
    height: 45,
    marginBottom: 20,
    width: '70%',
  },

  loginBtn: {
    alignItems: 'center',
    backgroundColor: '#34b38a',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 20,
    width: '80%',
  },

  loginText: {
    color: 'white',
    fontFamily: 'Helvetica',
  },

  register: {
    height: 30,
    marginBottom: 20,
  },
});

export default LoginScreen;
