import React from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';
import { ShowFriendsStyles as styles } from './showFriends-screen.styles';
import { IUser } from '~/domain';
import { useApplicationLayer } from '~/hooks';

export const ShowFriendsScreen = observer(() => {
  const {
    controllers: {UserController},
  } = useApplicationLayer();

  const handleRemoveFriend = async (friendId: string) => {
    // try {
    //   const response = await fetch(`/users/deleteFollowers/${friendId}`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${UserController.userInfo.token}`,
    //     },
    //   });
    //   if (!response.ok) {
    //     throw new Error('Error al eliminar amigo');
    //   }
    //   UserController.removeFriend(friendId);
    // } catch (error) {
    //   console.error(error);
    // }
  }

  const amigos: IUser[] = UserController.userInfo.followers.filter(user => {
    const userString = JSON.stringify(user);
    return UserController.userInfo.followeds.some(followed => {
      const followedString = JSON.stringify(followed);
      return userString === followedString;
    });
  });

  if(amigos.length > 0){
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Mis amigos</Text>
        <ScrollView style={styles.listContainer}>
          {amigos.map((amigo) => (
            <View key={amigo.username} style={styles.userContainer}>
              < View style={styles.mostraramigo}>
              <Image src={amigo.profilePicture} style={styles.foto} />
              <Text style={styles.username}>{amigo.username}</Text>
              </View>
              <TouchableOpacity onPress={() => handleRemoveFriend(amigo.username)}>
                <Text style={styles.removeButton}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
  else{
    return ( 
      <View style={styles.container}>
        <Text style={styles.header}>Mis amigos</Text>
        <Text style={styles.noFriendsMessage}>
          <Text>¡Esto está muy vacío!</Text>
          <Text> Añade a gente nueva para empezar esta aventura </Text>
        </Text>
      </View>
    );
  }
});
