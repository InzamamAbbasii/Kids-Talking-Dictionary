import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

//SignUp Screen Code-------
const ListOfChilds = ({ navigation }) => {
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
            <TouchableOpacity style={styles.cardView} onPress={() => navigation.navigate('AssignWords',{ChildId:item.Id,Name:item.Name})}>
                <Text style={styles.card_title}> {item.Name} </Text>
            </TouchableOpacity>
        );
    }
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={{ fontSize: 32, color: '#3EB489', fontWeight: 'bold' }}> List of Childs</Text>
            </View>
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
        flex: 1, paddingTop: 30, backgroundColor: '#fff',
    },
    header: {
        paddingBottom: 25, alignItems: 'center'
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