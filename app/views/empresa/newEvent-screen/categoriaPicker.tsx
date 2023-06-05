import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import { NewEventScreenStyles as Styles } from './newEvent-screen.styles';

export const CategoryPicker = ({ selectedCategory, onSelectCategory }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleCategorySelect = (category) => {
    onSelectCategory(category);
    setShowPicker(false);
  };

  return (
    <View style={Styles.timePickerText}>
      <TouchableOpacity onPress={() => setShowPicker(!showPicker)}>
        <Text style={Styles.timePickerText}>{selectedCategory || 'Seleccionar categoría'}</Text>
        <Ionicons color="black" name={showPicker ? 'chevron-up' : 'chevron-down'} size={24} />
      </TouchableOpacity>
      {showPicker && (
        <View style={Styles.timePickerText}>
          <TouchableOpacity onPress={() => handleCategorySelect('')}>
            <Text>Todas las categorías</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategorySelect('agenda:categories/activitats-virtuals')}>
            <Text>Actividades virtuales</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategorySelect('agenda:categories/exposicions')}>
            <Text>Exposiciones</Text>
          </TouchableOpacity>
          {/* Agrega más opciones de categorías según tus necesidades */}
        </View>
      )}
    </View>
  );
};