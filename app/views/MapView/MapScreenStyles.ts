import {StyleSheet} from 'react-native';

export default StyleSheet.create({
container: {
...StyleSheet.absoluteFillObject,
flex: 1,
backgroundColor: '#fff',
},
titleContainer: {
paddingTop: 50,
paddingBottom: 5,
paddingHorizontal: 32,
backgroundColor: '#34b38a',
},
title: {
fontSize: 32,
fontWeight: 'bold',
color: '#fff',
},
bottomContainer: {
flexDirection: 'column',
justifyContent: 'flex-start',
padding: 5,
width: '100%',
},
subTitle: {
fontSize: 15,
fontWeight: 'bold',
},
map: {
...StyleSheet.absoluteFillObject,
flex: 1,
marginBottom: 10,
},
eventName: {
fontWeight: 'bold',
},
eventDescription: {
flex: 1,
},
callout: {
flex: 1,
minWidth: 150,
},
button: {
alignSelf: 'flex-end',
backgroundColor: '#34b38a',
borderBottomRightRadius: 16,
bottom: 0,
paddingHorizontal: 9,
marginBottom: -5,
paddingVertical: 1,
position: 'absolute',
right: -5,
},
buttonText: {
color: '#FFF',
fontSize: 12,
fontWeight: 'bold',
},
});