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

export const ProfileScreen = observer(() => {
  const {
    controllers: { UserController },
  } = useApplicationLayer();
  const { language } = useLanguageContext();  

  useEffect((() => {}), [language]);
 

  const userInfo = UserController.users.filter((user)=> user?.username ===  UserController.userInfo.username)[0];
  
  const navigationProfile = useNavigation<ProfileNavigation>();


  function mostrarConfig() {
    navigationProfile.navigate('Config');
  }

  function mostrarFavoritos() {
    navigationProfile.navigate('PreferitsScreen');
  }


  
    return (
      <>
      <View style={Styles.titleContainer}>
        <TraductionText style={Styles.titleProfile} tx="perfil.miperfil"/>
        </View>
      <ScrollView style={Styles.container}>
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
          <TouchableOpacity  style={Styles.panelConfig} onPress={() => { navigationProfile.navigate('ShowFriends'); }}>
            <Image source={require('../../../assets/friend-logo.png')} style={Styles.icon}/>
            <TraductionText style={Styles.configText} tx="perfil.amigos"/>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </>
    
  );
});

