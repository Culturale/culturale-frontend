import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import { observer } from 'mobx-react-lite';
import type React from 'react';
import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Alert ,} from 'react-native';

import { useApplicationLayer } from '~/hooks';
import { S3Service } from '~/infrastructure/services/uploadPhoto';
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
      case 'username':
        return userInfo.username;
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
        UserController.setName(editValue);
        break;
      case 'email':
        UserController.setEmail(editValue);
        break;
      case 'username':
        UserController.setUsername(editValue);
        break;
      case 'telefono':
        UserController.setPhoneNumber(editValue);
        break;
    }
    await UserController.modifyUser(
      userInfo.username,
      userInfo.name,
      userInfo.email,
      userInfo.phoneNumber,
      userInfo.usertype,
      userInfo.profilePicture,
    );
    setEditingField('');
    setEditValue('');
    console.log('edit', editingField);
  };
  
  const handleChooseProfilePicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permiso requerido',
        '¿Quieres darle permiso a Culturale para acceder a tu biblioteca de fotos?',
        [
          {
            style: 'cancel',
            text: 'Cancelar',
          },
          {
            onPress: () => {
              ImagePicker.requestMediaLibraryPermissionsAsync();
            },
            text: 'Permitir',
          },
        ]
      );
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1], // square aspect ratio
      quality: 1, // highest quality
    });

    if (!pickerResult.canceled) {
      const uploadService = new S3Service();
      try{
        const asset = pickerResult.assets[0];
        const file = {
          data: asset.uri,
          name: 'profile-image',
          type: asset.type,
        };
        const photo = await uploadService.uploadFile(file);
        console.log(photo);
      }catch(e){
        console.error(e);
      }
      // UserController.setProfilePicture(photo);
     
    }
  };

  const handleClearField = () => {
    setEditValue('');
  };

  return (
    <View style={Styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
        <Ionicons color="black" name="arrow-back" size={24} />
      </TouchableOpacity>
      <Text style={Styles.title}>Editar perfil</Text>
      <TouchableOpacity onPress={handleChooseProfilePicture}>
        <Image src={userInfo.profilePicture} style={Styles.profilePicture} />
        <Text style={Styles.changePhotoTxt}>Cambiar foto de perfil</Text>
      </TouchableOpacity>
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
      {editingField !== '' && 
      <View style={Styles.buttons}>
        {editingField !== '' && (
          <TouchableOpacity style={Styles.saveButton} onPress={handleSaveField}>
            {editingField && <Text>Guardar</Text>}
          </TouchableOpacity>
        )}
        {editingField !== '' && (
          <TouchableOpacity
            style={Styles.cancelButton}
            onPress={handleClearField}
          >
            {editingField && <Text>Cancelar</Text>}
          </TouchableOpacity>
        )}
      </View>
      }
    </View>
  );
});
