import React, { useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

const FilterPanel = () => {
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [isNew, setIsNew] = useState(false);

  const handleApplyFilters = () => {
    // Aplicar los filtros a los resultados
    // Llamar a la función de búsqueda con los filtros seleccionados
  };

  return (
    <View>
      <Text>Categoría:</Text>
      <TextInput
        placeholder="Escribe la categoría"
        value={category}
        onChangeText={setCategory}
      />

      <Text>Rango de precio:</Text>
      <Slider
        minimumValue={0}
        maximumValue={100}
        values={priceRange}
        onValueChange={setPriceRange}
      />

      <Text>Nuevo:</Text>
      <Switch value={isNew} onValueChange={setIsNew} />

      <TouchableOpacity onPress={handleApplyFilters}>
        <Text>Aplicar filtros</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilterPanel;
