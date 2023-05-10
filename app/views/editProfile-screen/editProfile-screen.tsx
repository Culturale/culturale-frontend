import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import type React from 'react';
import { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { useApplicationLayer } from '~/hooks';
import type { RootParamList } from '~/navigation';

import type { EditProfileScreenProps as Props } from './editProfile-screen.props';
import { EditProfileScreenStyles as Styles } from './editProfile-screen.styles';

type EditProfileNavigation = StackNavigationProp<RootParamList, 'EditProfile'>;

export const EditProfileScreen: React.FC<Props> = observer(() => {
    const {
      controllers: { UserController },
    } = useApplicationLayer();
    const userInfo = UserController.userInfo;
    const navigation = useNavigation<EditProfileNavigation>();
  
    const [editingField, setEditingField] = useState('');
    const [editValue, setEditValue] = useState('');
  
    const handleEditField = (field: string) => {
      setEditingField(field);
      setEditValue(getFieldValue(field));
    };
  
    const getFieldValue = (field: string) => {
      switch (field) {
        case 'nombre':
          return userInfo.name;
        case 'email':
          return userInfo.email;
        case 'telefono':
          return userInfo.phoneNumber;
        default:
          return '';
      }
    };
    const handleSaveField = async () => {
      switch (editingField) {
        case 'nombre':
          userInfo.name = editValue;
          break;
        case 'email':
          userInfo.email = editValue;
          break;
        case 'username':
          userInfo.username = editValue;
          break;
        case 'telefono':
          userInfo.phoneNumber = editValue;
          break;
      }
      await UserController.modifyUser(userInfo.name, 
        userInfo.password, 
        userInfo.email, 
        userInfo.phoneNumber, 
        userInfo.usertype,
        userInfo.profilePicture
      );
      setEditingField('');
      setEditValue('');
    };
  
    const handleClearField = () => {
      setEditValue('');
    };
  
    return (
      <View style={Styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons color="black" name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={Styles.title}>Editar perfil</Text>
        <View style={Styles.rows}>
        <View style={Styles.row}>
          <View style={Styles.column}>
            <Text style={Styles.titleRow}>Nombre Usuario:</Text>
          </View>
          <View style={Styles.column}>
            <TouchableOpacity onPress={() => handleEditField('username')}>
              <Text>{userInfo.username}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.row}>
          <View style={Styles.column}>
            <Text style={Styles.titleRow}>Nombre:</Text>
          </View>
          <View style={Styles.column}>
            <TouchableOpacity onPress={() => handleEditField('nombre')}>
              <Text>{userInfo.name}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.row}>
          <View style={Styles.column}>
            <Text style={Styles.titleRow}>Correo electrónico:</Text>
          </View>
          <View style={Styles.column}>
            <TouchableOpacity onPress={() => handleEditField('email')}>
              <Text>{userInfo.email}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.row}>
          <View style={Styles.column}>
            <Text style={Styles.titleRow}>Teléfono:</Text>
          </View>
          <View style={Styles.column}>
            <TouchableOpacity onPress={() => handleEditField('telefono')}>
              <Text>{userInfo.phoneNumber}</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
        {editingField !== '' && (
          <View style={Styles.editInputContainer}>
            <TextInput
              placeholder={`Editar ${editingField}`}
              value={editValue}
              onChangeText={setEditValue}
            />
                <TouchableOpacity onPress={handleClearField}>
                <Text>X</Text>
                </TouchableOpacity>
          </View>
        )}
        <View style={Styles.buttons}>
            {editingField !== '' && 
            <TouchableOpacity style={Styles.saveButton}onPress={handleSaveField}>
            {editingField && <Text>Guardar</Text>}
            </TouchableOpacity>}
            {editingField !== '' && 
            <TouchableOpacity style={Styles.cancelButton}onPress={handleSaveField}>
            {editingField && <Text>Cancelar</Text>}
            </TouchableOpacity>}
        </View>
      </View>
    );
  });
  