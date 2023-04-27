import { createStackNavigator } from '@react-navigation/stack';
import { RootParamList } from './root-params';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '~/views/login-screen/login-screen';
import { TabNavigator } from './tab-navigator';
import RegisterScreen from '~/views/register';

const Stack = createStackNavigator<RootParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="Signup" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
