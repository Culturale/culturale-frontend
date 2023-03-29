import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import axios, { AxiosResponse } from 'axios';
import NavBar from "../components/navbar/navbar";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity
} from "react-native";


export default function HomeScreen ({navigation} : {navigation: any}) {

  return (
    <NavBar/>
  );

}

