import {StyleSheet} from 'react-native';
export const ShowFriendsStyles =  StyleSheet.create({
  backArrow: {
    alignSelf: 'flex-start',
    display: 'flex',
    paddingLeft: 10,
    paddingTop: 30,
  },
  container: {
      backgroundColor: '#fff',
      flex: 1,
      padding: 20,
    },
    foto: {
    borderRadius: 50,
    height: 40,
    marginBottom: 10,
    marginRight: 16,
    width: 40,
  },
    friendInfo: {
      color: '#666',
      fontSize: 14,
    },
    friendItem: {
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      paddingVertical: 10,
    },
    friendName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    header: {
      alignSelf: 'center',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      borderColor: '#ccc',
      borderRadius: 4,
      borderWidth: 1,
      marginBottom: 10,
      padding: 10,
      width: '100%',
    },

    listContainer: {
      flex: 1,
    },
  mostraramigo:{
    alignItems: 'center',
    flexDirection: 'row',
  },
  noFriendsMessage: {
      color: '#555',
      fontSize: 24,
      fontWeight: 'bold',
      marginHorizontal: 16,
      marginTop: '50%',
      textAlign: 'center',
    },
  profilePicture: {
    borderRadius: 25,
    height: 50,
    marginRight: 16,
    width: 50,
    
  },
  removeButton: {
    alignSelf: 'flex-start',
    borderColor: 'red',
    borderRadius: 4,
    borderWidth: 1,
    color: 'red',
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5, // ajusta la alineación del botón
  },
 
  userContainer: {
  alignItems: 'center',
  backgroundColor: '#FFF',
  borderBottomColor: 'lightgray',
  borderBottomWidth: 1,
  borderRadius: 8,
  elevation: 2,
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 16,
  marginRight: 10,
  padding: 16,
  paddingVertical: 10,
  shadowColor: '#000',
  shadowOffset: {
    height: 1,
    width: 0,
  },
  shadowOpacity: 0.2, 
    shadowRadius: 1.41,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  }
  
});

  