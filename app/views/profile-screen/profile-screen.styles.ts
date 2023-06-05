import {StyleSheet} from 'react-native';
export const ProfileScreenStyles =  StyleSheet.create({
  column: {
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  backArrow: {
    display: 'flex',
    paddingLeft: 10,
    paddingTop: 30,
  },
  configText: {
    color: 'black',
    marginRight: 10,
    padding: 5,
  },
  container: {
    flex: 1,
    fontFamily: 'Helvetica',
    padding: 20,
  },
  containerInfo: {
    flex: 1,
    fontFamily: 'Helvetica',
    gap: 20,
    padding: 20,
  },

  contentData:{
    // alignItems: 'center ',
    align: 'center',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingLeft: 30,
  },
  editButton: {
    backgroundColor: 'black',
    border: 5,
    borderRadius: 10,
    color: 'black',
    margin: 20,
  },
  email: {
    color: '#666',
    fontSize: 16,
  },
  foto: {
    borderRadius: 60,
    height: 120,
    marginBottom: 10,
    width: 120,
  },
  icon: {
    height: 20,
    width: 20,
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
  panelConfig: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    padding: 10,
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
  title:{
    alignSelf: 'center',
    display: 'flex',
    fontFamily: 'Helvetica',
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 20, 
  },
  
  titleData:{
    display: 'flex',
    flexDirection: 'row',
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

  