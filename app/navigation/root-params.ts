import type { IEvent } from '~/domain';

export type RootParamList = {
  Login: undefined;
  Main: undefined;
  Signup: undefined;  
  ShowFriends:undefined;
  Profile: undefined;
  ProfileScreen: undefined;
  EditProfile: undefined;
  Home: undefined;
  MyEventsScreen: undefined;
  HomeScreen: undefined;
  EventScreen: { eventId: string};
  PreferitsScreen: undefined;
  ValoracioScreen: { event: IEvent};
  MapScreen: undefined;
  Config: undefined;
};

export type TabParamList = {
  Home: undefined;
  Profile: undefined;
  ShowFriendsScreen: undefined;
  MyEvents: undefined;
  Map: undefined;
};
