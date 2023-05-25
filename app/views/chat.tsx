import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
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
  Button,
  TouchableOpacity
} from 'react-native';

export const ChatScreen = ({ navigation }: {navigation: any}) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    if (error) {
      Animated.timing(opacity, {
        duration: 500,
        toValue: 1,
        useNativeDriver: true
      }).start();
      setTimeout(() => {
        Animated.timing(opacity, {
          duration: 500,
          toValue: 0,
          useNativeDriver: true
        }).start(() => {
          setError('');
        });
      }, 2000);
    }
  }, [error, opacity]);

  const handleMessage = async () => {
    const SERVER_URL = '';

    const messageData = {
      content: content,
      // userId: userId,
      date: new Date()
    };

    axios.post(`${SERVER_URL}/events/newMessage`, messageData)
      .then((response: AxiosResponse) => {
        AsyncStorage.setItem('token', response.data.token);
        navigation.navigate('Main');
      })
      .catch((error: any) => {
        console.error('Error al enviar mensaje:', error.response.data);
        if (error.response.status == 400) setError('Mensaje no válido');
      });
  };

  return (
    <View style={styles.container}>
        <KeyboardAvoidingView style={styles.topbar}>
            <TouchableOpacity style={[styles.basecontainer, flexdata1]} onPress={() => navigation.navigate('Login')}>
                <Image source={require('../assets/back.png')} style={styles.sendpic} />
            </TouchableOpacity>
            <View style={[styles.basecontainer, flexdata2]}>
                <Text style={styles.baseText}>EventName</Text>
            </View>
            <View style={[styles.basecontainer, flexdata1]}>
                <Image source={require('../assets/logo-detail.png')} style={styles.image} />
            </View>
        </KeyboardAvoidingView>
        <View style={styles.chatbody}>

        </View>
        <KeyboardAvoidingView style={styles.chatinput}>
            <View style={styles.inputChat}>
                <TextInput
                placeholder="Message"
                placeholderTextColor="#003f5c"
                style={styles.TextInput}
                onChangeText={(content) => setContent(content)}
                />
            </View>
            <View style={styles.send}>
                <TouchableOpacity onPress={ () => handleMessage()}>
                    <Image source={require('../assets/send.png')} style={styles.sendpic} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    </View>
  );
};

const flexdata1 = { width: '20%' };
const flexdata2 = { width: '60%' };

const styles = StyleSheet.create({
  TextInput: {
    flex: 1,
    height: 50,
    padding: 10,
    width: '100%'
  },
  baseText: {
    color: 'black',
    fontFamily: 'Roboto',
    fontSize: 20
  },
  basecontainer: {
    alignItems: 'center',
    backgroundColor: '#76d7b8',
    justifyContent: 'center'
  },
  chatbody: {
    backgroundColor: '#fff',
    flexGrow: 1,
    width: '100%'
  },
  chatinput: {
    backgroundColor: '#76d7b8',
    flexDirection: 'row',
    gap: 10,
    height: 90,
    padding: 10,
    width: '100%'
  },
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  image: {
    height: 40,
    width: 40
  },
  inputChat: {
    alignItems: 'flex-start',
    backgroundColor: '#D2FFE6',
    borderRadius: 10,
    height: 50,
    justifyContent: 'flex-start',
    width: '80%'
  },
  send: {
    alignItems: 'center',
    backgroundColor: '#D2FFE6',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    width: 50
  },
  sendpic: {
    height: 20,
    width: 20
  },
  topbar: {
    backgroundColor: '#76d7b8',
    flexDirection: 'row',
    height: 90,
    paddingHorizontal: 5,
    paddingTop: 30,
    width: '100%'
  }

});

export default ChatScreen;
