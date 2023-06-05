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
import { IMessage } from '~/domain';

type ChatScreenNavigation = StackNavigationProp<RootParamList, 'ChatScreen'>;

export const ChatScreen: React.FC<Props> = observer((props: Props) => {
  const { event } = props.route.params;

  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [opacity] = useState(new Animated.Value(0));
  const {
    useCases: { NewMessage },
    controllers: { EventController, UserController},
  } = useApplicationLayer();

  const userInfo = UserController.userInfo;
  const user = UserController.users[0];
  const navigation = useNavigation<ChatScreenNavigation>();
  const [msgdisplay, setMsgDisplay] = useState<IMessage[]>([]);
  const messages = EventController.messages;

  useEffect(() => {
    EventController.fetchEventMessages(event.id);
    UserController.fetchUsers(userInfo.username);
    console.log("Loading chat screen")
  }, []);

  useEffect(() => {
    if (messages)
    {
      setMsgDisplay(messages);
    }
  }, [messages]);

  const renderItem = ({ item }: { item: any }) => {
    const user = UserController.fetchUser(item.userId);
  
    return (
      <View style={styles.messageContainer}>
        <View style={styles.messageBox}>
          <Text style={styles.messageUsername}>{user?.username}</Text>
          <Text style={styles.messageContent}>{item.content}</Text>
        </View>
      </View>
    );
  };
  
  

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

  async function handleMessage() {
    console.log("Button");
    const date = new Date();
    console.log(date);
  
    try {
      await NewMessage(event.id, content, user._id).subscribeToRequest({
        onCompleteRequest: async () => {
          await EventController.fetchEventMessages(event.id);
          navigation.navigate('ChatScreen', { event: event });
        },
      });
    } catch (error) {
      setError(error.message);
    }
  }
  
  

  console.log('render')

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.topbar}>
        <View style={styles.backArrow}>
          <TouchableOpacity onPress={() => navigation.navigate('EventScreen', { eventId: event.id })}>
            <Ionicons color="black" name="arrow-back" size={24} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{event.denominacio}</Text>
        <View style={styles.backArrow} />
      </KeyboardAvoidingView>
      <View style={styles.chatbody}>
        <FlatList
          data={msgdisplay}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.messageContainer}
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
          <TouchableOpacity onPress={handleMessage}>
            <Image onPress={handleMessage} source={require('../../../assets/send.png')} style={styles.sendpic} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
});

const flexdata1 = { width: '20%' };
const flexdata2 = { width: '60%' };

export default ChatScreen;
