export type RootParamList = {
  Login: undefined;
  Main: undefined;
  Signup: undefined;  
  ShowFriends:undefined;
  Profile: undefined;
  ProfileScreen: undefined;
  EditProfile: undefined;
  Home: undefined;
  ChatScreen: { event: IEvent };
  EventScreen: { eventId: string };
  MyEventsScreen: undefined;
  HomeScreen: undefined;
};

export type TabParamList = {
  Home: undefined;
  Profile: undefined;
  ShowFriendsScreen: undefined;
};
