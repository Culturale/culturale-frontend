import {StyleSheet} from 'react-native';

export const SearchScreenStyles =  StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
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
      searchContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        top: 55,
      },
      searchTextContainer: {
        borderRadius: 20,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
      },
      searchTypeContainer: {
        flexDirection: 'row',
        marginTop: 10,
      },
      searchIcon: {
        marginRight: 10,
        marginLeft: 10,
      },
      input: {
        flex: 1,
        height: 40,
        color: '#333',
        fontSize: 16,
        fontWeight: '500',
        paddingVertical: 10,
        
      },
      searchButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        marginRight: 10,
      },
      userSearchButton: {
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: '#34b38a',
          alignItems: 'center',
          marginHorizontal: 10,
      },
      eventSearchButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#34b38a',
        alignItems: 'center',
      },
      buttonText: {
        color: '#333',
        fontWeight: '500',
      },
      selectedButton: {
        backgroundColor: '#34b38a',
      },
      selectedText: {
        color: '#fff',
      },
      resultContainer: {
        flex: 1,
        top:60,
        width: '100%',
      },
      noResultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      noResultsText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginTop: 20,
      },
      filtersContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16,
        paddingHorizontal: 16,
      },
      filter: {
        flex: 1,
        paddingTop:100,
        marginHorizontal:20,
      },
      datePicker: {
        width: 200,
        marginBottom: 10,
      },
});