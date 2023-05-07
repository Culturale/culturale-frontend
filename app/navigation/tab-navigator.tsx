import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { observer } from 'mobx-react-lite';
import { TabParamList } from './root-params';
import HomeScreen from '~/views/HomeScreen';

const Tab = createMaterialBottomTabNavigator<TabParamList>();

export const TabNavigator: React.FC = observer(() => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
});
