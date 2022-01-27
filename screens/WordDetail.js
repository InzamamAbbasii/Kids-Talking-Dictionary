import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

const WordDetail = ({ navigation, route }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ fontSize: 32, color: '#3EB489', fontWeight: 'bold' }}> {route.params.Word}</Text>
                <Text style={{ fontSize: 32, color: '#3EB489', fontWeight: 'bold' }}> {route.params.Meaning}</Text>
            </View>
            <View style={{ height: 200}}>
                    <Image
                        style={{
                            flex: 1,
                            resizeMode: 'stretch',
                            borderWidth: 1,
                            borderColor: '#000'
                        }}
                        source={{ uri: `data:image/jpeg;base64,${route.params.Image}` }} />
                </View>
        </View>
    );
}

export default WordDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1, paddingTop: 30, backgroundColor: '#fff',
    },
    header: {
        paddingBottom: 25,
    },
    cardView: {
        backgroundColor: '#3EB489',
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