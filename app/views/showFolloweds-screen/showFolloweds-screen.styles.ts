import {StyleSheet} from 'react-native';
export const ShowFriendsStyles =  StyleSheet.create({
  backArrow: {
    display: 'flex',
    paddingLeft: 10,
    paddingTop: 30,
  },
  container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    listContainer: {
      flex: 1,
    },
    friendItem: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    friendName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      padding: 10,
      marginBottom: 10,
      width: '100%',
    },
    friendInfo: {
      fontSize: 14,
      color: '#666',
    },

    noFriendsMessage: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: '50%',
      marginHorizontal: 16,
      color: '#555',
    },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    paddingVertical: 10,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    marginRight: 10, // ajusta el margen a la derecha
    elevation: 2,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
    
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  foto: {
    borderRadius: 50,
    height: 40,
    marginBottom: 10,
    width: 40,
    marginRight: 16,
  },
 
  removeButton: {
    color: 'red',
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'red',
    alignSelf: 'flex-start', // ajusta la alineación del botón
  },
  mostraramigo:{
    flexDirection: 'row',
    alignItems: 'center',
  }
  
});

  