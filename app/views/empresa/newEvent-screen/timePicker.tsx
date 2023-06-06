import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, View, TouchableOpacity, Modal, FlatList } from 'react-native';

import { NewEventScreenStyles as Styles } from './newEvent-screen.styles';

export const TimePicker = ({ onSelect, selectedTime, options }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleSelectTime = (time) => {
    onSelect(time);
    setShowPicker(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setShowPicker(!showPicker)}>
        <Text style={Styles.timePickerText}>
          {selectedTime || 'Seleccionar hora'}
          <Ionicons color="black" name={showPicker ? 'chevron-up' : 'chevron-down'} size={24} />
        </Text>
      </TouchableOpacity>
      <Modal animationType="slide" visible={showPicker}>
        <View style={Styles.timePickerContainer}>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectTime(item)}>
                <Text style={Styles.timePickerOption}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};
