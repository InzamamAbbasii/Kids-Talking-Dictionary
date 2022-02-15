import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { RadioButtonItem } from 'react-native-paper/lib/typescript/components/RadioButton/RadioButtonItem';
import { openDatabase } from 'react-native-sqlite-storage';

//SignUp Screen Code-------
const ListOfChilds = ({ navigation,route }) => {
    console.log(route.params);
    var db = openDatabase({ name: 'KidsTalkingDictionaryDB.db', createFromLocation: 1 });
    const [data, setData] = useState([]);
    const getAllChilds = () => {
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
        getAllChilds();
    }, []);
    const renderItem = ({item}) => {
        return (
            <TouchableOpacity style={styles.cardView} disabled={route.params.ShowWords==false?true:false} onPress={() => navigation.navigate('AssignWords',{
                ChildId:item.Id,
                Name:item.Name,
                Class:item.Class,
                })}>
                <Text style={styles.card_title}>Name :  {item.Name} </Text>
                <Text style={styles.card_title}>Class :  {item.Class} </Text>
            </TouchableOpacity>
        );
    }
    return (
        <View style={styles.container}>

            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
        </View>
    );
}

export default ListOfChilds;

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#8777',
    },
    cardView: {
        width: '100%',
        alignSelf: 'center',
        padding: 10,
        borderBottomWidth:1,
        borderBottomColor:'#000'
    },
    card_title: {
        color: "#000",
        fontSize: 18,
        fontWeight: 'bold',
    }
})