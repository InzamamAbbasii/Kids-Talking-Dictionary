import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList,Alert } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

const ListOfWords = ({ navigation }) => {
    var db = openDatabase({ name: 'KidsTalkingDictionaryDB.db', createFromLocation: 1 });
    const [data, setData] = useState([]);
    const getAllWords = () => {
        setData([]);
        console.log('getting words..');
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * from Words',
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
                        alert('No Record Found...')
                    }
                }
            );
        })
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            getAllWords();
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, []);
    const deleteRecord = (id) => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE from Words WHERE Id=?',
                [id],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        db.transaction((tx) => {
                            tx.executeSql(
                                'DELETE from AssignWords WHERE WordId=?',
                                [id],
                                (tx, results) => {
                                    console.log('Results', results.rowsAffected);
                                    if (results.rowsAffected > 0) {
                                        Alert.alert(
                                            'Done',
                                            'Record Deleted Successfully',
                                            [
                                                {
                                                    text: 'Ok',
                                                    onPress: () => getAllWords(),
                                                },
                                            ],
                                            { cancelable: false }
                                        );
                                    }
                                }
                            );
                        });
                    }
                }
            );
        });
    }
    const renderItem = ({ item }) => {
        return (
            <View style={styles.cardView} >
                <Text style={styles.card_title}>Word : {item.Word} </Text>
                <Text style={[styles.card_title, { fontWeight: 'normal' }]}>Meaning : {item.Meaning} </Text>
                <Text style={[styles.card_title, { fontWeight: 'normal' }]}>Class : {item.Class} </Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('EditWord', {
                        Id: item.Id,
                        Word: item.Word,
                        WordAudio: item.WordAudio,
                        Meaning: item.Meaning,
                        MeaningAudio: item.MeaningAudio,
                        Class: item.Class,
                        Image: item.Base64Image
                    })}
                        style={{ backgroundColor: '#000', height: 50, flex: 1, justifyContent: 'center', borderRadius: 10, margin: 5 }}>
                        <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center' }}> Edit </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteRecord(item.Id)}
                        style={{ backgroundColor: '#000', height: 50, flex: 1, justifyContent: 'center', borderRadius: 10, margin: 5 }}>
                        <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center' }}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
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

export default ListOfWords;

const styles = StyleSheet.create({
    container: {
        flex: 1, paddingTop: 10, backgroundColor: '#fff',
    },
    cardView: {
        backgroundColor: '#3EB489',
        width: '94%',
        alignSelf: 'center',
        borderRadius: 10,
        padding: 10,
        marginVertical: 2.5,
    },
    card_title: {
        color: "white",
        fontSize: 18,
        fontWeight: 'bold',
    }
})