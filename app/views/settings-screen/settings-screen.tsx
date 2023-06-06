import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import I18n, { locale } from 'i18n-js';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


import { Text as TraductionText } from '~/components/text';
import { useLanguageContext } from '~/hooks/use-language/use-language';
import type { RootParamList } from '~/navigation';

import { changeLanguage, getCurrentLanguage } from '../../../app/i18n/i18n';

import { styles } from './settings-screen.styles';

type SettingsNavigation = StackNavigationProp<RootParamList, 'EditProfile'>;

export const SettingsScreen = observer(() => {
  const navigation = useNavigation<SettingsNavigation>();
  const [selectedLanguage, setSelectedLanguage] = useState(getCurrentLanguage);
  const { setLanguage } = useLanguageContext();  


  const changeLanguageState = (language: string) => {
    I18n.locale= language;
    setLanguage(language);
    setSelectedLanguage(language);
    changeLanguage(language);
  };

  return (
    <>
      <View style={styles.backArrow}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <Ionicons color="black" name="arrow-back" size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TraductionText style={styles.title} tx='settings.changeLanguage' />
        <Picker
          selectedValue={selectedLanguage}
          style={styles.picker}
          onValueChange={changeLanguageState}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Español" value="es" />
        </Picker>
        <TouchableOpacity  style={styles.contactContainer} onPress={() => { navigation.navigate('ShowContacts'); }}>
        <Ionicons style={styles.iconoContacto} name="person-circle-outline"/>
            <View >
              <TraductionText style={styles.title} tx="settings.contacts"/>
            </View>
       </TouchableOpacity>
      </View>
    </>
  );
});
