import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { openDatabase } from 'react-native-sqlite-storage';

const AddChild = ({ navigation }) => {
  var db = openDatabase({ name: 'KidsTalkingDictionaryDB.db', createFromLocation: 1 });
  const [name, setName] = useState("");
  const [selectedClass, setSelectedClass] = useState('1');
  const addChild = () => {
    if (name.length == 0) {
      alert('Please Enter Child Name')
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          'Insert into Childs(Name,Class) Values (?,?)',
          [name, selectedClass],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              alert('Child Added Successfully!')
              // alert('Login Successfully')
            } else {
              alert('somting went wrong.')
            }
          }
        );
      })
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={{ fontSize: 32, color: '#3EB489', fontWeight: 'bold' }}>Add Child !</Text>
        </View>
        <View style={{ margin: 5 }}>

          <View style={styles.textInput}>
            {/* <Icon name='person' size={30} color='#3EB489' /> */}
            <TextInput
              style={{ padding: 5, fontSize: 18, width: '85%', color: '#fff' }}
              placeholder="Name"
              placeholderTextColor="#3228"
              onChangeText={(name) => setName(name)}
            />
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: '#1bb', alignItems: 'center', margin: 10, paddingHorizontal: 20,borderWidth:1.5,borderColor:'#000',borderRadius:10 }}>
            <Text style={{ flex: 1, fontSize: 20, fontWeight: 'bold', textAlign: 'left',color:'#fff' }}>Class</Text>
            <Picker style={{ flex: 1, color: '#fff' }}
              selectedValue={selectedClass}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedClass(itemValue)
              }
              mode='dropdown'
              itemStyle={{ backgroundColor: 'green' }}
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
            </Picker>
          </View>

          <TouchableOpacity style={styles.btn} onPress={() => addChild()}
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
    flex: 1, paddingTop: 30, backgroundColor: '#ddd'
  },
  header: {
    paddingBottom: 25, alignItems: 'center'
  },
  textInput: {
    margin: 7,
    // marginBottom:5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1bb',
    borderWidth: 1.5,
    borderColor: '#3EB489',
    borderRadius: 40,
    padding: 5,
    paddingLeft: 15,
    borderWidth:1.5,borderColor:'#000',borderRadius:10,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.30,
    shadowRadius: 40,
    elevation: 6,
  },
  btn: {
    width: "95%",
    borderRadius: 10,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'center',
    marginTop: 50,
    backgroundColor: '#2c9971',
  },
})