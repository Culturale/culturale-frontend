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
import type { PayScreenProps as Props } from './pay-screen.props';
import styles from './pay-styles';


type PayScreenNavigation = StackNavigationProp<RootParamList, 'PayScreen'>;

export const PayScreen: React.FC<Props> = observer((props: Props) => {
  const { event } = props.route.params;

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [error, setError] = useState('');
  const [opacity] = useState(new Animated.Value(0));
  const {
    // useCases: { Payment },
    controllers: { EventController },
    controllers: { UserController },
  } = useApplicationLayer();

  const navigation = useNavigation<PayScreenNavigation>();

  const [messages] = useState([]);

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

  const handlePayment = () => {
    // Perform payment logic here
    // You can navigate to a success screen or perform other actions
  };

  console.log('render')

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Payment Information</Text>
      </View>
      <View style={styles.paymentForm}>
        <Text style={styles.label}>Card Number</Text>
        <TextInput
          style={styles.input}
          value={cardNumber}
          onChangeText={setCardNumber}
          placeholder="1234 5678 9012 3456"
          keyboardType="numeric"
        />
        <Text style={styles.label}>Expiry Date</Text>
        <TextInput
          style={styles.input}
          value={expiryDate}
          onChangeText={setExpiryDate}
          placeholder="MM/YY"
          keyboardType="numeric"
        />
        <Text style={styles.label}>CVV</Text>
        <TextInput
          style={styles.input}
          value={cvv}
          onChangeText={setCVV}
          placeholder="123"
          keyboardType="numeric"
          maxLength={3}
        />
      </View>
      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Pay Now</Text>
        <Ionicons name="arrow-forward" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
});

export default PayScreen;




