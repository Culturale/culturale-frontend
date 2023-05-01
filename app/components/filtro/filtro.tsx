import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import  { Picker } from '@react-native-picker/picker';
import DatePicker from '@react-native-community/datetimepicker';

const CATEGORIAS = ['Teatre', 'Divulgació', 'Espectacle', 'Concerts', 'Conferencies', 'Commemoracions', 'Infantil', 'Dansa'];

export default function Filtro({ onFiltrar }) {
    const [denominacio, setDenominacio] = useState('');
    const [categoria, setCategoria] = useState('');
    const [dataIni, setDataIni] = useState(null);
    const [dataFi, setDataFi] = useState(null);

  
  
    const onDataIniChange = (event, selectedDate) => {
      setDataIni(selectedDate);
    };
  
    const onDataFiChange = (event, selectedDate) => {
      setDataFi(selectedDate);
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
      <View style={styles.calendarCont}>
        <Text style={styles.label}>Fecha inicial:</Text>
        <View>
            {(
            <DatePicker
                value={dataIni || new Date()}
                mode="date"
                display="default"
                onChange={onDataIniChange}
            />
            )}
        </View>
      </View>
      <View style={styles.calendarCont}>
        <Text style={styles.label}>Fecha final:</Text>
            <View >
            {(
            <DatePicker
                value={dataFi || new Date()}
                mode="date"
                display="default"
                onChange={onDataFiChange}
            />
            )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#34b38a',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
      marginHorizontal: 10,
      marginVertical: 5,
      marginTop: 44,
    },
    inputContainer: {
      marginVertical: 5,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
    },
    input: {
      backgroundColor: 'white',
      borderRadius: 5,
      padding: 10,
      marginTop: 5,
    },
    picker: {
      backgroundColor: 'white',
      borderRadius: 5,
      marginTop: 5,
    },

    calendarCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
      },
      datePickerContainer: {
        marginLeft: 20,
      },
  });
  
