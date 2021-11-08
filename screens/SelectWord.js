import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ToastAndroid, ScrollView, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Checkbox } from 'react-native-paper';
//SignUp Screen Code-------
const SelectWord = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [accountType, setAccountType] = useState();//test
    const [checked, setChecked] = React.useState(false);
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={{ fontSize: 32, color: '#3EB489', fontWeight: 'bold' }}>Select Words for "Ali"</Text>
                </View>

                <View style={styles.cardView}>
                    <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked);
                        }}
                    />
                    <Text style={styles.card_title}> Apple </Text>
                </View>
                <View style={styles.cardView}>
                    <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked);
                        }}
                    />
                    <Text style={styles.card_title}> Banana </Text>
                </View>
                <View style={styles.cardView}>
                    <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked);
                        }}
                    />
                    <Text style={styles.card_title}> Cat </Text>
                </View>
                <View style={styles.cardView}>
                    <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked);
                        }}
                    />
                    <Text style={styles.card_title}> Dog </Text>
                </View>
                <TouchableOpacity style={styles.btnSignUp}
                >
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Save</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

export default SelectWord;

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
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
    },
    card_title: {
        color: "white",
        fontSize: 18,
        fontWeight: 'bold',
    },
    btnSignUp: {
        width: "95%",
        borderRadius: 10,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: 'center',
        marginTop: 20,
        backgroundColor: '#3EB489',
      },
})