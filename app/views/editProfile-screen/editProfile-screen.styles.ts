import {StyleSheet} from 'react-native';
export const EditProfileScreenStyles =  StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  cancelButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'column',
    padding: 10,
    paddingHorizontal: 30,
  },
  changePhotoTxt: {
    alignSelf: 'center',
    color: '34b38a',
    padding: 10,
    paddingBottom: 20,
  },
  column: {
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    flex: 1,
    fontFamily: 'Helvetica',
    padding: 20,
  },
  editInputContainer:{
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    fontSize: 50,
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  email: {
    color: '#666',
    fontSize: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
    paddingLeft: 10,
  },
  profilePicture: {
    alignSelf: 'center',
    borderRadius: 60,
    height: 85,
    marginBottom: 5,
    width: 85,
  },
  row: {
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  rowProfile: {
    display: 'flex',
    gap: 30,
    justifyContent: 'space-around',
    margin: 20,
  },
  rows: {
    paddingBottom: 20,
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: '#34b38a',
    borderRadius: 5,
    flexDirection: 'column',
    padding: 10,
    paddingHorizontal: 30,
  },
  title:{
    alignSelf: 'center',
    display: 'flex',
    fontFamily: 'Helvetica',
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 40, 
    paddingTop: 20,
  },
  titleRow: {
    fontSize: 17
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
});

  