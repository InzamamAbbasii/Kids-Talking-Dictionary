import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//SignUp Screen Code-------
const Users = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [accountType, setAccountType] = useState();//test

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={{ fontSize: 32, color: '#3EB489', fontWeight: 'bold' }}>List of Childrens</Text>
                </View>
                <TouchableOpacity style={styles.cardView} onPress={()=>navigation.navigate('SelectWord')}>
                    <Text style={styles.card_title}> Ali </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cardView}>
                    <Text style={styles.card_title}> Raza</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cardView}>
                    <Text style={styles.card_title}> Aqdas </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

export default Users;

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
        alignSelf:'center',
        borderRadius:10,
        padding:10,
        marginVertical:5,
    },
    card_title: {
        color: "white",
        fontSize:18,
        fontWeight:'bold',
    }
})