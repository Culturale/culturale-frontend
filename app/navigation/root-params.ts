import type { IEvent } from '~/domain';

export type RootParamList = {
  Login: undefined;
  Main: undefined;
  Signup: undefined;
  ProfileScreen: undefined;
  EditProfile: undefined;
  Home: undefined;
  PayScreen: { event: IEvent };
  EventScreen: { event: IEvent };
};

export type TabParamList = {
  Home: undefined;
  Profile: undefined;
};
