import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Text, View, Image, Button, TouchableOpacity } from 'react-native';
import { Text as TraductionText } from '~/components';
import { useApplicationLayer } from '~/hooks';
import { ProfileScreenStyles as Styles } from './profile-screen.styles';
import { RootParamList, TabParamList } from '~/navigation';

type ProfileNavigation = StackNavigationProp<RootParamList, 'Profile'>;

type ShowFriendsNavigation = StackNavigationProp<TabParamList, 'ShowFriendsScreen'>;

export const ProfileScreen = observer(() => {
  const {
    controllers: { UserController },
  } = useApplicationLayer();
  

  const userInfo = UserController.userInfo;
  const navigationFriends = useNavigation<ShowFriendsNavigation>();
  const navigationProfile = useNavigation<ProfileNavigation>();
  function mostrarViewAmigos() {
    navigationFriends.navigate('ShowFriends');
  }

  function mostrarFavoritos() {
    navigationProfile.navigate('PreferitsScreen');
  }

    return (
      <View style={Styles.container}>
        <TraductionText style={Styles.title} tx="perfil.miperfil"/>
        <View style={Styles.rowProfile}>
          <View style={Styles.titleData}>
            <Image src={userInfo.profilePicture} style={Styles.foto}/>
            <View style={Styles.contentData}>
              <Text style={Styles.number}>{userInfo.followeds.length}</Text>
              <TraductionText tx='perfil.seguidores'/>
            </View>
            <View style={Styles.contentData}>
              <Text style={Styles.number}>{userInfo.followers.length}</Text>
              <TraductionText tx='perfil.siguiendo'/>
            </View>
          </View>
        </View>
        <Text style={Styles.username}>{userInfo.username}</Text>
        <View style={Styles.row}>
          <View style={Styles.column}>
            <TraductionText tx='perfil.nombre' style={Styles.titleRow}/>
          </View>
          <View style={Styles.column}>
            <Text>{userInfo.name}</Text>
          </View>
        </View>
        <View style={Styles.row}>
          <View style={Styles.column}>
            <TraductionText style={Styles.titleRow} tx='perfil.email'/>
          </View>
          <View style={Styles.column}>
            <Text>{userInfo.email}</Text>
          </View>
        </View>
        <View style={Styles.row}>
          <View style={Styles.column}>
            <TraductionText style={Styles.titleRow} tx='perfil.telephone'/>
          </View>
          <View style={Styles.column}>
            <Text>{userInfo.phoneNumber}</Text>
          </View>
        </View>
        <View style={Styles.editButton}>
        <Button
          color="#34b38a"
          title="Editar"
          onPress={() => navigationProfile.navigate('EditProfile')}
        ></Button>
        </View>
        <View style={Styles.containerInfo}>
          <TouchableOpacity  style={Styles.panelConfig} onPress={() => { mostrarFavoritos() }}>
            <Image source={require('../../../assets/star-logo.png')} style={Styles.icon}/>
            <TraductionText style={Styles.configText} tx="perfil.favoritos"/>
          </TouchableOpacity>
          <View style={Styles.panelConfig}>
            <Image source={require('../../../assets/config-logo.png')} style={Styles.icon} />
            <TraductionText style={Styles.configText} tx="perfil.configuracion"/>
          </View>
          <View style={Styles.panelConfig}>
            <Image source={require('../../../assets/card-logo.png')} style={Styles.icon}/>
            <TraductionText style={Styles.configText} tx="perfil.pagos"/>
          </View>
          <TouchableOpacity  style={Styles.panelConfig} onPress={() => { mostrarViewAmigos() }}>
            <Image source={require('../../../assets/friend-logo.png')} style={Styles.icon}/>
            <TraductionText style={Styles.configText} tx="perfil.amigos"/>
          </TouchableOpacity>
        </View>
      </View>
    
  );
});

