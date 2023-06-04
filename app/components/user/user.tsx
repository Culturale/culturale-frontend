import type React from 'react';
import { View, Text , StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import type { IUser } from '~/domain';
interface Props {
  user: IUser;
}

export const User: React.FC<Props> = ({ user }) => {
  return (
    <View style={styles.userCard}>
      <View style={styles.avatarContainer}>
        <Image src={user.profilePicture} style={styles.userAvatar} />
          <View style={styles.onlineIndicator} />
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.name}>{user.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  onlineIndicator: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userInfo: {
    marginLeft: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  name: {
    fontSize: 14,
    color: '#888888',
  },
});
