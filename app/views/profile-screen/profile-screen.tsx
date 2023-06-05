import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Text, View, Image, Button, TouchableOpacity, ScrollView } from 'react-native';


import { Text as TraductionText } from '~/components/text';
import { useApplicationLayer } from '~/hooks';
import { useLanguageContext } from '~/hooks/use-language/use-language';
import type { RootParamList } from '~/navigation';

import { ProfileScreenStyles as Styles } from './profile-screen.styles';

type ProfileNavigation = StackNavigationProp<RootParamList, 'Profile'>;
// type EventScreenNavigation = StackNavigationProp<RootParamList, 'EditProfile'>;
// type ShowFriendsNavigation = StackNavigationProp<TabParamList, 'ShowFriendsScreen'>;

// type ShowFollowersNavigation = StackNavigationProp<RootParamList, 'ShowFollowers'>;

export const ProfileScreen = observer(() => {
  const {
    controllers: { UserController },
  } = useApplicationLayer();
  const { language } = useLanguageContext();  

  useEffect((() => {}), [language]);
 

  const userInfo = UserController.userInfo;
  // const navigationFriends = useNavigation<ShowFriendsNavigation>();
  const navigationProfile = useNavigation<ProfileNavigation>();
  // const navigationfllwrs = useNavigation<ShowFollowersNavigation>();
  // const navigationBack = useNavigation<EventScreenNavigation>();


  function mostrarConfig() {
    navigationProfile.navigate('Config');
  }

  function mostrarFavoritos() {
    navigationProfile.navigate('PreferitsScreen');
  }


  
    return (
      <ScrollView style={Styles.container}>
        <TraductionText style={Styles.title} tx="perfil.miperfil"/>
        <View style={Styles.rowProfile}>
          <View style={Styles.titleData}>
            <Image src={userInfo.profilePicture} style={Styles.foto}/>
            <View style={Styles.contentData}>
              <TouchableOpacity onPress={() => { navigationProfile.navigate('ShowFollowers',{username: userInfo.username}); }}>
              <Text style={Styles.number}>{userInfo.followers.length}</Text>
              <TraductionText tx='perfil.seguidores'/>
              </TouchableOpacity>
            </View>
            <View style={Styles.contentData}>
              <TouchableOpacity onPress={() => { navigationProfile.navigate('ShowFolloweds',{username: userInfo.username}); }}>
              <Text style={Styles.number}>{userInfo.followeds.length}</Text>
              <TraductionText tx='perfil.siguiendo'/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={Styles.username}>{userInfo.username}</Text>
        <View style={Styles.row}>
          <View style={Styles.column}>
            <TraductionText style={Styles.titleRow} tx='perfil.nombre'/>
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
          <TouchableOpacity  style={Styles.panelConfig} onPress={() => { mostrarFavoritos(); }}>
            <Image source={require('../../../assets/star-logo.png')} style={Styles.icon}/>
            <TraductionText style={Styles.configText} tx="perfil.favoritos"/>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.panelConfig}onPress={() => { mostrarConfig(); }}>
            <Image source={require('../../../assets/config-logo.png')} style={Styles.icon} />
            <TraductionText style={Styles.configText} tx="perfil.configuracion"/>
          </TouchableOpacity>
          <View style={Styles.panelConfig}>
            <Image source={require('../../../assets/card-logo.png')} style={Styles.icon}/>
            <TraductionText style={Styles.configText} tx="perfil.pagos"/>
          </View>
          <TouchableOpacity  style={Styles.panelConfig} onPress={() => { navigationProfile.navigate('ShowFriends'); }}>
            <Image source={require('../../../assets/friend-logo.png')} style={Styles.icon}/>
            <TraductionText style={Styles.configText} tx="perfil.amigos"/>
          </TouchableOpacity>
        </View>
      </ScrollView>
    
  );
});

