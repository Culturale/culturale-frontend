import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  TextInput: {
    flex: 1,
    height: 50,
    padding: 10,
    width: '100%'
  },
  backArrow: {
        display: 'flex',
        paddingTop: 30,
        paddingLeft: 10,
  },
  baseText: {
    color: 'black',
    fontFamily: 'Roboto',
    fontSize: 20
  },
  basecontainer: {
    alignItems: 'center',
    backgroundColor: '#76d7b8',
    justifyContent: 'center'
  },
  chatbody: {
    backgroundColor: '#fff',
    flexGrow: 1,
    width: '100%'
  },
  chatinput: {
    backgroundColor: '#76d7b8',
    flexDirection: 'row',
    gap: 10,
    height: 90,
    padding: 10,
    width: '100%'
  },
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  image: {
    height: 40,
    width: 40
  },
  inputChat: {
    alignItems: 'flex-start',
    backgroundColor: '#D2FFE6',
    borderRadius: 10,
    height: 50,
    justifyContent: 'flex-start',
    width: '80%'
  },
  send: {
    alignItems: 'center',
    backgroundColor: '#D2FFE6',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    width: 50
  },
  sendpic: {
    height: 20,
    width: 20
  },
  topbar: {
    backgroundColor: '#76d7b8',
    flexDirection: 'row',
    height: 90,
    paddingHorizontal: 5,
    paddingTop: 30,
    width: '100%'
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleContainer: {
    alignSelf: 'center',
    marginBottom: 10,
  }
});
