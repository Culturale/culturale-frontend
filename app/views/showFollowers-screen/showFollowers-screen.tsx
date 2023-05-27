import React, { useState } from 'react';
import { View, Image, ScrollView, TextInput, TouchableOpacity, Button } from 'react-native';
import { observer } from 'mobx-react-lite';
import { ShowFriendsStyles as styles } from './showFollowers-screen.styles';
import { IUser } from '~/domain';
import { useApplicationLayer } from '~/hooks';
import { Text } from '~/components/text';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {  RootParamList, TabParamList } from '~/navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// type EventScreenNavigation = StackNavigationProp<RootParamList, 'Profile'>;
type fllrsNavigation = StackNavigationProp<RootParamList, 'ShowFollowers'>;

export const ShowFollowersScreen = observer(() => {
  const { controllers: { UserController }} = useApplicationLayer();
  const navigationFollowers = useNavigation<fllrsNavigation>();

  const [searchTerm, setSearchTerm] = useState('');
  
  const { params } = useRoute<RouteProp<TabParamList, 'ShowUserScreen'>>();
  const username = params.username;
  const followers: IUser[] = UserController.findUser(username).followers;

  const filteredAmigos = followers.filter((amigo) => {
    return amigo.username.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // funciones 

  function followUser(user: IUser): void {
    UserController.followUser(UserController.userInfo.username, user);
  }     
  
  function unfollowUser(username: string): void {
    console.log("unfollow user")
    UserController.removeFollowed(UserController.userInfo.username, username);
  }

  function isFollowing(follower: string): boolean {
    const followeds: IUser[] = UserController.userInfo.followeds;
    for (const followed of followeds) {
        if (followed.username === follower) {
            return true;
        }
    }
    return false;
}
console.log(followers.length, "followers length")
  if (followers.length > 0) {
    return (
      <View style={styles.container}>
        <View style={styles.backArrow}>
          <TouchableOpacity onPress={() => navigationFollowers.navigate('ProfileScreen')}>
              <Ionicons color="black" name="arrow-back" size={24} />
            </TouchableOpacity>
        </View>
        <Text style={styles.header} tx="ShowFollowersScreen.followers" />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={searchTerm}
          onChangeText={(value) => setSearchTerm(value)}
        />
        <ScrollView style={styles.listContainer}>
          {filteredAmigos.map((follower) => (
            <TouchableOpacity
              key={follower.username}
              style={styles.userContainer}
              onPress={() => navigationFollowers.navigate('ShowUserScreen', { username: follower.username })}
            >
              <View style={styles.mostraramigo}>
                <Image src={follower.profilePicture} style={styles.foto} />
                <Text style={styles.username} text={follower.username} />
              </View>
              <Button
                color={isFollowing(follower.username) ? "#DC143C" : "#34b38a"}
                title={isFollowing(follower.username) ? "Unfollow" : "  Follow    "}
                onPress={() => (isFollowing(follower.username) ? unfollowUser(follower.username) : followUser(follower))}
            ></Button>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.backArrow}>
          <TouchableOpacity onPress={() => navigationFollowers.navigate('ProfileScreen')}>
              <Ionicons color="black" name="arrow-back" size={24} />
            </TouchableOpacity>
        </View>
        <Text style={styles.header} tx="ShowFollowersScreen.followers" />
          <Text style={styles.noFriendsMessage} tx ="ShowFollowersScreen.vacio"/>
          <Text style={styles.noFriendsMessage} tx="ShowFollowersScreen.noFriends" />
      </View>
    );
  }
});
