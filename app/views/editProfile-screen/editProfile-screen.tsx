import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import { observer } from 'mobx-react-lite';
import type React from 'react';
import { useState } from 'react';
import { View, TextInput, Text as TextDynamic, TouchableOpacity, Image, Alert ,} from 'react-native';

import { Text } from '~/components';
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
      userInfo._id,
      userInfo.username,
      userInfo.name,
      userInfo.email,
      userInfo.phoneNumber,
      userInfo.usertype,
      userInfo.profilePicture,
    );
    setEditingField('');
    setEditValue('');
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
      aspect: [1, 1], 
      base64: true, 
      quality: 1,
    });

    if (!pickerResult.canceled) {
      try{
      const asset = pickerResult.assets[0];
      await UserController.uploadPhoto(asset);
      const newPhoto = `https://projecteaws.s3.eu-west-3.amazonaws.com/${userInfo.username}`;
      UserController.setProfilePicture(newPhoto);
      setEditingField('');
      setEditValue('');
      handleSaveField();
      }catch(e){
        // eslint-disable-next-line no-console
        console.error(e);
      }
      // UserController.setProfilePicture(photo);
     
    }
  };

  const handleClearField = () => {
    setEditValue('');
    setEditingField('');
  };

  return (
    <View style={Styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
        <Ionicons color="black" name="arrow-back" size={24} />
      </TouchableOpacity>
      <Text style={Styles.title}  tx='editProfileScreen.editProfile'/>
      <TouchableOpacity onPress={handleChooseProfilePicture}>
        <Image src={userInfo.profilePicture} style={Styles.profilePicture} />
        <Text style={Styles.changePhotoTxt}  tx='editProfileScreen.changePhoto'/>
      </TouchableOpacity>
      <View style={Styles.rows}>
        
        <View style={Styles.row}>
          <View style={Styles.column}>
            <Text style={Styles.titleRow} tx='editProfileScreen.name'/>
          </View>
          <View style={Styles.column}>
            <TouchableOpacity onPress={() => handleEditField('nombre')}>
              <TextDynamic>{userInfo.name}</TextDynamic>
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.row}>
          <View style={Styles.column}>
            <Text style={Styles.titleRow} tx='editProfileScreen.email'/>
          </View>
          <View style={Styles.column}>
            <TouchableOpacity onPress={() => handleEditField('email')}>
              <TextDynamic>{userInfo.email}</TextDynamic>
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.row}>
          <View style={Styles.column}>
            <Text style={Styles.titleRow}  tx='editProfileScreen.telephone'/>
          </View>
          <View style={Styles.column}>
            <TouchableOpacity onPress={() => handleEditField('telefono')}>
              <TextDynamic>{userInfo.phoneNumber}</TextDynamic>
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
            <TextDynamic>X</TextDynamic>
          </TouchableOpacity>
        </View>
      )}
      {editingField !== '' && 
      <View style={Styles.buttons}>
        {editingField !== '' && (
          <TouchableOpacity
          style={Styles.cancelButton}
          onPress={handleClearField}
        >
          {editingField && <Text tx='editProfileScreen.buttonCancel'/>}
        </TouchableOpacity>
        )}
        {editingField !== '' && (
           <TouchableOpacity style={Styles.saveButton} onPress={handleSaveField}>
           {editingField && <Text tx='editProfileScreen.buttonSave'/>}
         </TouchableOpacity>
        )}
      </View>
      }
    </View>
  );
});
