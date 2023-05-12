import {StyleSheet} from 'react-native';
export const ShowFriendsStyles =  StyleSheet.create({
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
    
});

  