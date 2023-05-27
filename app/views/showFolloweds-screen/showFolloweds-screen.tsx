import React, { useState } from 'react';
import { View, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';
import { ShowFriendsStyles as styles } from './showFolloweds-screen.styles';
import { IUser, User } from '~/domain';
import { useApplicationLayer } from '~/hooks';
import { Text } from '~/components/text';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {  RootParamList, TabParamList } from '~/navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';


type FollowedsNavigation = StackNavigationProp<RootParamList, 'ShowFolloweds'>;

export const ShowFollowedsScreen = observer(() => {
  const { params } = useRoute<RouteProp<TabParamList, 'ShowUserScreen'>>();
  const username = params.username;
  const { controllers: { UserController } } = useApplicationLayer();
  
  const navigationfolloweds = useNavigation<FollowedsNavigation>();

  const handleRemoveFriend = async (friendUsername: string) => {
      await UserController.removeFollowed(UserController.userInfo.username, friendUsername);
  }
  const [searchTerm, setSearchTerm] = useState('');

  const seguidos: IUser[] = UserController.findUser(username).followeds;

  const filteredAmigos = seguidos.filter((amigo) => {
    return amigo.username.toLowerCase().includes(searchTerm.toLowerCase());
  });
  console.log(UserController.userInfo.followeds.length, UserController.userInfo.followeds )
  console.log(username, seguidos.length)
  if (seguidos.length > 0) {
    return (
      <View style={styles.container}>
        <View style={styles.backArrow}>
          <TouchableOpacity onPress={() => navigationfolloweds.navigate('ProfileScreen')}>
              <Ionicons color="black" name="arrow-back" size={24} />
            </TouchableOpacity>
        </View>
        <Text style={styles.header} tx="ShowFollowedsScreen.followeds" />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={searchTerm}
          onChangeText={(value) => setSearchTerm(value)}
        />
        <ScrollView style={styles.listContainer}>
          {filteredAmigos.map((amigo) => (
            <TouchableOpacity
              key={amigo.username}
              style={styles.userContainer}
              onPress={() => navigationfolloweds.navigate('ShowUserScreen', { username: amigo.username })}
            >
              <View style={styles.mostraramigo}>
                <Image src={amigo.profilePicture} style={styles.foto} />
                <Text style={styles.username} text={amigo.username} />
              </View>
              <TouchableOpacity onPress={() => handleRemoveFriend(amigo.username)}>
                <Text style={styles.removeButton} tx="ShowFollowedsScreen.delete" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.backArrow}>
          <TouchableOpacity onPress={() => navigationfolloweds.navigate('ProfileScreen')}>
              <Ionicons color="black" name="arrow-back" size={24} />
            </TouchableOpacity>
        </View>
      <Text style={styles.header} tx="ShowFollowedsScreen.followeds" />
          <Text style={styles.noFriendsMessage} tx ="ShowFollowedsScreen.vacio"/>
          <Text style={styles.noFriendsMessage} tx="ShowFollowedsScreen.noFriends" />

      </View>
    );
  }
});
