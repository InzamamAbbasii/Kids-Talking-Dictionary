import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//SignUp Screen Code-------
const AddChild = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState();//test

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={{ fontSize: 32, color: '#3EB489', fontWeight:'bold' }}>Add Child !</Text>
        </View>
        <View style={{margin:5}}>

          <View style={styles.textInput}>
            {/* <Icon name='person' size={30} color='#3EB489' /> */}
            <TextInput
              style={{ padding: 5, fontSize: 18, width: '85%' }}
              placeholder="Name"
              placeholderTextColor="#3228"
              onChangeText={(name) => setName(name)}
            />
          </View>
          <View style={styles.textInput}>
            {/* <Icon name='email' size={30} color='#3EB489' /> */}
            <TextInput
              style={{ padding: 5, fontSize: 18, width: '85%' }}
              placeholder="Age"
              placeholderTextColor="#3228"
              onChangeText={(email) => setEmail(email)}
            />
          </View>
          <View style={styles.textInput}>
            {/* <Icon name='email' size={30} color='#3EB489' /> */}
            <TextInput
              style={{ padding: 5, fontSize: 18, width: '85%' }}
              placeholder="Grade"
              placeholderTextColor="#3228"
              onChangeText={(email) => setEmail(email)}
            />
          </View>
        

          <TouchableOpacity style={styles.btnSignUp}
         >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default AddChild;

const styles = StyleSheet.create({
  container: {
    flex: 1,paddingTop:30,backgroundColor:'#ddd'
  },
  header: {
    paddingBottom:25, alignItems: 'center'
  },
  textInput: {
    margin: 7,
    // marginBottom:5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth:1.5,
    borderColor:'#3EB489',
    borderRadius: 40,
    padding: 5,
    paddingLeft: 15,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.30,
    shadowRadius: 40,
    elevation: 6,
  },
  btnSignUp: {
    width: "95%",
    borderRadius: 30,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: '#3EB489',
  },
  btnLogin: {
    width: "100%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderWidth: 1
  },
})