import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { View, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';

import { Text  } from '~/components/text';
import type { IUser } from '~/domain';
import { useApplicationLayer } from '~/hooks';
import type {  RootParamList } from '~/navigation';

import { ShowFriendsStyles as styles } from './showFriends-screen.styles';




type FriendsNavigation = StackNavigationProp<RootParamList, 'ShowFriends'>;

export const ShowFriendsScreen = observer(() => {
  const {
    controllers: { UserController },
  } = useApplicationLayer();
  
  // Obtiene el objeto de navegación
  const navigationUser = useNavigation<FriendsNavigation  >();
 

  const handleRemoveFriend = async (friendUsername: string) => {
      UserController.removeFollowed(UserController.userInfo.username, friendUsername);
    
  };
  
  const [searchTerm, setSearchTerm] = useState('');

  const amigos: IUser[] = UserController.userInfo.followers.filter((user) => {
    const userString = JSON.stringify(user);
    return UserController.userInfo.followeds.some((followed) => {
      const followedString = JSON.stringify(followed);
      return userString === followedString;
    });
  });

  const filteredAmigos = amigos.filter((amigo) => {
    return amigo.username.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (amigos.length > 0) {
    return (
      <View style={styles.container}>
        <View style={styles.backArrow}>
          <TouchableOpacity onPress={() => navigationUser.navigate('ProfileScreen')}>
              <Ionicons color="black" name="arrow-back" size={24} />
            </TouchableOpacity>
        </View>
        <Text style={styles.header} tx="showFriendsScreen.myfriends" />
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={searchTerm}
          onChangeText={(value) => setSearchTerm(value)}
        />
        <ScrollView style={styles.listContainer}>
          {filteredAmigos.map((amigo) => (
            <TouchableOpacity
              key={amigo.username}
              style={styles.userContainer}
              onPress={() => navigationUser.navigate('ShowUserScreen', { username: amigo.username })}
            >
              <View style={styles.mostraramigo}>
                <Image src={amigo.profilePicture} style={styles.foto} />
                <Text style={styles.username} text={amigo.username} />
              </View>
              <TouchableOpacity onPress={() => handleRemoveFriend(amigo.username)}>
                <Text style={styles.removeButton} tx="showFriendsScreen.delete" />
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
          <TouchableOpacity onPress={() => navigationUser.navigate('ProfileScreen')}>
              <Ionicons color="black" name="arrow-back" size={24} />
            </TouchableOpacity>
        </View>
        <Text style={styles.header} tx="showFriendsScreen.myfriends" />
          <Text style={styles.noFriendsMessage} tx ="showFriendsScreen.vacio"/>
          <Text style={styles.noFriendsMessage} tx="showFriendsScreen.noFriends" />
      </View>
    );
  }
});
