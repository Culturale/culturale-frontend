import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';

import {EditProfileScreen, ProfileScreen} from '~/views';
import HomeScreen from '~/views/HomeScreen';

import type { RootParamList, TabParamList } from './root-params';

const ProfileStack = createStackNavigator<RootParamList>();
const Tab = createMaterialBottomTabNavigator<TabParamList>();

const ProfileStackNavigator: React.FC = observer(() => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen component={ProfileScreen} name="Profile"  options={{headerShown: false}}/>
      <ProfileStack.Screen component={EditProfileScreen} name="EditProfile" options={{headerShown: false}}/>
    </ProfileStack.Navigator>
  );
});

export const TabNavigator: React.FC = observer(() => {
  return (
    <Tab.Navigator>
    <Tab.Screen component={HomeScreen} name="Home" />
    <Tab.Screen
      component={ProfileStackNavigator}
      name="Profile"
      options={{ tabBarLabel: 'Profile' }}
    />
  </Tab.Navigator>
  );
});
