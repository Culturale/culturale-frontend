import { StyleSheet } from 'react-native';

export const RegisterScreenStyles = StyleSheet.create({
  TextInput: {
    flex: 1,
    height: 50,
    padding: 10,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#34b38a',
    borderRadius: 4,
    height: 50,
    justifyContent: 'center',
    marginBottom: 12,
    width: 250,
  },

  container: {
    alignItems: 'center',
    backgroundColor: '#76d7b8',
    flex: 1,
    justifyContent: 'center',
  },

   dropDownContainerStyle: {
    alignSelf: 'center',
    backgroundColor: '#D2FFE6',
    marginBottom: 20,
    width: '70%',
  },
  dropDownStyle:{
    backgroundColor: '#D2FFE6',
  },
  image: {
    height: 250,
    marginBottom: -70,
    width: 250,
  },
  registerBtnOpen: {
    alignItems: 'center',
    backgroundColor: '#34b38a',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    marginBottom: 80,
    marginTop: 70,
    width: '80%',
  },
  inputView: {
    alignItems: 'center',
    backgroundColor: '#D2FFE6',
    borderRadius: 30,
    height: 45,
    marginBottom: 20,
    width: '70%',
  },
  inputView2: {
    alignItems: 'center',
    backgroundColor: '#D2FFE6',
    borderRadius: 30,
    height: 45,
    marginBottom: 20,
    marginTop: 50,
    width: '70%',
  },
  itemStyle:{
    justifyContent: 'flex-start',
  },

  registerBtn: {
    alignItems: 'center',
    backgroundColor: '#34b38a',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 10,
    width: '80%',
  },

  registerText: {
    color: 'white',
    fontFamily: 'Helvetica',
  },

  textButton: {
    color: 'white',
    fontSize: 16,
    letterSpacing: 0.25,
    lineHeight: 21,
  },
});
