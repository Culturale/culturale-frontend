import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { observer } from 'mobx-react-lite';
import type React from 'react';
import { useState, useEffect } from 'react';
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

import styles from './chat-styles';
import { useApplicationLayer } from '~/hooks';
import type { RootParamList } from '~/navigation';
import type { ChatScreenProps as Props } from './chat-screen.props';

type ChatScreenNavigation = StackNavigationProp<RootParamList, 'Chat'>;

export const ChatScreen: React.FC<Props> = observer (() => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [opacity] = useState(new Animated.Value(0));
  const {
    useCases: { NewMessage },
  } = useApplicationLayer();
  const navigation = useNavigation<ChatScreenNavigation>();
  
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

  function handleMessage() {
    NewMessage(content).subscribeToRequest({
      onCompleteRequest: () => navigation.navigate('Main'),
    });
  }

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
                <Image source={require('../../../assets/logo-detail.png')} style={styles.image} />
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
                    <Image source={require('../../../assets/send.png')} style={styles.sendpic} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    </View>
  );
});

const flexdata1 = { width: '20%' };
const flexdata2 = { width: '60%' };

export default ChatScreen;
