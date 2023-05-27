import type { IEvent } from '~/domain';

export type RootParamList = {
  Login: undefined;
  Main: undefined;
  Signup: undefined;  
  ShowFriends:undefined;
  ShowFolloweds: { username: string };
  ShowFollowers: { username: string };
  Profile: undefined;
  ProfileScreen: undefined;
  EditProfile: undefined;
  Home: undefined;
  ShowUserScreen: { username: string };
  MyEventsScreen: undefined;
  HomeScreen: undefined;
  EventScreen: { eventId: string };
  ValoracioScreen: { event: IEvent};
};

export type TabParamList = {
  Home: undefined;
  Profile: undefined;
  ShowFriendsScreen: undefined;
  ShowUserScreen: { username: string };
  MyEvents: undefined;
};

