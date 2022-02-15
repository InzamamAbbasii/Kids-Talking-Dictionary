import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ToastAndroid, StatusBar, FlatList } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Home = ({ navigation }) => {
  var db = openDatabase({ name: 'KidsTalkingDictionaryDB.db', createFromLocation: 1 });
  const [data, setData] = useState([]);


  const getAllChilds = async () => {
    setData([]);
    db.transaction((tx) => {
      tx.executeSql(
        'Select * from Childs',
        [],
        (tx, results) => {
          if (results.rows.length > 0) {
            var temp = [];
            for (let index = 0; index < results.rows.length; index++) {
              temp.push(results.rows.item(index))
              setData(data => [...data, {
                Id: results.rows.item(index).Id,
                Name: results.rows.item(index).Name,
                Class: results.rows.item(index).Class,
              }])
            }
          } else {
            alert('No Child Found...')
          }
        }
      );
    })
  }
  useEffect(() => {
    if (data.length == 0) {
      const unsubscribe = navigation.addListener('focus', async () => {
        await getAllChilds();
      });
      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
    } else {
      getAllChilds();
    }
  }, []);
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.cardView} onPress={() => navigation.navigate('MyWords', { ChildId: item.Id })}>
        <Text style={styles.card_title}> {item.Name} </Text>
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('LoginScreen')}
      >
        <Icon name='person' color='#fff' size={80} />
      </TouchableOpacity>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />

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
    width: 100,
    height: 100,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'flex-end',
    marginTop: 20,
    marginRight: 20,
    backgroundColor: '#3EB489',
  },
  cardView: {
    backgroundColor: '#3EB489',
    height: 50,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  card_title: {
    color: "white",
    fontSize: 18,
    fontWeight: 'bold',
  }
})

