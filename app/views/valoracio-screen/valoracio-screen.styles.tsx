import { StyleSheet } from 'react-native';

export const ValoracioScreenStyles = StyleSheet.create({
    backArrow: {
        display: 'flex',
        paddingLeft: 10,
        paddingTop: 30,
      },
    buttonText: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 16,
    },
    commentInput: {
        borderColor: 'gray',
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 17,
        height: 200,
        marginBottom: 20,
        padding: 10,
        textAlignVertical: 'top',
        width: '100%',
    },
    disabledButton: {
        backgroundColor: 'gray',
        opacity: 0.6,
      },
    filledStar: {
        color: 'orange',    
    },
    heading: {
        fontSize: 24,
        marginBottom: 20,
    },
    ratingPage: {
        alignItems: 'center',
        flex: 1,
        fontFamily: 'Helvetica',
        padding: 20,
    },
    ratingStars: {
        flexDirection: 'row',
        marginLeft: 20
    },
    star: {
        color: 'gray',
        fontSize: 30,
        marginRight: 5,
    },
    submitButton: {
        backgroundColor: '#34b38a',
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 20,
        width: '100%',
    },
    subtitle: {
        color: 'grey',
        fontSize: 20,
    },
    
});