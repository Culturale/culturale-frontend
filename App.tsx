import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import LoginScreen from "./app/views/login";
import RegisterScreen from "./app/views/register";
import ChatScreen from "./app/views/chat";
import HomeScreen from "./app/views/HomeScreen";
import MainContainer from "./app/views/mainContainer";
import EventInfoScreen from "./app/views/InfoEventScreen";
import { Text, View } from "react-native";
import EventsScreen from "~/views/EventsScreen";

export type RootStackParamList = {
  Main: undefined;
  Chat: undefined;
  Home: undefined;
  EventInfo: {event: Event};
  Login: undefined;
  Register: undefined;
  Events: undefined;


};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {

  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    AsyncStorage.getItem('token').then((value) => {
      setToken(value);
      console.log(value);
      
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    );
  }


  return (
    
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {token ? (
          <>
            <Stack.Screen name="Main" component={MainContainer} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="EventInfo" component={EventInfoScreen} />
            <Stack.Screen name="Events" component={EventsScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>


  );
}
