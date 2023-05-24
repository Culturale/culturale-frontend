import { RouteProp, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Text, View, Image, Button } from 'react-native';
import { Text as TraductionText } from '~/components';
import { useApplicationLayer } from '~/hooks';
import { ShowUserStyles as Styles } from './showUser-screen.styles';
import {  TabParamList } from '~/navigation';
import type { ShowUserScreenProps as Props} from './showUser-screen.props';

export const ShowUserScreen: React.FC<Props> = observer(() => {

  const { params } = useRoute<RouteProp<TabParamList, 'ShowUserScreen'>>();
  const {
    controllers: { UserController },
  } = useApplicationLayer();
  const username = params.username;

  const user = UserController.users.filter((user)=> user?.username === username)[0];
  
  function followUser(): void {
    UserController.addFriend(UserController.userInfo.username, user);
  }
  
  function unfollowUser(): void {
    UserController.removeFriend(UserController.userInfo.username, username);
  }
  function isFollowing(): boolean {
  
    UserController.userInfo.followeds.forEach((followed) => {
      if (followed.username == user.username) {
        return false;
      }
    });
    return true;
  }
  return (
    <View style={Styles.container}>
       <View style={Styles.container}>
        <TraductionText style={Styles.title} tx="perfil.miperfil"/>
        <View style={Styles.rowProfile}>
          <View style={Styles.titleData}>
            <Image src={user.profilePicture} style={Styles.foto}/>
            <View style={Styles.contentData}>
              <Text style={Styles.number}>{user.followeds.length}</Text>
              <TraductionText tx='perfil.seguidores'/>
            </View>
            <View style={Styles.contentData}>
              <Text style={Styles.number}>{user.followers.length}</Text>
              <TraductionText tx='perfil.siguiendo'/>
            </View>
          </View>
        </View>
        <Text style={Styles.username}>{user.username}</Text>
        <View style={Styles.row}>
          <View style={Styles.column}>
            <TraductionText tx='perfil.nombre' style={Styles.titleRow}/>
          </View>
          <View style={Styles.column}>
            <Text>{user.name}</Text>
          </View>
        </View>
        <View style={Styles.row}>
          <View style={Styles.column}>
            <TraductionText style={Styles.titleRow} tx='perfil.email'/>
          </View>
          <View style={Styles.column}>
            <Text>{user.email}</Text>
          </View>
        </View>
        <View style={Styles.row}>
          <View style={Styles.column}>
            <TraductionText style={Styles.titleRow} tx='perfil.telephone'/>
          </View>
          <View style={Styles.column}>
            <Text>{user.phoneNumber}</Text>
          </View>
        </View>
        <View style={Styles.followButton}>
        <Button
          color={isFollowing() ? "#ff0000" : "#34b38a"}
          title={isFollowing() ? "Unfollow" : "Follow"}
          onPress={() => (isFollowing() ? unfollowUser() : followUser())}
        ></Button>
        </View>
        
      </View>
    

    </View>
  );
});
