import type { IEvent } from '~/domain';

export type RootParamList = {
  Login: undefined;
  Main: undefined;
  Signup: undefined;
  ProfileScreen: undefined;
  EditProfile: undefined;
  Home: undefined;
  MyEventsScreen: undefined;
  HomeScreen: undefined;
  EventScreen: { event: IEvent };
};

export type TabParamList = {
  Home: undefined;
  Profile: undefined;
};
