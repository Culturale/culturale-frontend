import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  messageContainer: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  messageBox: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    padding: 10,
  },
  messageUsername: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  messageContent: {
    fontSize: 16,
    color: '#000',
  },
  container: {
    flex: 1,
  },
  chatbody: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 10,
  },
  chatinput: {
    backgroundColor: '#76D7B8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  TextInput: {
    flex: 1,
    height: 50,
    padding: 10,
    width: '100%'
  },
  messageText: {
    fontSize: 16,
    color: '#000',
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
    // backgroundColor: '#76d7b8',
    flexDirection: 'row',
    height: 90,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  titleWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  titleContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  }
});
