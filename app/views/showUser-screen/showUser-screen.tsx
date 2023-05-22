import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Text, View, Image, Button, TouchableOpacity } from 'react-native';
import { Text as TraductionText } from '~/components';
import { useApplicationLayer } from '~/hooks';
import { ShowUserStyles as Styles } from './showUser-screen.styles';
import { IUser, User } from '~/domain';
import { RootParamList } from '~/navigation';


type ProfileScreenProps = {
  navigation: StackNavigationProp<{}>;
  route: { params: { user: IUser } };
};
type UserScreenNavigation = StackNavigationProp<RootParamList, 'ShowUserScreen'>;

export const ShowUserScreen: React.FC<ProfileScreenProps> = observer(({ route }) => {
  const navigation = useNavigation<UserScreenNavigation>();
  const { params } = useRoute<RouteProp<RootParamList, 'EventScreen'>>();
  const {
    controllers: { UserController, EventController },
  } = useApplicationLayer();
  const eventId = params.eventId;

  function followUser(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <View style={Styles.container}>
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
          title="Follow"
          onPress={() => followUser()}
        ></Button>
        </View>
      </View>
    

    </View>
  );
});
