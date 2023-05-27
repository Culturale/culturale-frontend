import {StyleSheet} from 'react-native';

export const SearchScreenStyles =  StyleSheet.create({
  buttonText: {
        color: '#333',
        fontWeight: '500',
      },
  datePicker: {
        borderColor: '#CCCCCC',
        borderRadius: 4,
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
        width: '100%',
      },
  eventSearchButton: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#34b38a',
        borderWidth: 1,
      },
  filter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterButton: {
    backgroundColor: '#1678C2',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

    filterButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  filterContainer: {
        marginTop: 70,

        backgroundColor: '#FFFFFF',

        borderRadius: 8,
        borderColor: '#34B38A',
        borderWidth: 2,
        elevation: 2,

        marginVertical: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,

        shadowColor: '#000000',

        shadowOffset: {
          height: 2,
          width: 0,
        },

        shadowOpacity: 0.1,
        shadowRadius: 2,
  },

  filterText: {
    color: '#333333',
    fontSize: 16,
  },

  filterTextInput: {
    backgroundColor: '#F2F2F2',
    borderColor: '#E5E5E5',
    borderRadius: 4,
    borderWidth: 1,
    color: '#333333',
    flex: 1,
    fontSize: 14,
    height: 40,
    paddingHorizontal: 8,
  },

      // filterContainer: {
      //   alignItems: 'center',
      //   backgroundColor: '#FFFFFF',
      //   borderColor: '#34B38A',
      //   borderRadius: 8,
      //   borderWidth: 2,
      //   elevation: 2,
      //   marginVertical: 16,
      //   paddingHorizontal: 16,
      //   paddingVertical: 12,
      //   shadowColor: '#000000',
      //   shadowOffset: {
      //     height: 2,
      //     width: 0,
      //   },
      //   shadowOpacity: 0.1,
      //   shadowRadius: 2,
      // },

      // filterprice: {
      //   alignItems: 'center',
      //   backgroundColor: '#F3F3F3',
      //   color: '#333',
      //   flexDirection: 'row',
      //   fontSize: 12,
      //   fontWeight: '500',
      //   height: 20,
      //   paddingVertical: 2
      // },

      // inputprice: {
      //   borderColor: '#000',
      //   paddingLeft: 2,
      // },

      noResultsContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
      },

      noResultsText: {
        color: '#333',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
      },

      resultContainer: {
        backgroundColor: '#000',
        flex: 1,
        width: '100%',
      },

      searchButton: {
        alignItems: 'center',
        borderRadius: 20,
        flexDirection: 'row',
        marginRight: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
      },

      searchContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 10,
        top: 55,
      },

      searchIcon: {
        marginLeft: 10,
        marginRight: 10,
      },
      
      searchTextContainer: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        flexDirection: 'row',
        width: 330,
      },
      
      searchTypeContainer: {
        flexDirection: 'row',
        marginTop: 10,
      },

      selectedButton: {
        backgroundColor: '#34b38a',
      },
      selectedText: {
        color: '#fff',
      },
      
      sliderThumb: {
        backgroundColor: '#FF6F00',
        borderRadius: 10,
        height: 20,
        width: 20,
      },
      
      sliderTrack: {
        backgroundColor: '#E0E0E0',
        borderRadius: 2,
        height: 5,
      },

      title: {
        fontFamily: 'Helvetica',
        fontSize: 24,
        fontWeight: 'bold',
        top: 40,
      },

      titleContainer: {
        justifyContent: 'center'
      },

      userSearchButton: {
          alignItems: 'center',
          backgroundColor: '#fff',
          borderColor: '#34b38a',
          borderWidth: 1,
          marginHorizontal: 10,
      },
});