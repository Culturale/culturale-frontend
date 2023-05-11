import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { observer } from 'mobx-react-lite';

import { ProfileScreen } from '~/views';
import HomeScreen from '~/views/HomeScreen';
import { RootParamList, TabParamList } from './root-params';
import { createStackNavigator } from '@react-navigation/stack';
import { ShowFriendsScreen } from '~/views/showFriends-screen';
const ProfileStack = createStackNavigator<RootParamList>();
const Tab = createMaterialBottomTabNavigator<TabParamList>();
const ProfileStackNavigator: React.FC = observer(() => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen component={ProfileScreen} name="Profile" />
      <ProfileStack.Screen component={ShowFriendsScreen} name="ShowFriends" />
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

