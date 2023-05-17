import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
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
  FlatList,
} from 'react-native';

import { useApplicationLayer } from '~/hooks';
import type { RootParamList } from '~/navigation';
import type { ChatScreenProps as Props } from './chat-screen.props';
import styles from './chat-styles';

type ChatScreenNavigation = StackNavigationProp<RootParamList, 'ChatScreen'>;

export const ChatScreen: React.FC<Props> = observer((props: Props) => {
  const { event } = props.route.params;

  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [opacity] = useState(new Animated.Value(0));
  const {
    useCases: { NewMessage },
    controllers: { EventController },
    controllers: { UserController },
  } = useApplicationLayer();

  const navigation = useNavigation<ChatScreenNavigation>();

  const [messages] = useState([]);

  useEffect(() => {
      EventController.fetchEventMessages(event.id);
  }, []);

  const renderItem = ({ item }: { item: any }) => (
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
  );

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
    NewMessage(content, UserController.token, new Date()).subscribeToRequest({
      onCompleteRequest: () => navigation.navigate('ChatScreen', { event: event }),
    });
  }

  return (
    <View style={styles.container}>
        <KeyboardAvoidingView style={styles.topbar}>
          <View style={styles.backArrow}>
            <TouchableOpacity onPress={() => navigation.navigate('EventScreen', { event : event })}>
              <Ionicons color="black" name="arrow-back" size={24} />
            </TouchableOpacity>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{event.denominacio}</Text>
          </View>
        </KeyboardAvoidingView>
        <View style={styles.chatbody}>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
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
