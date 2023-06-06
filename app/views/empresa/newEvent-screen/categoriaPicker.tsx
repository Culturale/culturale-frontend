import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import { NewEventScreenStyles as Styles } from './newEvent-screen.styles';

export const CategoryPicker = ({ selectedCategory, onSelectCategory }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedViewCategory, setSelectedViewCategory] = useState('');

  const handleCategorySelect = (category) => {
    onSelectCategory(category.value);
    setSelectedViewCategory(category.label);
    setShowPicker(false);
  };

  return (
    <View style={Styles.categoryPicker}>
      <TouchableOpacity onPress={() => setShowPicker(!showPicker)}>
        <Text style={Styles.categoryPickerText}>{selectedViewCategory || 'Seleccionar categoría'}</Text>
        <Ionicons color="black" name={showPicker ? 'chevron-up' : 'chevron-down'} size={24} />
      </TouchableOpacity>
      {showPicker && (
        <View style={Styles.categoryPickerOptions}>
          <TouchableOpacity onPress={() => handleCategorySelect({ label: 'Actividades virtuales', value: 'agenda:categories/activitats-virtuals' })}>
            <Text style={Styles.option}>Actividades virtuales</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategorySelect({ label: 'Exposiciones', value: 'agenda:categories/exposicions' })}>
            <Text style={Styles.option}>Exposiciones</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategorySelect({ label: 'Teatro', value: 'agenda:categories/teatre' })}>
            <Text style={Styles.option}>Teatro</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategorySelect({ label: 'Festivales y muestras', value: 'agenda:categories/festivals-i-mostres' })}>
            <Text style={Styles.option}>Festivales y muestras</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategorySelect({ label: 'Rutas y visitas', value: 'agenda:categories/rutes-i-visites' })}>
            <Text style={Styles.option}>Rutas y visitas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategorySelect({ label: 'Infantil', value: 'agenda:categories/infantil' })}>
            <Text style={Styles.option}>Infantil</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategorySelect({ label: 'Fiestas', value: 'agenda:categories/festes' })}>
            <Text style={Styles.option}>Fiestas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategorySelect({ label: 'Conferencias', value: 'agenda:categories/conferencies' })}>
            <Text style={Styles.option}>Conferencias</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategorySelect({ label: 'Ferias y mercados', value: 'agenda:categories/fires-i-mercats' })}>
            <Text style={Styles.option}>Ferias y mercados</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategorySelect({ label: 'Danza y baile', value: 'agenda:categories/dansa' })}>
            <Text style={Styles.option}>Danza y baile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategorySelect({ label: 'Ciclos', value: 'agenda:categories/cicles' })}>
            <Text style={Styles.option}>Ciclos</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
