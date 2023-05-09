import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { observer } from 'mobx-react-lite';

import HomeScreen from '~/views/HomeScreen';
import { ProfileScreen } from '~/views/profile-screen/profile-screen';

import type { TabParamList } from './root-params';

const Tab = createMaterialBottomTabNavigator<TabParamList>();

export const TabNavigator: React.FC = observer(() => {
  return (
    <Tab.Navigator>
      <Tab.Screen component={HomeScreen} name="Home" />
      <Tab.Screen component={ProfileScreen} name="Profile" />
    </Tab.Navigator>
  );
});
