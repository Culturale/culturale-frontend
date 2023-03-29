import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    Dimensions,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";



export const ChatScreen = ({ navigation }: { navigation: any }) => {

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={styles.topbar}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={[styles.basecontainer, flexdata1]}>
                    <Image style={styles.sendpic} source={require("../assets/back.png")} />
                </TouchableOpacity>
                <View style={[styles.basecontainer, flexdata2]}>
                    <Text style={styles.baseText}>EventName</Text>
                </View>
                <View style={[styles.basecontainer, flexdata1]}>
                    <Image style={styles.image} source={require("../assets/logo-detail.png")} />
                </View>        
            </KeyboardAvoidingView>    
            <View style={styles.chatbody}>

            </View> 
            <KeyboardAvoidingView style={styles.chatinput}>
                <View style={styles.inputChat}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Message"
                        placeholderTextColor="#003f5c"
                        //onChangeText={(message) => setPassword(password)}
                    /> 
                </View>
                <View style={styles.send}>
                    <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                        <Image style={styles.sendpic} source={require("../assets/send.png")} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView> 
        </View>
    );
}

const flexdata1 = { width: "20%" };
const flexdata2 = { width: "60%" };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    basecontainer: {
        backgroundColor: "#76d7b8",
        justifyContent: "center",
        alignItems: "center",
    },
    inputChat: {
        backgroundColor: "#D2FFE6",
        borderRadius: 10,
        width: "80%",
        height: 50,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    send: {
        backgroundColor: "#D2FFE6",
        borderRadius: 10,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    TextInput: {
        height: 50,
        width: "100%",
        flex: 1,
        padding: 10
    },
    topbar: {
        paddingTop: 30,
        paddingHorizontal: 5,
        backgroundColor: "#76d7b8",
        width: "100%",
        height: 90,
        flexDirection: "row",
    },
    chatbody: {
        backgroundColor: "#fff",
        width: "100%",
        flexGrow: 1,
    },
    chatinput: {
        padding: 10,
        gap: 10,
        backgroundColor: "#76d7b8",
        width: "100%",
        height: 90,
        flexDirection: "row",
    },
    image: {
        width: 40,
        height: 40,
    },
    sendpic: {
        width: 20,
        height: 20,
    },
    baseText: {
        fontFamily: 'Roboto',
        fontSize: 20,
        color: 'black',
    },
    
});

export default ChatScreen;