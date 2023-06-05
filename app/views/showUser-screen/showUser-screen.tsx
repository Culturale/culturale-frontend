import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Text, View, Image, Button, TouchableOpacity } from 'react-native';
import { Text as TraductionText } from '~/components';
import { useApplicationLayer } from '~/hooks';
import { ShowUserStyles as Styles } from './showUser-screen.styles';
import {  RootParamList, TabParamList } from '~/navigation';
import type { ShowUserScreenProps as Props} from './showUser-screen.props';
import { IUser } from '~/domain';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

type ShowUserNavigation = StackNavigationProp<RootParamList, 'ShowFollowers'>;

export const ShowUserScreen: React.FC<Props> = observer(() => {

  const { params } = useRoute<RouteProp<TabParamList, 'ShowUserScreen'>>();
  const username = params.username;
  const { controllers: { UserController }} = useApplicationLayer();
  

  const user = UserController.users.filter((user)=> user?.username === username)[0];
  const navigationUsr = useNavigation<ShowUserNavigation>();

  function followUser(): void {
    UserController.followUser(UserController.userInfo.username, user);
    setFollowers(Nfollowers + 1);
  }     
  
  function unfollowUser(): void {
    UserController.removeFollowed(UserController.userInfo.username, username);
    setFollowers(Nfollowers - 1);
  }
  const [Nfollowers, setFollowers] = useState(user.followers.length);

  function isFollowing(): boolean {
    const followeds: IUser[] = UserController.userInfo.followeds;
    for (const followed of followeds) {
        if (followed.username === username) {
            return true;
        }
    }
    return false;
}
  return (
    <View style={Styles.container}>
      <View style={Styles.backArrow}>
          <TouchableOpacity onPress={() => navigationUsr.navigate('ProfileScreen')}>
              <Ionicons color="black" name="arrow-back" size={24} />
            </TouchableOpacity>
        </View>
       <View style={Styles.container}>
        <TraductionText style={Styles.title} tx="perfil.perfil"/>
        <View style={Styles.rowProfile}>
          <View style={Styles.titleData}>
            <Image src={user.profilePicture} style={Styles.foto}/>
            <View style={Styles.contentData}>
            <TouchableOpacity onPress={() => { navigationUsr.navigate('ShowFollowers',{username: user.username}) }}>
              <Text style={Styles.number}>{Nfollowers}</Text>
              <TraductionText tx='perfil.seguidores'/>
            </TouchableOpacity>
            </View>
            <View style={Styles.contentData}>
            <TouchableOpacity onPress={() => { navigationUsr.navigate('ShowFolloweds', {username: user.username}) }}>
              <Text style={Styles.number}>{user.followeds.length}</Text>
              <TraductionText tx='perfil.siguiendo'/>
            </TouchableOpacity>
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
