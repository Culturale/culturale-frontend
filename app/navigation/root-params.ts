import type { IEvent } from '~/domain';

export type RootParamList = {
  Login: undefined;
  Main: undefined;
  Signup: undefined;  
  ShowFriends:undefined;

  ProfileScreen: undefined;
  EditProfile: undefined;
  Home: undefined;
  EventScreen: { event: IEvent };
};

export type TabParamList = {
  Home: undefined;
  Profile: undefined;
};
