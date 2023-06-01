import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import type React from 'react';

import { useApplicationLayer } from '~/hooks';
import { LoginScreen, RegisterScreen } from '~/views';

import type { RootParamList } from './root-params';
import { TabNavigator } from './tab-navigator';

const Stack = createStackNavigator<RootParamList>();

export const RootNavigator: React.FC = observer(() => {
  const {
    controllers: { UserController },
  } = useApplicationLayer();
  const userIsLoggedIn = UserController.isLoggedIn;
  if (userIsLoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            component={TabNavigator}
            name="Main"
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            component={LoginScreen}
            name="Login"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            component={RegisterScreen}
            name="Signup"
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
});
