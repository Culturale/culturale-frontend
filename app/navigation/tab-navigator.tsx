import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootParamList, TabParamList } from './root-params';
import { ShowFriendsScreen } from '~/views/showFriends-screen';
import { EditProfileScreen, ProfileScreen, HomeScreen, EventScreen, MyEventsScreen} from '~/views';

const ProfileStack = createStackNavigator<RootParamList>();
const Tab = createMaterialBottomTabNavigator<TabParamList>();


const ProfileStackNavigator: React.FC = observer(() => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        component={ProfileScreen}
        name="ProfileScreen"
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        component={EditProfileScreen}
        name="EditProfile"
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen component={ShowFriendsScreen} name="ShowFriends" />
    </ProfileStack.Navigator>
  );
});


const HomeStackNavigator: React.FC = observer(() => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        component={HomeScreen}
        name="HomeScreen"
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        component={EventScreen}
        name="EventScreen"
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        component={MyEventsScreen}
        name="MyEventsScreen"
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
});

export const TabNavigator: React.FC = observer(() => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: 'tomato',
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={17} />;
        },
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          display: 'none',
        },
      })}
    >
      <Tab.Screen component={HomeStackNavigator} name="Home" />
      <Tab.Screen component={MyEventsScreen} name="Mis Eventos" />
      <Tab.Screen component={ProfileStackNavigator} name="Profile" />
    </Tab.Navigator>
  );
});

