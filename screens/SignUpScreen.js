import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//SignUp Screen Code-------
const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState();//test

  return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.header}>
          <Text style={{ fontSize: 32, color: '#ffffff', fontWeight:'bold' }}>Sign Up !</Text>
        </View>
  
          <View style={styles.textInput}>
            <Icon name='person' size={30} color='#3EB489' />
            <TextInput
              style={{ padding: 5, fontSize: 18, width: '85%' }}
              placeholder="UserName"
              placeholderTextColor="#3228"
              onChangeText={(name) => setName(name)}
            />
          </View>
          <View style={styles.textInput}>
            <Icon name='email' size={30} color='#3EB489' />
            <TextInput
              style={{ padding: 5, fontSize: 18, width: '85%' }}
              placeholder="Email."
              placeholderTextColor="#3228"
              onChangeText={(email) => setEmail(email)}
            />
          </View>
          <View style={styles.textInput}>
            <Icon name='lock' size={30} color='#3EB489' />
            <TextInput
              style={{ padding: 5, fontSize: 18, width: '85%' }}
              placeholder="Password"
              placeholderTextColor="#3228"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>
          <View style={styles.textInput}>
            <Icon name='lock' size={30} color='#3EB489' />
            <TextInput
              style={{ padding: 5, fontSize: 18, width: '85%' }}
              placeholder="ConfirmPassword"
              placeholderTextColor="#3228"
              secureTextEntry={true}
              onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
            />
          </View>

          <TouchableOpacity style={styles.btnSignUp}
         >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>SignUp</Text>
          </TouchableOpacity>

          <Text style={{ fontSize: 20, margin: 7, alignSelf: 'center', fontWeight: 'bold', color: '#3EB489' }}> OR </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 17, color: 'black' }} >  Already have an account? </Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#3EB489' }} onPress={() => navigation.navigate("LoginScreen")}>Login </Text>
          </View>
      </ScrollView>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,backgroundColor:'#ddd',
  },
  header: {
    height: 180,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor:'#3EB489',
    borderBottomRightRadius:130,
    marginBottom:40,
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