import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, TextInput, TouchableOpacity, Button } from 'react-native';
import { observer } from 'mobx-react-lite';
import { ShowFriendsStyles as styles } from './showContacts-screen.styles';
import { IUser } from '~/domain';
import { useApplicationLayer } from '~/hooks';
import { Text } from '~/components/text';
import {  useNavigation } from '@react-navigation/native';
import {  RootParamList, TabParamList } from '~/navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';



type fllrsNavigation = StackNavigationProp<RootParamList, 'ShowContacts'>;

export const ShowContactsScreen = observer(() => {
  const { controllers: { UserController }} = useApplicationLayer();
  const navigationContacts = useNavigation<fllrsNavigation>();

  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState<IUser[]>([]);
  
    useEffect(() => {
      requestContactPermission();
    }, []);
  
    const requestContactPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts',
            message: 'This app would like to view your contacts.',
            buttonPositive: 'Please accept, bare mortal',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Contacts permission given');
         await getContacts();

        } else {
          console.log('Contacts permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };
    
  
    const getContacts = () => {
      console.log('Getting contacts');
      Contacts.getAll()
        .then((contacts: any) => {
          const contactsWithPhoneNumbers = contacts.filter(
            (contact) => contact.phoneNumbers.length > 0
          );
          const phoneNumbers = contactsWithPhoneNumbers.map(
            (contact) => contact.phoneNumbers[0].number
          );
          console.log('Números de teléfono:', phoneNumbers);
          UserController.getContactsFromNumbers(phoneNumbers, UserController.userInfo._id);
          //console.log('Contactos:', UserController.fetchUser(UserController.userInfo.username).contacts);
          setContacts(UserController.findUserId(UserController.userInfo._id).contacts);
         
        })
        .catch((error: Error) => {
          console.log(error);
        });
    };
  

  

// Llamar a la función para solicitar los contactos
requestContactPermission();


  const filteredContacts = contacts.filter((amigo) => {
    return amigo.username.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // funciones 

  function followUser(user: IUser): void { 
    UserController.followUser(UserController.userInfo.username, user);
  }     
  
  function unfollowUser(username: string): void {
    UserController.removeFollowed(UserController.userInfo.username, username);
  }

  function isFollowing(follower: string): boolean {
    const followeds: IUser[] = UserController.userInfo.followeds;
    for (const followed of followeds) {
        if (followed.username === follower) {
            return true;
        }
    }
    return false;
  }
  if (contacts.length > 0) {
    return (
      <View style={styles.container}>
        <View style={styles.backArrow}>
          <TouchableOpacity onPress={() => navigationContacts.navigate('ProfileScreen')}>
              <Ionicons color="black" name="arrow-back" size={24} />
            </TouchableOpacity>
        </View>
        <Text style={styles.header} tx="contacts.title" />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={searchTerm}
          onChangeText={(value) => setSearchTerm(value)}
        />
        <ScrollView style={styles.listContainer}>
          {filteredContacts.map((follower) => (
            <TouchableOpacity
              key={follower.username}
              style={styles.userContainer}
              onPress={() => navigationContacts.navigate('ShowUserScreen', { username: follower.username })}
            >
              <View style={styles.mostraramigo}>
                <Image src={follower.profilePicture} style={styles.foto} />
                <Text style={styles.username} text={follower.username} />
              </View>
              <Button
                color={isFollowing(follower.username) ? "#DC143C" : "#34b38a"}
                title={isFollowing(follower.username) ? "Unfollow" : "  Follow    "}
                onPress={() => (isFollowing(follower.username) ? unfollowUser(follower.username) : followUser(follower))}
            ></Button>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.backArrow}>
          <TouchableOpacity onPress={() => navigationContacts.navigate('ProfileScreen')}>
              <Ionicons color="black" name="arrow-back" size={24} />
          </TouchableOpacity>
        </View>
        <Text style={styles.header} tx="contacts.title" />
          <Text style={styles.noFriendsMessage} tx ="ShowFollowersScreen.noContacts"/>
      </View>
    );
  }
});
