import React, { useState, useContext, useLayoutEffect } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ToastAndroid, StatusBar, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
//Login Screen Code
const Dashboard = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Icon name='arrow-back' size={30} style={{ marginRight: 15 }}
          onPress={() => { navigation.navigate('Home') }}
          color="#fff"
        />
      ),
    });
  }, [navigation]);
  return (
    <ScrollView  contentContainerStyle={{flex:1}} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('AddChild')}
        >
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#eee' }}> Add Child </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('ListOfChilds',{ShowWords:false})}
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
          onPress={() => navigation.navigate('SoundRecorder')}
        >
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#eee' }}> Add Word </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('ListOfWords')}
        >
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#eee' }}> List of Words </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('ListOfClasses')}
        >
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#eee' }}> List of Words By Class </Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('ListOfChilds',{ShowWords:true})}
        >
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#eee' }}> Assign Words to Childs </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fff',
    justifyContent: 'center',
  },
  btn: {
    width: "95%",
    borderRadius: 10,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'center',
    marginVertical: 7,
    backgroundColor: '#2c9971',
  },
})

