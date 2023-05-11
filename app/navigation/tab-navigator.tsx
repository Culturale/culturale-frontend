import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { EditProfileScreen, ProfileScreen, HomeScreen } from '~/views';
import { RootParamList, TabParamList } from './root-params';
import { ShowFriendsScreen } from '~/views/showFriends-screen';


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

export const TabNavigator: React.FC = observer(() => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={17} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarLabelStyle: {
          display: 'none',
        },
      })}
    >
      <Tab.Screen component={HomeScreen} name="Home" />
      <Tab.Screen component={ProfileStackNavigator} name="Profile" />
    </Tab.Navigator>
  );
});

