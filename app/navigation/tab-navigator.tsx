import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { observer } from 'mobx-react-lite';

import HomeScreen from '~/views/home-screen/home-screen';

import type { TabParamList } from './root-params';

const Tab = createMaterialBottomTabNavigator<TabParamList>();

export const TabNavigator: React.FC = observer(() => {
  return (
    <Tab.Navigator>
      <Tab.Screen component={HomeScreen} name="Home" />
    </Tab.Navigator>
  );
});
