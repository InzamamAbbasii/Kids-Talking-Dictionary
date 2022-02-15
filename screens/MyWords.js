import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

const MyWords = ({ navigation, route }) => {
    var db = openDatabase({ name: 'KidsTalkingDictionaryDB.db', createFromLocation: 1 });
    const [data, setData] = useState([]);
    const getAllWords = () => {
        setData([]);
        db.transaction((tx) => {
            tx.executeSql(
                `Select * from Words Join AssignWords on Words.Id=AssignWords.WordId Where AssignWords.ChildId=${route.params.ChildId} AND AssignWords.IsAssign=1`,
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
                                Meaning: results.rows.item(index).Meaning,
                                MeaningAudio: results.rows.item(index).MeaningAudio,
                                Base64Image: results.rows.item(index).Image,
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
        getAllWords();
    }, []);
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.cardView} onPress={() => navigation.navigate('WordDetail', {
                Id: item.Id,
                Word: item.Word,
                WordAudio: item.WordAudio,
                Meaning: item.Meaning,
                MeaningAudio: item.MeaningAudio,
                Image: item.Base64Image
            })}>
                <Text style={styles.card_title}>{item.Word} </Text>
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

export default MyWords;

const styles = StyleSheet.create({
    container: {
        flex: 1, paddingTop: 30, backgroundColor: '#fff',
    },
    cardView: {
        backgroundColor: '#3EB489',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        padding: 20,
        marginVertical: 5,
    },
    card_title: {
        color: "white",
        fontSize: 18,
        fontWeight: 'bold',
    }
})