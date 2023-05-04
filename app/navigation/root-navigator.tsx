import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type React from 'react';

import { LoginScreen, RegisterScreen } from '~/views';

import type { RootParamList } from './root-params';
import { TabNavigator } from './tab-navigator';

const Stack = createStackNavigator<RootParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={LoginScreen} name='Login' />
        <Stack.Screen component={TabNavigator} name='Main' />
        <Stack.Screen component={RegisterScreen} name='Signup' />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
