import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { Picker } from '@react-native-picker/picker';

const ListOfClasses = ({ navigation }) => {
    var db = openDatabase({ name: 'KidsTalkingDictionaryDB.db', createFromLocation: 1 });
    const [data, setData] = useState([]);
    const [selectedClass, setSelectedClass] = useState('All');

    const getAllWords = (itemValue) => {
        setData([]); console.log(itemValue);
        if (itemValue == 'All') {
            db.transaction((tx) => {
                tx.executeSql(
                    `Select * from Words`,
                    [],
                    (tx, results) => {
                        if (results.rows.length > 0) {
                            var temp = [];
                            for (let index = 0; index < results.rows.length; index++) {
                                temp.push(results.rows.item(index))
                                setData(data => [...data, {
                                    Id: results.rows.item(index).Id,
                                    Word: results.rows.item(index).Word,
                                    WordAudio: results.rows.item(index).WordAudio,
                                    MeaningAudio: results.rows.item(index).MeaningAudio,
                                    Meaning: results.rows.item(index).Meaning,
                                    Base64Image: results.rows.item(index).Image,
                                    Class: results.rows.item(index).Class,
                                }])
                            }
                        } else {
                            alert('No record Found...')
                        }
                    }
                );
            })
        } else {
            db.transaction((tx) => {
                tx.executeSql(
                    `Select * from Words Where Class=${itemValue}`,
                    [],
                    (tx, results) => {
                        if (results.rows.length > 0) {
                            var temp = [];
                            for (let index = 0; index < results.rows.length; index++) {
                                temp.push(results.rows.item(index))
                                setData(data => [...data, {
                                    Id: results.rows.item(index).Id,
                                    Word: results.rows.item(index).Word,
                                    WordAudio: results.rows.item(index).WordAudio,
                                    MeaningAudio: results.rows.item(index).MeaningAudio,
                                    Meaning: results.rows.item(index).Meaning,
                                    Base64Image: results.rows.item(index).Image,
                                    Class: results.rows.item(index).Class,
                                }])
                            }
                        } else {
                            alert('No record Found...')
                        }
                    }
                );
            })
        }

    }
    useEffect(() => {
        getAllWords(selectedClass);
    }, []);
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.cardView}  onPress={() => navigation.navigate('WordDetail', {
                Id: item.Id,
                Word: item.Word,
                WordAudio:item.WordAudio,
                Meaning: item.Meaning,
                MeaningAudio:item.MeaningAudio,
                Image: item.Base64Image
            })}>
                <Text style={styles.card_title}>Word : {item.Word} </Text>
                <Text style={[styles.card_title, { fontWeight: 'normal' }]}>Meaning : {item.Meaning} </Text>
                <Text style={[styles.card_title, { fontWeight: 'normal' }]}>Class : {item.Class} </Text>
            </TouchableOpacity>
        );
    }
    return (
        <View style={styles.container}>

            {/* <View style={styles.header}>
                <Text style={{ fontSize: 32, color: '#3EB489', fontWeight: 'bold' }}> List of Words</Text>
            </View> */}
            <View style={{ flexDirection: 'row', backgroundColor: '#3EB489', alignItems: 'center',  paddingHorizontal: 10 }}>
                <Text style={{ flex: 1, fontSize: 20, fontWeight: 'bold', textAlign: 'left', color: '#fff' }}>Select Class</Text>
                <Picker style={{ flex: 1, color: '#fff' }}
                    selectedValue={selectedClass}
                    onValueChange={(itemValue, itemIndex) => {
                        setSelectedClass(itemValue),
                            getAllWords(itemValue)
                    }
                    }
                    mode='dropdown'
                >
                    <Picker.Item label="All" value="All" />
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                </Picker>
            </View>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
        </View>
    );
}

export default ListOfClasses;

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#ccc',
    },
    header: {
        paddingBottom: 25, alignItems: 'center'
    },
    cardView: {
        backgroundColor: '#000',
        width: '95%',
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