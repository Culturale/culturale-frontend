import React, { useState } from 'react';
import { View, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';
import { ShowFriendsStyles as styles } from './showFriends-screen.styles';
import { IUser } from '~/domain';
import { useApplicationLayer } from '~/hooks';
import { Text } from '~/components/text';
import { useNavigation } from '@react-navigation/native';
import {  TabParamList } from '~/navigation';
import { StackNavigationProp } from '@react-navigation/stack';



type UserNavigation = StackNavigationProp<TabParamList, 'ShowUserScreen'>;

export const ShowFriendsScreen = observer(() => {
  const {
    controllers: { UserController },
  } = useApplicationLayer();
  
  // Obtiene el objeto de navegación
  const navigationUser = useNavigation<UserNavigation>();

  const handleRemoveFriend = async (friendUsername: string) => {
      UserController.removeFriend(UserController.userInfo.username, friendUsername);
    
  }
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
        <Text style={styles.header} tx="showFriendsScreen.myfriends" />
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
        <Text style={styles.header}>Mis amigos</Text>
        <Text style={styles.noFriendsMessage}>
          <Text tx =" showFriendsScreen.vacio"/>
          <Text tx="showFriendsScreen.noFriends" />
        </Text>
      </View>
    );
  }
});
