import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, FlatList, ScrollView, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Switch } from 'react-native-paper';
import { openDatabase } from 'react-native-sqlite-storage';

//SignUp Screen Code-------
const AssignWords = ({ navigation, route }) => {
    var db = openDatabase({ name: 'KidsTalkingDictionaryDB.db', createFromLocation: 1 });
    const [data, setData] = useState([]);
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    const getAllWords = () => {
        setData([]);
        db.transaction((tx) => {
            tx.executeSql(
                // `SELECT * FROM Words Where Class=${route.params.Class}`,
                `SELECT * FROM Words`,
                [],
                (tx, results) => {
                    if (results.rows.length > 0) {
                        let count = 0;
                        for (let index = 0; index < results.rows.length; index++) {
                            db.transaction((tx) => {
                                tx.executeSql(
                                    `SELECT * FROM AssignWords WHERE ChildId=? And WordId=?`,
                                    [route.params.ChildId, results.rows.item(index).Id],
                                    (tx, results1) => {
                                        if (results1.rows.length > 0) {
                                            setData(data => [...data, {
                                                Id: results.rows.item(index).Id,
                                                Word: results.rows.item(index).Word,
                                                Meaning: results.rows.item(index).Meaning,
                                                selected: results1.rows.item(0).IsAssign == '1' ? true : false,
                                            }])
                                        } else {
                                            setData(data => [...data, {
                                                Id: results.rows.item(index).Id,
                                                Word: results.rows.item(index).Word,
                                                Meaning: results.rows.item(index).Meaning,
                                                selected: false,
                                            }])
                                        }
                                    }
                                );
                            })
                        }
                    } else {
                        alert(`No Word Found of class ${route.params.Class}`)
                    }
                }
            );
        })
    }
    useEffect(() => {
        getAllWords();
    }, []);
    const handleSwitch = (itemSelected) => {
        const newData = data.map(item => {
            if (item.Id == itemSelected.Id) {
                return {
                    ...item,
                    selected: !item.selected,
                }
            }
            return {
                ...item,
                selected: item.selected
            }
        })
        setData(newData);
    }
    const saveData = async () => {
        let count = 0;
        data.forEach(async (element, index) => {
            await db.transaction((tx) => {
                tx.executeSql(
                    `SELECT * FROM AssignWords Where WordId=? AND ChildId=?`,
                    [element.Id, route.params.ChildId],
                    (tx, results) => {
                        if (results.rows.length > 0) {
                            tx.executeSql(
                                'Update AssignWords SET WordId=?,ChildId=?,IsAssign=? Where WordId=? AND ChildId=?',
                                [element.Id, route.params.ChildId, element.selected, element.Id, route.params.ChildId],
                                (tx, results) => {
                                    if (results.rowsAffected > 0) {
                                        count++;
                                        if (data.length == count)
                                            alert('Record Updated Successfully!')
                                    } else {
                                        alert('Do nothing..')
                                    }
                                }
                            );
                        } else {
                            tx.executeSql(
                                'Insert into AssignWords(WordId,ChildId,IsAssign) Values (?,?,?)',
                                [element.Id, route.params.ChildId, element.selected],
                                (tx, results) => {
                                    if (results.rowsAffected > 0) {
                                        count++;
                                        if (data.length == count)
                                            alert('Data Saved Successfully!')
                                    } else {
                                        alert('Do nothing..')
                                    }
                                }
                            );
                        }
                    }
                );
            })
        });

    }
    const renderItem = ({ item }) => {
        return (
            <View style={styles.cardView} onPress={() => navigation.navigate('SelectWord')}>
                <Text style={styles.card_title}>{item.Word} </Text>
                <Switch value={item.selected} onValueChange={() => handleSwitch(item)} style={{ flex: 1 }} />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ fontSize: 32, color: '#3EB489', fontWeight: 'bold' }}> {route.params.Name}</Text>
            </View>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
            <TouchableOpacity style={styles.btnSignUp}
                onPress={() => saveData()}
            >
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Save</Text>
            </TouchableOpacity>
        </View>
    );
}

export default AssignWords;

const styles = StyleSheet.create({
    container: {
        flex: 1,  backgroundColor: '#fff',
    },
    header: {
        paddingBottom: 25, alignItems: 'center',
    },
    cardView: {
        flexDirection: 'row',
        backgroundColor: '#888',
        alignItems: 'center',
        height: 50,
        width: '95%',
        paddingHorizontal: 20,
        marginVertical: 2,
        alignSelf: 'center'
    },
    card_title: {
        flex: 1,
        color: "white",
        fontSize: 20,
        fontWeight: 'bold',
    },
    btnSignUp: {
        width: "95%",
        borderRadius: 10,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: 'center',
        marginVertical: 20,
        backgroundColor: '#3EB489',
    },
})