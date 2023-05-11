import React from 'react';
import { View, Text, Image } from 'react-native';
import { observer } from 'mobx-react-lite';
import { ShowFriendsStyles as styles } from './showFriends-screen.styles';
import { IUser } from '~/domain';
import { useApplicationLayer } from '~/hooks';


export const ShowFriendsScreen = observer(() => {
  const {
    controllers: {UserController},
  } = useApplicationLayer();

  const amigos: IUser[] = UserController.userInfo.followers.filter(user => {
    const userString = JSON.stringify(user);
    return UserController.userInfo.followeds.some(followed => {
      const followedString = JSON.stringify(followed);
      return userString === followedString;
    });
  });
  console.log(amigos)
  const userInfo = UserController.userInfo;
  if(amigos.length > 0){
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Mis amigos</Text>
        <View style={styles.listContainer}>
          {amigos.map((amigo) => (
            <View key={amigo.username} style= {styles.userContainer} >
             <Image src={amigo.profilePicture} style={ styles.foto}/>
              <Text style={styles.username}> {amigo.username}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
else{
    return ( 
      <View style={styles.container}>
      <Text style={styles.header}>Mis amigos</Text>
      <Text style={styles.noFriendsMessage}>
        <Text >¡Esto está muy vacío!</Text>
        <Text> Añade a gente nueva para empezar esta aventura </Text>
      </Text>
    </View>
);
}

});

