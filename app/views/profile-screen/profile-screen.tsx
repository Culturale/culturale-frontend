
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Text,
  View,
  Image,
  Button,
} from 'react-native';

import { UserController } from '~/application/controllers';
import { useApplicationLayer } from '~/hooks';

import { ProfileScreenStyles as Styles } from './profile-screen.styles';

export const ProfileScreen = observer(() => {
  const user = UserController;
  const {
    controllers: {userController},
  } = useApplicationLayer();
  
    return (
      <View style={Styles.container}>
        <Text style={Styles.title}>Mi perfil</Text>
        <View style={Styles.rowProfile}>
          <View style={Styles.titleData}>
            <Image source={require('../../../assets/logo.png')} style={Styles.foto}/>
            <View style={Styles.contentData}>
              <Text style={Styles.number}>30</Text>
              <Text>Amigos</Text>
            </View>
            <View style={Styles.contentData}>
              <Text style={Styles.number}>30</Text>
              <Text>Reviews</Text>
            </View>
          </View>
        </View>
        <Text style={Styles.username}>elsaboix23</Text>
        <View style={Styles.row}>
          <View style={Styles.column}>
            <Text style={Styles.titleRow}>Nombre:</Text>
          </View>
          <View style={Styles.column}>
            <Text>Elsa Boix</Text>
          </View>
        </View>
        <View style={Styles.row}>
          <View style={Styles.column}>
            <Text style={Styles.titleRow}>Correo electronico:</Text>
          </View>
          <View style={Styles.column}>
            <Text>elsa.boix@gmail.com</Text>
          </View>
        </View>
        <View style={Styles.row}>
          <View style={Styles.column}>
            <Text style={Styles.titleRow}>Teléfono</Text>
          </View>
          <View style={Styles.column}>
            <Text>664753053</Text>
          </View>
        </View>
        <View style={Styles.editButton}>
              <Button  color="white" title='Editar'></Button>
        </View>
        <View style={Styles.containerInfo}>
          <View style={Styles.panelConfig}>
            <Image source={require('../../../assets/config-logo.png')} style={Styles.icon} />
            <Text style={Styles.configText}>Configuracion</Text>
          </View>
          <View style={Styles.panelConfig}>
            <Image source={require('../../../assets/card-logo.png')} style={Styles.icon}/>
            <Text style={Styles.configText}>Pagos</Text>
          </View>
          <View style={Styles.panelConfig}>
            <Image source={require('../../../assets/friend-logo.png')} style={Styles.icon}/>
            <Text style={Styles.configText}>Mis amigos</Text>
          </View>
        </View>
      </View>
    );
});