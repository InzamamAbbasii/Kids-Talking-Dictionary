import React, { useState, useContext,useLayoutEffect } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
//Login Screen Code
const Dashboard = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
            <Icon name='arrow-back' size={30} style={{ marginRight: 15 }}
              onPress={() => {navigation.navigate('Home')}}
              color="#fff"
            />
          ),
    });
  }, [navigation]);
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
        {/* <TouchableOpacity
          style={styles.btn} onPress={()=>navigation.navigate('AddWords')}
        >
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#eee' }}> Add Word </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.btn}
          onPress={()=>navigation.navigate('SoundRecorder')}
        >
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#eee' }}> Add Word </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={()=>navigation.navigate('ListOfWords')}
        >
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#eee' }}> List of Words </Text>
        </TouchableOpacity>
       
        <TouchableOpacity
          style={styles.btn}
          onPress={()=>navigation.navigate('ListOfChilds')}
        >
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#eee' }}> Assign Words to Childs </Text> 
        </TouchableOpacity>
      </View>
  );
}

export default Dashboard;

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

