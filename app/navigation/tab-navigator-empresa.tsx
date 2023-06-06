
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';

import { NewEventScreen } from '~/views/empresa';
import { ShowReportsScreen } from '~/views/empresa';

import type { RootParamListEmpresa, TabParamListEmpresa } from './root-params-empresa';

const ProfileStackEmpresa = createStackNavigator<RootParamListEmpresa>();
const TabEmpresa = createMaterialBottomTabNavigator<TabParamListEmpresa>();

export const TabNavigatorEmpresa: React.FC = observer(() => {
  return (
    <TabEmpresa.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: 'tomato',
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === 'NewEvent') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'ShowReportsReviews') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'ShowReportsUser') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={24} color={'black'} />;
        },
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          display: 'none',
        },
      })}
    >
      <ProfileStackEmpresa.Screen component={NewEventScreen} name="NewEvent" />
      <ProfileStackEmpresa.Screen component={ShowReportsScreen} name="ShowReportsReviews" />
    </TabEmpresa.Navigator>
  );
});