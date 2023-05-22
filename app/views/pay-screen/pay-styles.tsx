import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  titleContainer: {
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Helvetica',
    fontSize: 24,
    fontWeight: 'bold',
  },
  paymentForm: {
    width: '100%',
    marginBottom: 24,
  },
  label: {
    fontFamily: 'Helvetica',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    fontFamily: 'Helvetica',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  payButtonText: {
    fontFamily: 'Helvetica',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 8,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontFamily: 'Helvetica',
    fontSize: 16,
    color: 'gray',
    textDecorationLine: 'underline',
  },
});
