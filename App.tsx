<<<<<<< HEAD
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
=======
import * as React from 'react';

import { Application } from './app/application/application';
import type { IApplication } from './app/application/application.interface';
import { ApplicationLayerProvider } from './app/hooks/use-application-layer';
import { RootNavigator } from './app/navigation';
>>>>>>> 4a466f02da4c98892751edb7ce98c70d2726cf9f

export default function App() {
  const [applicationLayer, setApplicationLayer] = React.useState<
    IApplication | undefined
  >(undefined);

  React.useEffect(() => {
    (async () => {
      if (!applicationLayer) {
        const app = new Application();
        await app.setup();
        setApplicationLayer(app);
      }
    })();
  }, []);

  if (!applicationLayer) return null;

  return (
    <ApplicationLayerProvider value={applicationLayer}>
      <RootNavigator />
    </ApplicationLayerProvider>
  );
}
