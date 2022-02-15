import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import { CheckBox } from 'react-native-elements';
// import { Checkbox } from 'react-native-paper';
import { openDatabase } from 'react-native-sqlite-storage';
//Login Screen Code
const LoginScreen = ({ navigation }) => {
  var db = openDatabase({ name: 'KidsTalkingDictionaryDB.db', createFromLocation: 1 });
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  var UserName = name;
  var Password = password;

  const login = () => {
    console.log(name,password);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM Users where Name like ? and Password=?',
        [name,password],
        (tx, results) => {
          if(results.rows.length>0){
            navigation.navigate("Dashboard")
            // alert('Login Successfully')
          }else{
            alert('Invalid username or password.')
          }
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          console.log(temp);
        }
      );
    });
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 32, color: '#ffffff', fontWeight: 'bold' }}>Login!</Text>
      </View>
      <View style={styles.form}>

        {/* <Text style={{fontSize:20,marginLeft:10}}>UserName</Text> */}
        <View style={styles.textInput}>
          <Icon name='person' size={30} color='#3EB489' />
          <TextInput
            style={{ padding: 5, fontSize: 18, width: '85%',color:'#000' }}
            placeholder="UserName"
            placeholderTextColor="#3228"
            onChangeText={(name) => setName(name)}
          />
        </View>
        {/* <Text style={{fontSize:20,marginLeft:10}}>Password</Text> */}
        <View style={styles.textInput}>
          <Icon name='lock' size={30} color='#3EB489' />
          <TextInput
            style={{ padding: 5, fontSize: 18, width: '85%',color:'#000' }}
            placeholder="Password"
            placeholderTextColor="#3228"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        {/* <View style={styles.textInput}> */}
        <TouchableOpacity
          style={styles.btnLogin}
          // onPress={()=>{LoginUser()}}
          onPress={() => login()}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Login</Text>
        </TouchableOpacity>
        {/* </View> */}

        <Text style={{ fontSize: 20, margin: 14, alignSelf: 'center', fontWeight: 'bold', color: '#3EB489' }}> OR </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 17, color: 'black' }} >  Don't have an account? </Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#3EB489' }} onPress={() => navigation.navigate("SignUpScreen")}>SignUp </Text>
        </View>
      </View>

    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#ddd',
    // justifyContent: 'center'
  },
  header: {
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3EB489',
    borderBottomRightRadius: 130,
    marginBottom: 40,
  },
  textInput: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#3EB489',
    borderRadius: 40,
    padding: 5,
    paddingLeft: 15,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  btnSignUp: {
    width: "100%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderWidth: 1
  },
  btnLogin: {
    width: "95%",
    borderRadius: 30,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: '#3EB489',
  },
})

