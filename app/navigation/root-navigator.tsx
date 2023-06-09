import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import type React from 'react';

import { useApplicationLayer } from '~/hooks';
import { LoginScreen, RegisterScreen, ChatScreen } from '~/views';

import type { RootParamList } from './root-params';
import { TabNavigator } from './tab-navigator';
import { TabNavigatorEmpresa } from './tab-navigator-empresa';


const Stack = createStackNavigator<RootParamList>();

export const RootNavigator: React.FC = observer(() => {
  const {
    controllers: { UserController },
  } = useApplicationLayer();
  const userIsLoggedIn = UserController.isLoggedIn;
  const type = userIsLoggedIn ? UserController.userInfo.usertype : undefined;
  console.log(type);
  if (userIsLoggedIn && type === 'usuario') {
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
          <Stack.Screen
            component={ChatScreen} // Add ChatScreen as a screen
            name="ChatScreen"
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else if (userIsLoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            component={TabNavigatorEmpresa}
            name="Empresa"
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
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
