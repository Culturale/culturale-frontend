import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import  { Picker } from '@react-native-picker/picker';
import DatePicker from '@react-native-community/datetimepicker';

const CATEGORIAS = ['teatre', 'divulgació', 'espectacle', 'concerts', 'conferencies', 'commemoracions', 'infantil', 'dansa'];

export default function Filtro({ onFiltrar }) {
    const [denominacio, setDenominacio] = useState('');
    const [categoria, setCategoria] = useState('');
    const [dataIni, setDataIni] = useState(null);
    const [dataFi, setDataFi] = useState(null);
    const [showDataIniPicker, setShowDataIniPicker] = useState(false);
    const [showDataFiPicker, setShowDataFiPicker] = useState(false);
  
  
    const onDataIniChange = (event, selectedDate) => {
      setShowDataIniPicker(false);
      setDataIni(selectedDate);
    };
  
    const onDataFiChange = (event, selectedDate) => {
      setShowDataFiPicker(false);
      setDataFi(selectedDate);
    };
  
    const showDataIniPickerModal = () => {
      setShowDataIniPicker(true);
    };
  
    const showDataFiPickerModal = () => {
      setShowDataFiPicker(true);
    };

  const filtrar = () => {
    const filtro = {
        denominacio: denominacio.toLowerCase(),
        categoria,
        dataIni,
        dataFi,
      };
    if (denominacio) {
      filtro.denominacio = denominacio;
    }
    if (categoria) {
      filtro.categoria = categoria;
    }
    if (dataIni) {
    filtro.dataIni = dataIni;
  }
  if (dataFi) {
    filtro.dataFi = dataFi ;
  }
    onFiltrar(filtro);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Denominació:</Text>
        <TextInput
          style={styles.input}
          placeholder="Filtrar per denominació"
          value={denominacio}
          onChangeText={setDenominacio}
          onSubmitEditing={filtrar}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Categoria:</Text>
        <Picker
          style={styles.picker}
          selectedValue={categoria}
          onValueChange={(value) => {
            setCategoria(value);
            filtrar();
          }}
        >
          <Picker.Item label="Totes les categories" value="" />
          {CATEGORIAS.map((categoria) => (
            <Picker.Item key={categoria} label={categoria} value={categoria} />
          ))}
        </Picker>
      </View>
      <Text>Fecha inicial:</Text>
      <View>
        <Text onPress={showDataIniPickerModal}>
          {dataIni ? dataIni.toLocaleDateString() : 'Seleccionar fecha'}
        </Text>
        {showDataIniPicker && (
          <DatePicker
            value={dataIni || new Date()}
            mode="date"
            display="default"
            onChange={onDataIniChange}
          />
        )}
      </View>
      <Text>Fecha final:</Text>
      <View>
        <Text onPress={showDataFiPickerModal}>
          {dataFi ? dataFi.toLocaleDateString() : 'Seleccionar fecha'}
        </Text>
        {showDataIniPicker && (
          <DatePicker
            value={dataFi || new Date()}
            mode="date"
            display="default"
            onChange={onDataFiChange}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});
