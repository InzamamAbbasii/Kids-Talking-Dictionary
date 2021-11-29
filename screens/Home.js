import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
//Login Screen Code
const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity
          style={styles.btn}
          onPress={()=>navigation.navigate('AddChild')}
        >
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#eee' }}> Add Child </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={()=>navigation.navigate('ListOfChilds')}
        >
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#eee' }}> List of Childs </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
        >
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#eee' }}> Add Word </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('ListOfWords')}
          style={styles.btn}
        >
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#eee' }}> List of Words </Text>
        </TouchableOpacity>
       
        <TouchableOpacity onPress={()=>navigation.navigate('SelectWord')}
          style={styles.btn}
        >
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#eee' }}> Assign Words to Childs </Text>
        </TouchableOpacity>
      </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#ddd',
    // justifyContent: 'center'
  },
  btn: {
    width: "95%",
    borderRadius: 10,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: '#3EB489',
  },
})

